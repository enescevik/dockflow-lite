export const schemaSql = `
CREATE TABLE IF NOT EXISTS tenant (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warehouse (
  id SERIAL PRIMARY KEY,
  tenant_id INT NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  timezone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dock_door (
  id SERIAL PRIMARY KEY,
  warehouse_id INT NOT NULL REFERENCES warehouse(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointment (
  id SERIAL PRIMARY KEY,
  tenant_id INT NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
  warehouse_id INT NOT NULL REFERENCES warehouse(id) ON DELETE CASCADE,
  dock_door_id INT NOT NULL REFERENCES dock_door(id) ON DELETE CASCADE,
  carrier_name TEXT NOT NULL,
  reference_code TEXT NOT NULL UNIQUE,
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planned', 'checked_in', 'loading', 'completed', 'missed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_warehouse_tenant_id ON warehouse(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dock_door_warehouse_id ON dock_door(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_appointment_warehouse_time ON appointment(warehouse_id, scheduled_start);
`;
