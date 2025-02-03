// Custom API response for consistent data returns at frontend

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.success = statusCode < 400);
  }
}

export { ApiResponse };
