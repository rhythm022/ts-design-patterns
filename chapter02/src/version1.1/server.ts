import { DataSyncingInfo, SyncingRequest, SyncingResponse } from "./";
interface DataStore {
    timestamp: number;
    data: string;
}
export interface ServerDataItem<T> {
    id: string;
    timestamp: number;
    lastModifiedTime: number;
    value: T;
}
export interface ServerDataStore {
    items: {
        [id: string]: ServerDataItem<string |number>;
    };
}




export class Server {
    store: ServerDataStore;
    synchronize(request: SyncingRequest): SyncingResponse {
        let now = Date.now();
        let clientTimeOffset = now - request.clientTime;
        let items = this.store.items;
        let lastTimestamp = request.timestamp;
        let clientChanges = request.changes;
        for (let id of Object.keys(clientChanges)) {
            let clientChange = clientChanges[id];
            let lastModifiedTime = Math.min(  clientChange.lastModifiedTime + clientTimeOffset,  now );
            if (Object.prototype.hasOwnProperty.call(items, id) &&
             items[id].lastModifiedTime > clientChange.lastModifiedTime) {
                continue;
            }
            items[id] = {
                id,
                timestamp: now,
                lastModifiedTime:clientChange.lastModifiedTime,
                value: clientChange.value
            };
        }
        let serverChanges: any = Object.create(null);
        for (let id of Object.keys(items)) {
            let item = items[id];
            if (item.timestamp > lastTimestamp && item.timestamp !== now) {
                serverChanges[id] = item.value;
            }
        }
        return {
            timestamp: now,
            changes: serverChanges
        };
    }
}