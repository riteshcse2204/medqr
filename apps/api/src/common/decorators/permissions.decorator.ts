import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);

// Define standard permission constants
export const Permission = {
  PATIENT_READ: 'patient:read',
  PATIENT_WRITE: 'patient:write',
  APPOINTMENT_READ: 'appointment:read',
  APPOINTMENT_WRITE: 'appointment:write',
  BILLING_READ: 'billing:read',
  BILLING_WRITE: 'billing:write',
  PHARMACY_MANAGE: 'pharmacy:manage',
  LAB_MANAGE: 'lab:manage',
  ADMIN_ACCESS: 'admin:access',
};
