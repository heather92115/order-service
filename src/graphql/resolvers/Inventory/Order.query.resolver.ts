import { OrderInput } from 'models/Order/Order.input';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import { OrderService } from 'services/Order.service';


@Resolver()
export class OrderResolver {
  constructor(
    private readonly logger: PinoLogger,
    private readonly orderService: OrderService,
  ) {
    this.logger.setContext(OrderResolver.name);
  }

}
