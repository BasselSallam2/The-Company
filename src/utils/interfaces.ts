export enum LoginStatus {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
  WRONG_OTP = "WRONG_OTP",
  OTP_SENT = "OTP_SENT",
  LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY",
  WRONG_ID = "WRONG_ID",
  UNAUTHORIZED = "UNAUTHORIZED",
  EXPIRED_OTP = "EXPIRED_OTP",
}

export const Permessions = {
  USERCREATE: "user:create",
  USERREAD: "user:read",
  USERUPDATE: "user:update",
  USERDELETE: "user:delete",
  EMPLOYEECREATE: "employee:create",
  EMPLOYEEREAD: "employee:read",
  EMPLOYEEUPDATE: "employee:update",
  EMPLOYEEDELETE: "employee:delete",
  RequestCREATE: "Request:create",
  RequestREAD: "Request:read",
  RequestUPDATE: "Request:update",
  RequestDELETE: "Request:delete",
  CACHECLEAR: "cache:clear",
  LOGCLEAR: "log:clear",
} as const;
