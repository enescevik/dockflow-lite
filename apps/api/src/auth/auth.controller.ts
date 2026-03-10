import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('demo')
  getDemoUser() {
    return {
      mode: 'demo',
      user: {
        id: 'demo-dispatcher-1',
        email: process.env.DEMO_USER_EMAIL ?? 'dispatcher@demo.local',
        role: 'dispatcher',
      },
    };
  }
}
