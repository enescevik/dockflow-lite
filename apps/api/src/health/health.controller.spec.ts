import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns ok', () => {
    const controller = new HealthController();
    const result = controller.getHealth();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('dockflow-api');
    expect(result.timestamp).toBeDefined();
  });
});
