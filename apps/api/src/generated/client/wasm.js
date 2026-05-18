
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

exports.Prisma.BranchScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  address: 'address',
  phone: 'phone',
  email: 'email',
  isActive: 'isActive',
  isMain: 'isMain',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
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

exports.Prisma.IpdAdmissionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
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
  branchId: 'branchId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  testName: 'testName',
  status: 'status',
  result: 'result',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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

exports.Prisma.IotDeviceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
  name: 'name',
  type: 'type',
  macAddress: 'macAddress',
  isActive: 'isActive',
  lastSeen: 'lastSeen'
};

exports.Prisma.IotReadingScalarFieldEnum = {
  id: 'id',
  deviceId: 'deviceId',
  patientId: 'patientId',
  value: 'value',
  timestamp: 'timestamp'
};

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
  name: 'name',
  phone: 'phone',
  email: 'email',
  uhid: 'uhid',
  abhaId: 'abhaId',
  abhaHistory: 'abhaHistory',
  gender: 'gender',
  dob: 'dob',
  bloodGroup: 'bloodGroup',
  address: 'address',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DoctorScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
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
  branchId: 'branchId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  date: 'date',
  timeSlot: 'timeSlot',
  status: 'status',
  type: 'type',
  reason: 'reason',
  notes: 'notes',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.EncounterScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  chiefComplaints: 'chiefComplaints',
  diagnosis: 'diagnosis',
  vitals: 'vitals',
  notes: 'notes',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrescriptionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
  patientId: 'patientId',
  doctorId: 'doctorId',
  encounterId: 'encounterId',
  medicines: 'medicines',
  notes: 'notes',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  patientId: 'patientId',
  branchId: 'branchId',
  billNo: 'billNo',
  totalAmount: 'totalAmount',
  taxableAmount: 'taxableAmount',
  cgst: 'cgst',
  sgst: 'sgst',
  igst: 'igst',
  paidAmount: 'paidAmount',
  discount: 'discount',
  status: 'status',
  paymentMode: 'paymentMode',
  transactionId: 'transactionId',
  irn: 'irn',
  ackNo: 'ackNo',
  notes: 'notes',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.BillItemScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  description: 'description',
  hsnCode: 'hsnCode',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  gstRate: 'gstRate',
  gstAmount: 'gstAmount',
  total: 'total'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  amount: 'amount',
  method: 'method',
  provider: 'provider',
  transactionId: 'transactionId',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.MedicineScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
  name: 'name',
  genericName: 'genericName',
  category: 'category',
  manufacturer: 'manufacturer',
  price: 'price',
  stock: 'stock',
  minStock: 'minStock',
  expiryDate: 'expiryDate',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.WardScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  branchId: 'branchId',
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
  branchId: 'branchId',
  wardId: 'wardId',
  bedNumber: 'bedNumber',
  status: 'status'
};

exports.Prisma.TelemedicineSessionScalarFieldEnum = {
  id: 'id',
  appointmentId: 'appointmentId',
  roomName: 'roomName',
  token: 'token',
  status: 'status',
  startedAt: 'startedAt',
  endedAt: 'endedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  Branch: 'Branch',
  User: 'User',
  StaffProfile: 'StaffProfile',
  Attendance: 'Attendance',
  Payroll: 'Payroll',
  IpdAdmission: 'IpdAdmission',
  LabOrder: 'LabOrder',
  Supplier: 'Supplier',
  PurchaseOrder: 'PurchaseOrder',
  IotDevice: 'IotDevice',
  IotReading: 'IotReading',
  Patient: 'Patient',
  Doctor: 'Doctor',
  Appointment: 'Appointment',
  Encounter: 'Encounter',
  Prescription: 'Prescription',
  Bill: 'Bill',
  BillItem: 'BillItem',
  Payment: 'Payment',
  Medicine: 'Medicine',
  Ward: 'Ward',
  Bed: 'Bed',
  TelemedicineSession: 'TelemedicineSession'
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
