export interface ILogin {
    status:  boolean;
    message?: string;
    jwt?:     string;
    result?:  Result;
    error?:   string
}

export interface Result {
    companyName?:        string;
    adminName?:          string;
    adminSurname?:       string;
    createdBy?:          string;
    lastModifiedBy?:     string;
    createdDate?:        number;
    lastModifiedDate?:   number;
    id?:                 number;
    firstName?:          string;
    lastName?:           string;
    phone?:              string;
    email?:              string;
    password?:           string;
    enabled?:            boolean;
    tokenExpired?:       boolean;
    roles?:        Role[];
    resetPasswordToken?: string;
}

export interface Role {
    id:   number;
    name: string;
}
