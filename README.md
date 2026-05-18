# 🏥 MedQR — Hospital Management System

> A production-ready, multi-tenant Hospital Management SaaS built for Tier 2/3 cities in India.  
> Mobile-first. GST-compliant. NABH-ready. IoT-enabled.

---

## 📖 Table of Contents
- [What is MedQR?](#what-is-medqr)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Role-Based Access](#role-based-access)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Full File Documentation](#full-file-documentation)

---

## What is MedQR?

MedQR is a complete Hospital Management System (HMS) that manages:
- **OPD & IPD** workflows
- **Multi-branch** hospital networks
- **Pharmacy** dispensing with auto prescription sync
- **Lab** test ordering and reporting
- **GST Billing** + Razorpay payments
- **IoT** real-time patient vitals monitoring
- **NABH** compliance reporting
- **AI-powered** analytics (no-show prediction, stock forecasting)
- **WhatsApp** notifications via Twilio
- **Multi-language** (English + Hindi)
- **Offline PWA** support

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeScript, Prisma ORM |
| **Database** | PostgreSQL (multi-tenant with `tenantId`) |
| **Cache/Queue** | Redis + BullMQ |
| **Auth** | JWT + Passport.js + bcrypt |
| **Payments** | Razorpay |
| **Messaging** | Twilio WhatsApp Business API |
| **IoT** | MQTT + WebSockets |
| **AI** | Google Gemini API |
| **Mobile** | React Native (Expo) |
| **Monorepo** | Turborepo + npm workspaces |
| **DevOps** | Docker Compose (local), ready for Vercel + Railway |

---

## Project Structure

```
medqr/
├── apps/
│   ├── api/        ← NestJS REST API (Backend)
│   ├── web/        ← Next.js Web Portal (Frontend)
│   ├── mobile/     ← React Native App (QR scanner)
│   └── docs/       ← Documentation site
├── packages/
│   ├── ui/         ← Shared component library
│   ├── eslint-config/
│   └── typescript-config/
├── docker-compose.yml
├── turbo.json
├── CODEBASE_MAP.md ← 📌 Full file-by-file documentation
└── README.md
```

> 📌 **See [CODEBASE_MAP.md](./CODEBASE_MAP.md) for complete file-by-file documentation of every module.**

---

## Key Features

### 👥 Role-Based Dashboards
Each role gets a dedicated, purpose-built dashboard:

| Role | Route | What they see |
|------|-------|--------------|
| **Super Admin** | `/superadmin` | All hospital tenants, subscriptions, system health |
| **Admin/Director** | `/dashboard/admin` | Revenue, footfall, branch performance, billing |
| **Doctor** | `/dashboard/doctor` | Today's OPD queue, prescriptions, patient vitals |
| **Receptionist** | `/dashboard/reception` | Patient registration, appointments, token queue |
| **Pharmacist** | `/dashboard/pharmacy` | Pending prescriptions, medicine dispensing, stock |

### 🔐 Security
- JWT authentication with role-based access control (RBAC)
- All data isolated by `tenantId` (no cross-hospital data leakage)
- Audit logs on every create/update/delete action
- Password hashing with bcrypt

### 🏥 Clinical Workflow
```
Reception registers patient (UHID assigned)
  → Doctor sees patient in queue
    → Doctor writes prescription
      → Pharmacy auto-receives prescription
        → Medicine dispensed & stock deducted
          → Bill generated with GST
            → Patient pays via Razorpay
              → WhatsApp receipt sent
```

### 📊 Patient ID (UHID)
Every patient gets a **Universal Health ID (UHID)** like `UHID-2024-00001` that is:
- Visible to all roles (Doctor, Reception, Pharmacy)
- Scannable via QR code on mobile app
- Linked to all visits, prescriptions, and bills

---

## Role-Based Access

```
SUPER_ADMIN  → Can do everything across all tenants
ADMIN        → Full access within their hospital tenant
DOCTOR       → Patients, appointments, prescriptions, clinical notes
RECEPTIONIST → Patient registration, appointments, billing view
PHARMACIST   → Prescriptions, medicine stock, dispensing
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop (for PostgreSQL + Redis)
- npm 9+

### 1. Clone the repository
```bash
git clone https://github.com/riteshcse2204/medqr.git
cd medqr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the database
```bash
docker-compose up -d
# PostgreSQL → localhost:5432
# Redis      → localhost:6379
```

### 4. Configure environment
```bash
cp apps/api/.env.example apps/api/.env
# Fill in DATABASE_URL, JWT_SECRET etc. (see below)
```

### 5. Run database migrations
```bash
cd apps/api
npx prisma migrate dev --name init
npx prisma generate
cd ../..
```

### 6. Start all apps
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001/api/v1
# Docs:     http://localhost:3002
```

---

## Environment Variables

Create `apps/api/.env` with:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/medqr?schema=public"

# Auth
JWT_SECRET="your-super-secret-jwt-key-here"

# Razorpay (Payments)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# IoT (MQTT)
MQTT_BROKER_URL="mqtt://localhost:1883"

# AI (Google Gemini)
GEMINI_API_KEY="your_gemini_api_key"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379
```

---

## Full File Documentation

👉 See **[CODEBASE_MAP.md](./CODEBASE_MAP.md)** for a complete table of every file, its route, and what it does — organized by Frontend, Backend, and Mobile.

---

## License

MIT © 2024 MedQR Team
