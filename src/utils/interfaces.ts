export enum LoginStatus {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
  WRONG_OTP = "WRONG_OTP",
  OTP_SENT = "OTP_SENT",
  LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY",
  WRONG_ID = "WRONG_ID",
  UNAUTHORIZED = "UNAUTHORIZED",
  EXPIRED_OTP = "EXPIRED_OTP"
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
    OVERTIMECREATE: "overtime:create",
    OVERTIMEREAD: "overtime:read",
    OVERTIMEUPDATE: "overtime:update",
    OVERTIMEDELETE: "overtime:delete"

} as const;