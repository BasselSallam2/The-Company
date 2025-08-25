import { TFunction } from "i18next";

export class ApiError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(statusCode: number, messageKey: string , t: TFunction , variables?: Record<string, any>) {
        super(t(messageKey, variables));

        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? t('errors.fail') : t('errors.error');
        this.isOperational = true;

        Object.setPrototypeOf(this, ApiError.prototype);
        this.name = this.constructor.name;
    }
}

export default ApiError ;
