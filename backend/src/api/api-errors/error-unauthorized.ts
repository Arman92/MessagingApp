import { APIError } from './api-error';

export class UnAuthorizedError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 401, 'UNAUTHORIZED', properties);

    Object.defineProperty(this, 'name', { value: 'UnAuthorizedError' });
  }
}
