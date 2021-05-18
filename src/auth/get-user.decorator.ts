import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    // return data ? user?.[data] : user;

    return user
  },
);
