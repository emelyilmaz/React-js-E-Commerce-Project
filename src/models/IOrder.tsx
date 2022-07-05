export interface IOrder {
    status?: boolean;
    result?: Result[];
}

export interface Result {
    createdBy?:        string;
    lastModifiedBy?:   string;
    createdDate?:      number;
    lastModifiedDate?: number;
    id?:               number;
    customer?:         Customer;
    baskets?:          Basket[];
    total?:            number;
}

export interface Basket {
    createdBy?:        string;
    lastModifiedBy?:   string;
    createdDate?:      number;
    lastModifiedDate?: number;
    id?:               number;
    product?:          Product;
    status?:           boolean;
    quantity?:         number;
}

export interface Product {
    createdBy?:        null | string;
    lastModifiedBy?:   string;
    createdDate?:      number;
    lastModifiedDate?: number;
    id?:               number;
    name?:             string;
    detail?:           string;
    price?:            number;
    stockQuantity?:    number;
    category?:         Category;
}

export interface Category {
    createdBy?:        string;
    lastModifiedBy?:   string;
    createdDate?:      number;
    lastModifiedDate?: number;
    id?:               number;
    categoryName?:     string;
}

export interface Customer {
    id?:               number;
    firstName?:        string;
    secondName?:       string;
    telephone?:        string;
    email?:            string;
    password?:         string;
    enabled?:          boolean;
    tokenExpired?:     boolean;
    verificationCode?: null;
    roles?:            Role[];
}

export interface Role {
    id?:   number;
    name?: string;
}
export interface Rows{
    id:number|undefined,
    createdDate: string|undefined,
    total:number|undefined,
    baskets:Basket[]|undefined

}