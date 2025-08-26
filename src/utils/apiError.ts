import { TFunction } from "i18next";

class ApiError extends Error {
  status: string;
  action: string | null;
  success: boolean;
  statusCode: number;
  override message: string;

  constructor(
    statusCode: number,
    messageKey: string,
    t: TFunction,
    variables?: Record<string, any>,
    action?: string | null
  ) {
    const translatedMessage = t(messageKey, variables);
    super(translatedMessage);

    this.statusCode = statusCode;
    this.success = false;
    this.action = action ?? null;
    this.message = translatedMessage;

    this.status = this.statusCode.toString().startsWith("4")
      ? "warning"
      : "error";

    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = this.constructor.name;
  }
}

export { ApiError };
