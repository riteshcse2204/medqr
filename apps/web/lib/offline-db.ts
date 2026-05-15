import Dexie, { Table } from 'dexie';

export interface OfflinePatient {
  id?: string;
  name: string;
  phone: string;
  synced: number; // 0 for no, 1 for yes
}

export interface OfflineBill {
  id?: string;
  patientId: string;
  totalAmount: number;
  items: any[];
  synced: number;
}

export class MedQRDatabase extends Dexie {
  patients!: Table<OfflinePatient>;
  bills!: Table<OfflineBill>;

  constructor() {
    super('MedQR_Offline');
    this.version(1).stores({
      patients: '++id, phone, synced',
      bills: '++id, patientId, synced'
    });
  }
}

export const db = new MedQRDatabase();

export const syncOfflineData = async (apiClient: any) => {
  console.log('Starting offline sync...');
  
  // 1. Sync Patients
  const unsyncedPatients = await db.patients.where('synced').equals(0).toArray();
  for (const patient of unsyncedPatients) {
    try {
      await apiClient.post('/patients', patient);
      await db.patients.update(patient.id!, { synced: 1 });
    } catch (e) {
      console.error('Failed to sync patient', e);
    }
  }

  // 2. Sync Bills
  const unsyncedBills = await db.bills.where('synced').equals(0).toArray();
  for (const bill of unsyncedBills) {
    try {
      await apiClient.post('/billing', bill);
      await db.bills.update(bill.id!, { synced: 1 });
    } catch (e) {
      console.error('Failed to sync bill', e);
    }
  }
};
