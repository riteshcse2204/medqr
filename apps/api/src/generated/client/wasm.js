
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  domain: 'domain',
  plan: 'plan',
  isActive: 'isActive',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  email: 'email',
  password: 'password',
  name: 'name',
  phone: 'phone',
  role: 'role',
  isActive: 'isActive',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.StaffProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  designation: 'designation',
  department: 'department',
  salary: 'salary',
  joinDate: 'joinDate',
  bankAccount: 'bankAccount',
  panNumber: 'panNumber',
  documents: 'documents'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  staffProfileId: 'staffProfileId',
  date: 'date',
  checkIn: 'checkIn',
  checkOut: 'checkOut',
  status: 'status'
};

exports.Prisma.PayrollScalarFieldEnum = {
  id: 'id',
  staffProfileId: 'staffProfileId',
  month: 'month',
  year: 'year',
  basicSalary: 'basicSalary',
  allowances: 'allowances',
  deductions: 'deductions',
  netSalary: 'netSalary',
  status: 'status',
  paidAt: 'paidAt'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  phone: 'phone',
  email: 'email',
  abhaId: 'abhaId',
  gender: 'gender',
  dob: 'dob',
  bloodGroup: 'bloodGroup',
  address: 'address',
  photoUrl: 'photoUrl',
  qrCode: 'qrCode',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DoctorScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  specialization: 'specialization',
  phone: 'phone',
  email: 'email',
  registrationNo: 'registrationNo',
  consultFee: 'consultFee',
  isActive: 'isActive',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  date: 'date',
  timeSlot: 'timeSlot',
  status: 'status',
  type: 'type',
  reason: 'reason',
  notes: 'notes',
  queueNo: 'queueNo',
  tokenNo: 'tokenNo',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.TelemedicineSessionScalarFieldEnum = {
  id: 'id',
  appointmentId: 'appointmentId',
  meetingLink: 'meetingLink',
  startTime: 'startTime',
  endTime: 'endTime',
  status: 'status'
};

exports.Prisma.EncounterScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  appointmentId: 'appointmentId',
  type: 'type',
  vitals: 'vitals',
  diagnosis: 'diagnosis',
  notes: 'notes',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PrescriptionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  encounterId: 'encounterId',
  notes: 'notes',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PrescriptionItemScalarFieldEnum = {
  id: 'id',
  prescriptionId: 'prescriptionId',
  medicineId: 'medicineId',
  medicineName: 'medicineName',
  dosage: 'dosage',
  frequency: 'frequency',
  duration: 'duration',
  instructions: 'instructions'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  billNo: 'billNo',
  totalAmount: 'totalAmount',
  paidAmount: 'paidAmount',
  discount: 'discount',
  status: 'status',
  paymentMode: 'paymentMode',
  notes: 'notes',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.WardScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  type: 'type',
  floor: 'floor',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.BedScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  wardId: 'wardId',
  bedNumber: 'bedNumber',
  status: 'status'
};

exports.Prisma.IpdAdmissionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  bedId: 'bedId',
  admissionDate: 'admissionDate',
  dischargeDate: 'dischargeDate',
  status: 'status',
  reason: 'reason',
  notes: 'notes',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LabOrderScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  encounterId: 'encounterId',
  testName: 'testName',
  status: 'status',
  priority: 'priority',
  notes: 'notes',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.LabResultScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  parameter: 'parameter',
  value: 'value',
  unit: 'unit',
  referenceRange: 'referenceRange',
  isAbnormal: 'isAbnormal',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BillItemScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  description: 'description',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  total: 'total'
};

exports.Prisma.MedicineScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  genericName: 'genericName',
  category: 'category',
  unit: 'unit',
  mrp: 'mrp',
  stock: 'stock',
  minStock: 'minStock',
  isActive: 'isActive',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  action: 'action',
  entity: 'entity',
  entityId: 'entityId',
  changes: 'changes',
  ipAddress: 'ipAddress',
  createdAt: 'createdAt'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  contactName: 'contactName',
  email: 'email',
  phone: 'phone',
  address: 'address',
  gstin: 'gstin'
};

exports.Prisma.PurchaseOrderScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  supplierId: 'supplierId',
  orderNo: 'orderNo',
  status: 'status',
  totalAmount: 'totalAmount',
  notes: 'notes',
  items: 'items',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  PHARMACIST: 'PHARMACIST',
  LAB_TECH: 'LAB_TECH',
  BILLING_STAFF: 'BILLING_STAFF'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LEAVE: 'LEAVE',
  LATE: 'LATE'
};

exports.PayrollStatus = exports.$Enums.PayrollStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.AppointmentStatus = exports.$Enums.AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

exports.AppointmentType = exports.$Enums.AppointmentType = {
  REGULAR: 'REGULAR',
  EMERGENCY: 'EMERGENCY',
  FOLLOW_UP: 'FOLLOW_UP',
  TELECONSULT: 'TELECONSULT'
};

exports.TelemedicineStatus = exports.$Enums.TelemedicineStatus = {
  SCHEDULED: 'SCHEDULED',
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.EncounterType = exports.$Enums.EncounterType = {
  OPD: 'OPD',
  IPD: 'IPD',
  EMERGENCY: 'EMERGENCY',
  TELECONSULT: 'TELECONSULT'
};

exports.BillStatus = exports.$Enums.BillStatus = {
  PENDING: 'PENDING',
  PARTIAL: 'PARTIAL',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED'
};

exports.WardType = exports.$Enums.WardType = {
  GENERAL: 'GENERAL',
  SEMI_PRIVATE: 'SEMI_PRIVATE',
  PRIVATE: 'PRIVATE',
  ICU: 'ICU',
  NICU: 'NICU',
  OT: 'OT'
};

exports.BedStatus = exports.$Enums.BedStatus = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE: 'MAINTENANCE',
  CLEANING: 'CLEANING'
};

exports.AdmissionStatus = exports.$Enums.AdmissionStatus = {
  ADMITTED: 'ADMITTED',
  DISCHARGED: 'DISCHARGED',
  TRANSFERRED: 'TRANSFERRED',
  CANCELLED: 'CANCELLED'
};

exports.LabStatus = exports.$Enums.LabStatus = {
  PENDING: 'PENDING',
  COLLECTED: 'COLLECTED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.PoStatus = exports.$Enums.PoStatus = {
  PENDING: 'PENDING',
  ORDERED: 'ORDERED',
  RECEIVED: 'RECEIVED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  User: 'User',
  StaffProfile: 'StaffProfile',
  Attendance: 'Attendance',
  Payroll: 'Payroll',
  Patient: 'Patient',
  Doctor: 'Doctor',
  Appointment: 'Appointment',
  TelemedicineSession: 'TelemedicineSession',
  Encounter: 'Encounter',
  Prescription: 'Prescription',
  PrescriptionItem: 'PrescriptionItem',
  Bill: 'Bill',
  Ward: 'Ward',
  Bed: 'Bed',
  IpdAdmission: 'IpdAdmission',
  LabOrder: 'LabOrder',
  LabResult: 'LabResult',
  BillItem: 'BillItem',
  Medicine: 'Medicine',
  AuditLog: 'AuditLog',
  Supplier: 'Supplier',
  PurchaseOrder: 'PurchaseOrder'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
