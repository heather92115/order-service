import { Module } from '@nestjs/common';

import { ApolloService } from '@thirtymadison/apollo-client';
import { AuthModule } from '@thirtymadison/nestjs-auth';

import { GatewayWrapperService } from 'services/GatewayWrapper.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [ApolloService, GatewayWrapperService],
  exports: [ApolloService, GatewayWrapperService],
})
export class GatewayClientModule {}
