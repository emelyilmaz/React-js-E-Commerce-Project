export interface IBasket {
    status:  boolean;
    message?: string;
    error?:   Error[];
    result?: Result[];
}

export interface Error {
    quantity?: string;
}


export interface Result {
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
    createdBy?:        null;
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
