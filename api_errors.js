const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class ApiErrorResponse {
  constructor(response, statusCode) {
    this.MESSAGE = {
      [StatusCodes.BAD_REQUEST]: ReasonPhrases.BAD_REQUEST,
      [StatusCodes.NOT_FOUND]: ReasonPhrases.NOT_FOUND,
    };
    this.statusCode = statusCode;
    this.response = response;
  }

  sendErrorResponse() {
    this.response.status(this.statusCode)
    this.response.send({
        error: this.getErrorMessageByStatusCode(this.statusCode)
    })
  }

  getErrorMessageByStatusCode(statusCode) {
    return this.MESSAGE[statusCode];
  }
}

module.exports = ApiErrorResponse;
