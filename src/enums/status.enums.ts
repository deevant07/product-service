export enum Status {
    SUCCESS = 'success',
    ERROR = 'error',
    BAD_REQUEST = 'bad request',
}
export enum StatusCode {
    OK = 200,
    ERROR = 500,
    BAD_REQUEST = 400,
}


export const STATUS_MESSAGES = {
    200: Status.SUCCESS,
    400: Status.BAD_REQUEST,
    500: Status.ERROR,
}