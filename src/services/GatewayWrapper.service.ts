import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

import { ApolloService } from '@thirtymadison/apollo-client';

import { getGraphQLConfig } from 'config/GraphQL.config';

@Injectable()
export class GatewayWrapperService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
    private readonly apolloService: ApolloService,
  ) {
    this.logger.setContext(GatewayWrapperService.name);
  }

  private async createClient(args: {
    clientAuthorizationType: 'machine' | 'passthrough' | 'none';
    headers?: Record<string, unknown>;
  }) {
    return this.apolloService.client({
      clientAuthorizationType: args.clientAuthorizationType,
      uri: getGraphQLConfig().gatewayURL,
      headers: args.headers,
    });
  }
}
