import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [ProfileModule, AuthModule, ProductionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
