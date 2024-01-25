export interface MetaDataItem {
    date: string;
    code: string;
    type: string;
}

export interface ObjectListItem {
    token: string;
}

export interface ApiResponse {
    metaData: MetaDataItem[];
    objectList?: ObjectListItem[] | null;
}