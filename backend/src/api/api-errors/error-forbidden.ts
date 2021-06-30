import { APIError } from './api-error';

export class ForbiddenError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 403, 'FORBIDDEN', properties);

    Object.defineProperty(this, 'name', { value: 'ForbiddenError' });
  }
}
