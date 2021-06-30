export class APIError extends Error {
  public extensions: Record<string, any>;
  public statusCode: number;
  [key: string]: any;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    properties?: Record<string, any>
  ) {
    super(message);

    if (properties) {
      Object.keys(properties).forEach((key) => {
        this[key] = properties[key];
      });
    }

    this.statusCode = statusCode;
    this.extensions = { code };
  }

  public toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      extensions: this.extensions,
    };
  }
}
