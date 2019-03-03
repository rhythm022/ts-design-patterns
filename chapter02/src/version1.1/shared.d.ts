export interface DataSyncingInfo {
    timestamp: number;
    data: string;
}
export type DataType = "value" | "increment";
export interface ClientChange {
    type: DataType;
}
interface ClientChangeList<T extends ClientChange> {
    type: DataType;
    changes: T[];
}

export interface ClientValueChange<T> extends ClientChange {
    type: "value";
    lastModifiedTime: number;
    value: T;
}
export interface ClientIncrementChange extends ClientChange {
    type: "increment";
    synced:boolean;
    uid: string;
    increment: number
}
export interface SyncingRequest {
    timestamp: number;
    changeLists: {
        [id: string]: ClientChangeList<ClientChange>;
    };
}

export interface SyncingResponse {
    timestamp: number;
    changes: {
        [id: string]: string;
    };
} 