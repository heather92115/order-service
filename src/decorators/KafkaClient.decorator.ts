import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// TODO: This will no longer be necessary after
// @nestjs/microservices@8 is released.
// Included in the 8.x release is an update to the payload
// decorator which introduces a parameter to dig into
// specific keys in the payload.
export const Message = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const { value: message } = ctx.getArgs()[0];

    return message;
  },
);
