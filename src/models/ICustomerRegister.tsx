
export interface ICustomerRegister {
    status: boolean;
    message?: string;
    result: Result;
    error?:  Error[];
}

export interface Result {
    createdBy?:          string;
    lastModifiedBy?:     string;
    createdDate?:        number;
    lastModifiedDate?:   number;
    id?:                 number;
    firstName?:          string;
    lastName?:           string;
    phone?:              string;
    email?:              string;
    password:           string;
    enabled:            boolean;
    tokenExpired:       boolean;
    roles:               Role[];
    resetPasswordToken?: null;
}

export interface Role {
    id?:   number;
    name?: string;
}
export interface Error {
    firstName?: string;
    secondName?:  string;
    telephone?:     string;
    email?:     string;
    password?:  string;
}


