import { APIError } from './api-error';

export class TimeoutError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 408, 'TIME_OUT', properties);

    Object.defineProperty(this, 'name', { value: 'TimeoutError' });
  }
}
