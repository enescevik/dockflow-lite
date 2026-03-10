import { Pool } from 'pg';
import { schemaSql } from '../src/database/schema';

const connectionString =
  process.env.DATABASE_URL ?? 'postgres://dockflow:dockflow@localhost:5432/dockflow';

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(retries: number): Promise<Pool> {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const pool = new Pool({ connectionString });

    try {
      await pool.query('SELECT 1');
      return pool;
    } catch (error) {
      await pool.end();
      if (attempt === retries) {
        throw error;
      }
      // eslint-disable-next-line no-console
      console.log(`DB not ready yet (attempt ${attempt}/${retries}), retrying...`);
      await pause(1500);
    }
  }

  throw new Error('Could not connect to database');
}

async function runSeed() {
  const pool = await connectWithRetry(20);

  try {
    await pool.query(schemaSql);
    await pool.query('BEGIN');

    await pool.query('TRUNCATE TABLE appointment, dock_door, warehouse, tenant RESTART IDENTITY CASCADE');

    const tenantResult = await pool.query<{ id: number }>(
      `INSERT INTO tenant (name)
       VALUES ('Acme Retail'), ('Northwind Foods')
       RETURNING id`,
    );
    const [tenantA, tenantB] = tenantResult.rows;

    const warehouseResult = await pool.query<{ id: number; name: string }>(
      `INSERT INTO warehouse (tenant_id, name, timezone)
       VALUES
         ($1, 'Dallas DC', 'America/Chicago'),
         ($1, 'Chicago Hub', 'America/Chicago')
       RETURNING id, name`,
      [tenantA.id],
    );

    const atlantaResult = await pool.query<{ id: number; name: string }>(
      `INSERT INTO warehouse (tenant_id, name, timezone)
       VALUES ($1, 'Atlanta Cold Storage', 'America/New_York')
       RETURNING id, name`,
      [tenantB.id],
    );

    const [dallas, chicago] = warehouseResult.rows;
    const atlanta = atlantaResult.rows[0];

    const dallasDoors = await pool.query<{ id: number }>(
      `INSERT INTO dock_door (warehouse_id, name)
       VALUES ($1, 'D-01'), ($1, 'D-02'), ($1, 'D-03')
       RETURNING id`,
      [dallas.id],
    );

    const chicagoDoors = await pool.query<{ id: number }>(
      `INSERT INTO dock_door (warehouse_id, name)
       VALUES ($1, 'C-01'), ($1, 'C-02')
       RETURNING id`,
      [chicago.id],
    );

    const atlantaDoors = await pool.query<{ id: number }>(
      `INSERT INTO dock_door (warehouse_id, name)
       VALUES ($1, 'A-01'), ($1, 'A-02')
       RETURNING id`,
      [atlanta.id],
    );

    await pool.query(
      `INSERT INTO appointment
       (tenant_id, warehouse_id, dock_door_id, carrier_name, reference_code, scheduled_start, scheduled_end, status, notes)
       VALUES
       ($1, $2, $3, 'Swift Logistics', 'DFL-1001', NOW() + INTERVAL '30 minutes', NOW() + INTERVAL '90 minutes', 'planned', 'Palletized dry goods'),
       ($1, $2, $4, 'RoadRunner Freight', 'DFL-1002', NOW() - INTERVAL '45 minutes', NOW() + INTERVAL '15 minutes', 'checked_in', 'Driver waiting at gate'),
       ($1, $2, $5, 'BlueLine Transport', 'DFL-1003', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', 'completed', 'Unloaded successfully'),
       ($6, $7, $8, 'Mountain Carriers', 'DFL-2001', NOW() + INTERVAL '3 hours', NOW() + INTERVAL '4 hours', 'loading', 'Live unload in progress'),
       ($6, $7, $9, 'Metro Haul', 'DFL-2002', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '3 hours', 'missed', 'Carrier no-show'),
       ($6, $7, $8, 'Atlas LTL', 'DFL-2003', NOW() + INTERVAL '5 hours', NOW() + INTERVAL '6 hours', 'cancelled', 'Rescheduled by carrier')`,
      [
        tenantA.id,
        dallas.id,
        dallasDoors.rows[0].id,
        dallasDoors.rows[1].id,
        dallasDoors.rows[2].id,
        tenantB.id,
        atlanta.id,
        atlantaDoors.rows[0].id,
        atlantaDoors.rows[1].id,
        atlantaDoors.rows[0].id,
      ],
    );

    await pool.query('COMMIT');
    // eslint-disable-next-line no-console
    console.log('Seed complete: demo tenants, warehouses, dock doors, and appointments inserted.');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  } finally {
    await pool.end();
  }
}

runSeed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', error);
  process.exit(1);
});
