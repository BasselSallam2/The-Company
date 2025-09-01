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
  EMPLOYEECREATE: "employe:create",
  EMPLOYEEREAD: "employe:read",
  EMPLOYEEUPDATE: "employe:update",
  EMPLOYEEDELETE: "employe:delete",
  RequestCREATE: "request:create",
  RequestREAD: "request:read",
  RequestUPDATE: "request:update",
  RequestDELETE: "request:delete",
  CACHECLEAR: "cache:clear",
  LOGCLEAR: "log:clear",
  ACTIVITYREAD: "activity:read",
} as const;
