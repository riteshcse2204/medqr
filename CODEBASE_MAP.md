# 🗺️ MedQR — Codebase Map (Developer Reference)

> This file documents **every folder and file** in the MedQR monorepo so that any developer can immediately understand what each piece of code does and where to find it.

---

## 📁 Root Structure

```
medqr/
├── apps/
│   ├── api/          ← NestJS Backend (REST API)
│   ├── web/          ← Next.js Frontend (Admin Portal)
│   ├── mobile/       ← React Native Mobile App
│   └── docs/         ← Documentation Site (Next.js)
├── packages/
│   ├── ui/           ← Shared UI Components
│   ├── eslint-config/ ← Shared ESLint Rules
│   └── typescript-config/ ← Shared TypeScript tsconfig
├── docker-compose.yml ← Local dev environment (DB + Redis)
├── turbo.json        ← Turborepo pipeline config
└── package.json      ← Root workspace config
```

---

## 🖥️ FRONTEND — `apps/web/` (Next.js 14, App Router)

### 📂 `apps/web/app/` — Pages (Route → Page)

| Route | File | Purpose |
|-------|------|---------|
| `/login` | `app/login/page.tsx` | **Login Page** — Unified login for all roles (Admin, Doctor, Pharmacy, Reception). Authenticates via `/auth/login` API, stores token in Zustand. |
| `/` | `app/page.tsx` | **Home/Root Redirect** — Redirects logged-in users to their role-specific dashboard. |
| `/onboarding` | `app/onboarding/page.tsx` | **Hospital Onboarding** — New hospital/tenant registration wizard. |
| `/superadmin` | `app/superadmin/page.tsx` | **Super Admin Portal** — Manages all hospital tenants, subscription plans, and system-wide settings. |
| `/dashboard/admin` | `app/dashboard/admin/page.tsx` | **Admin Dashboard** — Director-level overview: revenue, patient footfall, branch performance, billing table. |
| `/dashboard/doctor` | `app/dashboard/doctor/page.tsx` | **Doctor Dashboard** — Today's OPD queue, patient list, prescription writing, vitals view. |
| `/dashboard/pharmacy` | `app/dashboard/pharmacy/page.tsx` | **Pharmacy Dashboard** — Pending prescriptions from doctors, medicine dispensing, stock summary. |
| `/dashboard/reception` | `app/dashboard/reception/page.tsx` | **Reception Dashboard** — Patient registration, appointment scheduling, token management. |
| `/patients` | `app/patients/page.tsx` | **Patient List** — Searchable list of all registered patients with UHID. |
| `/patients/register` | `app/patients/register/page.tsx` | **Patient Registration** — Register new patient, generate UHID, collect demographics. |
| `/patients/abha-history/[id]` | `app/patients/abha-history/[id]/page.tsx` | **Patient ABHA History** — View ABHA-linked health records for a specific patient by ID. |
| `/billing` | `app/billing/page.tsx` | **Billing Module** — GST-compliant bill generation, Razorpay payment, e-invoice download. |
| `/ipd` | `app/ipd/page.tsx` | **IPD (In-Patient Dept.)** — Bed management, admission/discharge, ward assignment. |
| `/lab` | `app/lab/page.tsx` | **Lab Module** — Lab test requests, report upload, result viewing. |
| `/iot` | `app/iot/page.tsx` | **IoT Monitoring Portal** — Real-time vitals from connected patient sensors (MQTT). |
| `/analytics` | `app/analytics/page.tsx` | **Analytics Overview** — High-level charts for OPD, revenue, and patient trends. |
| `/analytics/ai` | `app/analytics/ai/page.tsx` | **AI Analytics** — AI-powered no-show prediction, stock forecasting, clinical insights. |
| `/analytics/nabh` | `app/analytics/nabh/page.tsx` | **NABH Compliance** — Hospital accreditation checklist and compliance reports. |
| `/settings` | `app/settings/page.tsx` | **Settings** — User profile, hospital settings, feature toggles. |
| `/settings/branches` | `app/settings/branches/page.tsx` | **Branch Management** — Add/edit hospital branches, assign staff per branch. |

---

### 📂 `apps/web/components/` — Reusable Components

| File | Purpose |
|------|---------|
| `components/layout/MainLayout.tsx` | **Main Application Shell** — Sidebar navigation (with role-based links), top header (search, language toggle, user avatar, logout), mobile menu. Wraps all authenticated pages. |

---

### 📂 `apps/web/lib/` — Utility Libraries

| File | Purpose |
|------|---------|
| `lib/api.ts` | **API Client** — Axios instance pre-configured with base URL and JWT auth header. Use `api.get()`, `api.post()` etc. everywhere. |
| `lib/offline-db.ts` | **Offline Database** — IndexedDB wrapper (via Dexie.js) for PWA offline support. Stores patients and appointments locally. |
| `lib/LanguageContext.tsx` | **i18n Context** — React context for English/Hindi language switching. Exposes `t()` translation function. |
| `lib/translations.ts` | **Translation Strings** — All English and Hindi text strings used across the app. |

---

### 📂 `apps/web/store/` — Global State (Zustand)

| File | Purpose |
|------|---------|
| `store/useAuthStore.ts` | **Auth Store** — Stores the logged-in user object, JWT token, and tenantId. Provides `setAuth()` and `logout()` actions. Persisted to `localStorage`. |

---

## ⚙️ BACKEND — `apps/api/` (NestJS + Prisma + PostgreSQL)

### 📂 `apps/api/src/` — Source Root

| File | Purpose |
|------|---------|
| `src/app.module.ts` | **Root App Module** — Registers all feature modules, global pipes, guards, and Prisma. |
| `src/main.ts` | **Entry Point** — Boots the NestJS app, enables CORS, sets global prefix `/api/v1`. |

---

### 📂 `apps/api/src/modules/` — Feature Modules

#### 🔐 `modules/auth/` — Authentication
| File | Purpose |
|------|---------|
| `auth.module.ts` | Registers AuthService, JwtModule, Passport strategies. |
| `auth.controller.ts` | **POST `/auth/login`** — Validates credentials, returns JWT token + user info. |
| `auth.service.ts` | Business logic: password comparison (bcrypt), JWT signing. |
| `strategies/jwt.strategy.ts` | JWT Passport strategy — validates Bearer token on every protected request. |
| `dto/auth.dto.ts` | `LoginDto` — email & password fields for login request body. |

---

#### 🏥 `modules/tenants/` — Multi-Tenant Hospital Management
| File | Purpose |
|------|---------|
| `tenants.module.ts` | Registers TenantsService and controller. |
| `tenants.controller.ts` | **GET/POST `/tenants`** — List, create, and manage hospital tenants (Super Admin only). |
| `tenants.service.ts` | Creates tenants, assigns plan, isolates data by `tenantId`. |

---

#### 👥 `modules/users/` — User & Staff Management
| File | Purpose |
|------|---------|
| `users.module.ts` | Registers UsersService and controller. |
| `users.controller.ts` | **GET/POST `/users`** — CRUD for all system users (Admin, Doctor, Pharmacist, Receptionist). |
| `users.service.ts` | Creates users, hashes passwords, assigns roles. |
| `hr.service.ts` | **HR & Payroll** — Staff attendance tracking, leave management, salary calculation. |

---

#### 🧑‍⚕️ `modules/patients/` — Patient Management
| File | Purpose |
|------|---------|
| `patients.module.ts` | Registers PatientsService and controller. |
| `patients.controller.ts` | **GET/POST `/patients`** — Register patients, fetch by UHID, search. |
| `patients.service.ts` | Generates unique UHID (e.g. `UHID-2024-00001`), stores patient demographics. |
| `dto/patient.dto.ts` | `CreatePatientDto` — name, DOB, phone, address, ABHA ID fields. |

---

#### 📅 `modules/appointments/` — OPD Scheduling
| File | Purpose |
|------|---------|
| `appointments.controller.ts` | **GET/POST `/appointments`** — Book, reschedule, cancel appointments. |
| `appointments.service.ts` | Token/queue logic, slot availability, doctor schedule linking. |
| `dto/` | `CreateAppointmentDto`, `UpdateAppointmentDto`. |

---

#### 👨‍⚕️ `modules/doctors/` — Doctor Profiles & Schedules
| File | Purpose |
|------|---------|
| `doctors.module.ts` | Registers DoctorsService. |
| `doctors.controller.ts` | **GET `/doctors`** — List doctors by specialty, fetch schedules. |
| `doctors.service.ts` | Doctor profile CRUD, availability slots, OPD session management. |
| `dto/doctor.dto.ts` | `CreateDoctorDto` — specialization, qualifications, schedule. |

---

#### 🏨 `modules/ipd/` — In-Patient Department
| File | Purpose |
|------|---------|
| `ipd.module.ts` | Registers IPD module. |
| `ipd.controller.ts` | **GET/POST `/ipd`** — Admissions, bed allocation, discharge. |
| `ipd.service.ts` | Manages bed inventory, ward assignments, daily charges. |
| `dto/ipd.dto.ts` | `CreateAdmissionDto` — patientId, ward, bed number, diagnosis. |

---

#### 🧪 `modules/lab/` — Laboratory Management
| File | Purpose |
|------|---------|
| `lab.module.ts` | Registers Lab module. |
| `lab.controller.ts` | **GET/POST `/lab`** — Order tests, upload reports, fetch results. |
| `lab.service.ts` | Links lab orders to prescriptions, manages report files. |
| `dto/lab.dto.ts` | `CreateLabOrderDto` — test name, patient ID, doctor ID. |

---

#### 💊 `modules/pharmacy/` — Pharmacy & Medicine Dispensing
| File | Purpose |
|------|---------|
| `pharmacy.module.ts` | Registers Pharmacy module. |
| `pharmacy.controller.ts` | **GET/POST `/pharmacy`** — Fetch pending prescriptions, dispense medicines, manage stock. |
| `pharmacy.service.ts` | Auto-syncs prescriptions from doctor module, deducts stock on dispense. |
| `dto/pharmacy.dto.ts` | `DispenseMedicineDto`, `AddMedicineDto`, `UpdateStockDto`. |

---

#### 💳 `modules/billing/` — GST Billing & Payments
| File | Purpose |
|------|---------|
| `billing.module.ts` | Registers Billing module with all sub-services. |
| `billing.controller.ts` | **POST `/billing`** — Create bills, apply GST, generate invoice. |
| `billing.service.ts` | Aggregates charges from OPD/IPD/Lab/Pharmacy into a single bill. |
| `gst.service.ts` | **GST Calculation** — Applies correct GST slabs (5%, 12%, 18%) on service items. |
| `razorpay.service.ts` | **Razorpay Integration** — Creates payment orders, verifies webhook signatures. |
| `dto/bill.dto.ts` | `CreateBillDto` — patientId, lineItems, discount, paymentMode. |

---

#### 📡 `modules/iot/` — IoT Patient Monitoring
| File | Purpose |
|------|---------|
| `iot.module.ts` | Registers IoT module with MQTT client. |
| `iot.controller.ts` | **GET `/iot/vitals/:patientId`** — Fetch latest vitals readings. |
| `iot.service.ts` | Subscribes to MQTT broker, stores real-time vitals (SpO2, BP, HR, Temp), emits WebSocket events. |

---

#### 🔔 `modules/notifications/` — WhatsApp & Push Alerts
| File | Purpose |
|------|---------|
| `notifications.module.ts` | Registers with BullMQ queue. |
| `notifications.service.ts` | Queues appointment reminders, bill receipts, lab result alerts. |
| `notifications.processor.ts` | **BullMQ Worker** — Processes the notification queue and sends messages. |
| `whatsapp.service.ts` | **WhatsApp API** — Sends messages via Twilio/WhatsApp Business API. |

---

#### 📊 `modules/reports/` — Analytics & Compliance
| File | Purpose |
|------|---------|
| `reports.module.ts` | Registers Reports module. |
| `reports.controller.ts` | **GET `/reports`** — Revenue, patient, and operational reports. |
| `reports.service.ts` | Aggregates data for charts and CSV/PDF export. |
| `ai.service.ts` | **AI Analytics** — Gemini AI integration for no-show prediction and stock demand forecasting. |
| `nabh.service.ts` | **NABH Compliance** — Generates NABH accreditation checklists and audit-ready reports. |

---

#### 🔍 `modules/audit/` — Audit Logging
| File | Purpose |
|------|---------|
| `audit.module.ts` | Registers Audit module. |
| `audit.service.ts` | Logs every create/update/delete action with user ID, timestamp, and IP address. Used for NABH compliance and security audits. |

---

### 📂 `apps/api/src/common/` — Shared Utilities

| File | Purpose |
|------|---------|
| `decorators/roles.decorator.ts` | `@Roles()` decorator — marks a route as requiring specific roles (e.g. `ADMIN`, `DOCTOR`). |
| `guards/jwt-auth.guard.ts` | **JWT Guard** — Applied globally; rejects requests without a valid JWT token. |
| `guards/roles.guard.ts` | **RBAC Guard** — Checks if the authenticated user has the required role. |
| `interceptors/audit.interceptor.ts` | **Audit Interceptor** — Automatically logs every mutating request to the Audit module. |

---

### 📂 `apps/api/src/prisma/` — Database Client

| File | Purpose |
|------|---------|
| `prisma.module.ts` | Global Prisma module — provides `PrismaService` as a singleton across all modules. |
| `prisma.service.ts` | **Prisma Client wrapper** — extends `PrismaClient`, handles connection lifecycle. |
| `client.ts` | Prisma client factory (used for direct access if needed). |

---

### 📂 `apps/api/prisma/` — Database Schema & Migrations

| File | Purpose |
|------|---------|
| `schema.prisma` | **Main Database Schema** — Defines all models: Tenant, User, Patient (with UHID), Appointment, Prescription, Medicine, Bill, LabOrder, IoTReading, AuditLog. All models have `tenantId` for multi-tenancy. |
| `migrations/` | Auto-generated SQL migration files from `prisma migrate dev`. |

---

## 📱 MOBILE — `apps/mobile/` (React Native + Expo)

| File | Purpose |
|------|---------|
| `App.tsx` | **Mobile App Root** — Navigation stack, QR scan entry point, patient lookup by UHID via QR code. |
| `package.json` | Expo dependencies (expo-camera for QR, react-navigation, axios). |

---

## 📦 SHARED PACKAGES — `packages/`

| Package | Purpose |
|---------|---------|
| `packages/ui/` | Shared React component library (Buttons, Cards, Inputs) used by both `web` and `docs`. |
| `packages/eslint-config/` | Common ESLint rules applied across all apps. |
| `packages/typescript-config/` | Base `tsconfig.json` files (base, nextjs, react-library). |

---

## 🐳 Infrastructure

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Spins up **PostgreSQL** (port 5432) and **Redis** (port 6379) for local development. |
| `.env` (not committed) | `DATABASE_URL`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `MQTT_BROKER_URL`, `TWILIO_*` keys. |

---

## 🔄 Data Flow Summary

```
[Patient arrives]
      ↓
[Reception: /dashboard/reception] → POST /patients (register UHID)
      ↓
[POST /appointments] (book OPD slot)
      ↓
[Doctor: /dashboard/doctor] → Sees queue → Writes prescription → POST /clinical
      ↓
[Pharmacy: /dashboard/pharmacy] → Auto-receives prescription → Dispenses medicine
      ↓
[Billing: /billing] → Aggregates OPD + Medicine charges → GST invoice → Razorpay
      ↓
[Admin: /dashboard/admin] → Sees revenue + footfall analytics
```

---

## 🚀 Quick Start for Developers

```bash
# 1. Install dependencies
npm install

# 2. Start database & redis
docker-compose up -d

# 3. Run database migrations
cd apps/api && npx prisma migrate dev

# 4. Start all apps simultaneously (Turborepo)
npm run dev

# Apps will run at:
# Frontend (web): http://localhost:3000
# Backend (api):  http://localhost:3001
# Docs:           http://localhost:3002
```

---

## 👤 Default Roles & Access

| Role | Dashboard Route | API Role Enum |
|------|----------------|---------------|
| Super Admin | `/superadmin` | `SUPER_ADMIN` |
| Hospital Admin | `/dashboard/admin` | `ADMIN` |
| Doctor | `/dashboard/doctor` | `DOCTOR` |
| Receptionist | `/dashboard/reception` | `RECEPTIONIST` |
| Pharmacist | `/dashboard/pharmacy` | `PHARMACIST` |
