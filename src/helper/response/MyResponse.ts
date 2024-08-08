export class MyResponse {
  success: boolean;
  data: any;
  time: Date;
  status: number;
  constructor(data: any, success: boolean, status?: number) {
    this.success = success;
    this.data = data;
    this.time = new Date();
    this.status = status;
  }

  static success(data: any, status?: number) {
    status = status || 200;
    return new MyResponse(data, true, status);
  }

  static error(error: any, status?: number) {
    status = status || 400;
    return new MyResponse(error, false, status);
  }
}
