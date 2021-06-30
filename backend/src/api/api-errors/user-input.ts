import { APIError } from './api-error';

export class UserInputError extends APIError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 422, 'BAD_USER_INPUT', properties);

    Object.defineProperty(this, 'name', { value: 'UserInputError' });
  }
}
