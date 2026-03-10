import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AppointmentStatus } from './appointment-status';

type AppointmentListItem = {
  id: number;
  reference_code: string;
  carrier_name: string;
  warehouse_name: string;
  dock_door_name: string;
  status: AppointmentStatus;
  scheduled_start: string;
  scheduled_end: string;
};

@Injectable()
export class AppointmentsService {
  constructor(private readonly db: DatabaseService) {}

  async list(): Promise<AppointmentListItem[]> {
    return this.db.query<AppointmentListItem>(
      `
      SELECT
        a.id,
        a.reference_code,
        a.carrier_name,
        w.name AS warehouse_name,
        d.name AS dock_door_name,
        a.status,
        a.scheduled_start,
        a.scheduled_end
      FROM appointment a
      JOIN warehouse w ON w.id = a.warehouse_id
      JOIN dock_door d ON d.id = a.dock_door_id
      ORDER BY a.scheduled_start ASC
      LIMIT 50
      `,
    );
  }
}
