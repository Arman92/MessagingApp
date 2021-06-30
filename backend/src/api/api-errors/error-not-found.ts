import { APIError } from './api-error';

export class NotFoundError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 404, 'NOT_FOUND', properties);

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
