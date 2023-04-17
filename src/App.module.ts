import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';

import { Auth0Config, AuthConfig } from '@thirtymadison/nestjs-auth';
import { PrismaModule } from '@thirtymadison/nestjs-prisma';

import AppConfig from 'config/App.config';
import EnvironmentConfig from 'config/Environment.config';
import GraphQLConfig, { getGraphQLConfig } from 'config/GraphQL.config';
import KafkaClientConfig from 'config/KafkaClient.config';
import LoggerConfig, { getLoggerConfig } from 'config/Logger.config';
import SentryConfig from 'config/Sentry.config';
import VaultConfig from 'config/Vault.config';
import { AppController } from 'controllers/App.controller';

import { HealthModule } from './Health.module';

@Module({
  controllers: [AppController],
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [
        AppConfig,
        AuthConfig,
        Auth0Config,
        EnvironmentConfig,
        GraphQLConfig,
        KafkaClientConfig,
        LoggerConfig,
        SentryConfig,
        VaultConfig,
      ],
    }),
    LoggerModule.forRoot(getLoggerConfig()),
    HealthModule,
    PrismaModule.register({
      isGlobal: true,
      rejectOnNotFound: true,
    }),
    GraphQLFederationModule.forRoot(getGraphQLConfig()),
  ],
})
export class AppModule {}
