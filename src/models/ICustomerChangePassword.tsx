export interface ICustomerChangePassword {
    message?: string;
    status?:  string;
    error?:  Error[];
}
export interface Error {
    newPassword?: string;
    oldPassword?:string
}
