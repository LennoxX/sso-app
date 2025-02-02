
export class  ApiError {
    
    constructor(
        public httpStatus?: number,
        public message?: string,
        public errors?: any) {

    }

    static fromJson(jsonData: any): ApiError {
        return Object.assign(new ApiError(), jsonData);
    }

    static toJson(apiError: ApiError): string {
        return JSON.stringify({apiError});
    }
    

}