import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditsModule } from './audits/audits.module';
import { UsersModule } from './users/users.module';
import { SiteModule } from './site/site.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuditsModule, UsersModule, SiteModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
