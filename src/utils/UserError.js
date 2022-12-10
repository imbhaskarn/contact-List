"use strict";
class UserError extends Error {
  constructor(code, message) {
    super(message);
    Error.captureStackTrace(this, UserError);
    this.name = "UserError";
    this.code = code;
    this.message = message;
  }
}

export default UserError;
