interface MetaData {
    type: string;
    code: string;
    date: string;
}

export interface ApiResponse<T> {
    metaData: MetaData[];
    objectList?: T[];
}