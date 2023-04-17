import { CacheModule, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import {
  Auth0Config,
  AuthConfig,
  DoctorGuard,
  DoctorJwtStrategy,
  TestAuthModule,
} from '@thirtymadison/nestjs-auth';
import { FlagsService } from '@thirtymadison/nestjs-flags';
import { PrismaModule } from '@thirtymadison/nestjs-prisma';

import { MockFlagsService } from '__mocks__/@thirtymadison/flags';
import { getGraphQLConfig } from 'config/GraphQL.config';

export async function createAppModule(): Promise<INestApplication> {
  let app: INestApplication;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TestAuthModule,
      CacheModule.register({
        isGlobal: true,
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        load: [Auth0Config, AuthConfig],
      }),
      PassportModule.register({ defaultStrategy: 'doctorJwt' }),
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: config.get<string>('auth.secret'),
          signOptions: {
            expiresIn: config.get<string>('auth.adminTokenExpiry'),
          },
        }),
        imports: [],
      }),
      PrismaModule.register({
        isGlobal: true,
      }),
      LoggerModule.forRoot(),
      GraphQLFederationModule.forRoot(getGraphQLConfig()),
    ],
    providers: [
      DoctorGuard,
      DoctorJwtStrategy,
      {
        provide: FlagsService,
        useClass: MockFlagsService,
      },
    ],
  }).compile();

  app = moduleFixture.createNestApplication(undefined);

  const validationPipe = new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
  });
  app.useGlobalPipes(validationPipe);
  app = await app.init();
  return app;
}
