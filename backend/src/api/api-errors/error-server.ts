import { APIError } from './api-error';

export class ServerError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 500, 'SERVER_ERROR', properties);

    Object.defineProperty(this, 'name', { value: 'ServerError' });
  }
}
