interface AxiosErrorInterface extends Error {
  response: string | null;
}
class AxiosError extends Error implements AxiosErrorInterface {
  response: string | null = null;

  constructor(message: string, response: string) {
    super(message);
    this.response = response;
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export default AxiosError;
