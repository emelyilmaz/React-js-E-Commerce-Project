export interface ICategory {
    result?: Results[];
    status?: boolean;
}

export interface Results {
    createdBy?:        string;
    lastModifiedBy?:   string;
    createdDate?:      number;
    lastModifiedDate?: number;
    id?:               number;
    categoryName?:     string;
}
