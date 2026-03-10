import { getApiHealth, getDemoAppointments } from '../src/lib/api';

export default async function HomePage() {
  const [health, appointments] = await Promise.all([
    getApiHealth(),
    getDemoAppointments(),
  ]);

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">DockFlow Lite</p>
        <h1>Warehouse Dock Appointment Scheduling</h1>
        <p className="copy">
          Demo auth placeholder: signed in as <strong>dispatcher@demo.local</strong>
        </p>
        <div className="status-row">
          <span className={health.status === 'ok' ? 'pill ok' : 'pill warn'}>
            API health: {health.status}
          </span>
          <span className="pill">Service: {health.service}</span>
        </div>
      </section>

      <section>
        <h2>Today&apos;s Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Ref</th>
              <th>Warehouse</th>
              <th>Door</th>
              <th>Carrier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.reference_code}</td>
                <td>{appt.warehouse_name}</td>
                <td>{appt.dock_door_name}</td>
                <td>{appt.carrier_name}</td>
                <td>
                  <span className="pill">{appt.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
