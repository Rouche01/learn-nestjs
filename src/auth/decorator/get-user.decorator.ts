import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user[data]) {
      return request.user[data];
    }
    return request.user;
  },
);
