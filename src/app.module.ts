import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditsModule } from './audits/audits.module';
import { UsersModule } from './users/users.module';
import { SiteModule } from './site/site.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CsrfMiddleware } from './common/middleware/csrf.middleware';
import cookieParser from 'cookie-parser';

@Module({
  imports: [PrismaModule, AuditsModule, UsersModule, SiteModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), CsrfMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/csrf-token', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}


