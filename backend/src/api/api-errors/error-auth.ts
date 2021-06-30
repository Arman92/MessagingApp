import { APIError } from './api-error';

export class AuthenticationError extends APIError {
  constructor(message: string) {
    super(message, 403, 'UNAUTHENTICATED');

    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
