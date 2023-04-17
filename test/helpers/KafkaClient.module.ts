import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { getKafkaConfig } from 'config/KafkaClient.config';
import { KAFKA_CLIENT } from 'constants/KafkaClient.constants';

@Global()
@Module({
  providers: [
    {
      provide: KAFKA_CLIENT,
      useFactory: () =>
        ClientProxyFactory.create({
          options: getKafkaConfig(),
          transport: Transport.KAFKA,
        }),
    },
  ],
  exports: [KAFKA_CLIENT],
})
export class KafkaTestClientModule {}
