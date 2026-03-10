type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

type AppointmentRow = {
  id: number;
  reference_code: string;
  warehouse_name: string;
  dock_door_name: string;
  carrier_name: string;
  status: string;
};

const baseUrl =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export async function getApiHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${baseUrl}/health`, { cache: 'no-store' });

    if (!response.ok) {
      return {
        status: 'unreachable',
        service: 'dockflow-api',
        timestamp: new Date().toISOString(),
      };
    }

    return response.json();
  } catch {
    return {
      status: 'unreachable',
      service: 'dockflow-api',
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getDemoAppointments(): Promise<AppointmentRow[]> {
  try {
    const response = await fetch(`${baseUrl}/appointments`, { cache: 'no-store' });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}
