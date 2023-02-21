import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, contexto: ExecutionContext) => {
    const req = contexto.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
