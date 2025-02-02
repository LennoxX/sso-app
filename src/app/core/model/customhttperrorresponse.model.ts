import { ApiError } from "./apierror.model";

export class CustomHttpErrorResponse {
    constructor(public error: ApiError){

    }
}