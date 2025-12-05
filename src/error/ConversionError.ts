export class ConversionError extends Error {
  public name: string;

  constructor(message: string, name: string = 'ConversionError') {
    super(message);

    this.name = name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConversionError);
    }
  }
}
