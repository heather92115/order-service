import { Injectable } from '@nestjs/common';

import { PrismaService } from '@thirtymadison/nestjs-prisma';

import { plainToInstance } from 'class-transformer';
import { OrderInput } from 'models/Order/Order.input';
import { ValidationError } from 'apollo-server-errors';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async find(): Promise<OrderInput[]> {
    const records = await this.prisma.order.findMany({

    });

    return plainToInstance(OrderInput, records);
  }

  async getOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new ValidationError(`Failed to find order ${orderId}`);
    }
    return order;
  }

}
