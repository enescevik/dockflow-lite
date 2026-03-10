export const appointmentStatuses = [
  'planned',
  'checked_in',
  'loading',
  'completed',
  'missed',
  'cancelled',
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];
