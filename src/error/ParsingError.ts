export class ParsingError extends Error {
  public name: string;

  constructor(message: string, name: string = 'ParsingError') {
    super(message);

    this.name = name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParsingError);
    }
  }
}
