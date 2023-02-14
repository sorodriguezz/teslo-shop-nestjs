import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, contexto: ExecutionContext) => {
    const req = contexto.switchToHttp().getRequest();
    const user = req.user;

    if(!user){
      throw new InternalServerErrorException('User not found (request)');
    }

    return user;
  },
);
