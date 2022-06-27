export interface IProduct {
    status?: boolean;
    result?: Result[];
    statuscode?:    number;
    error?:     string;
    message?:   string;
    path?:      string;
}

export interface Result {
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