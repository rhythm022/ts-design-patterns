import { Server, DataType, ClientIncrementChange, ClientValueChange } from './';

export interface ClientDataItem<T> {
    id: string;
    value: T;
}
export interface ClientDataStore {
    timestamp: number;
    items: {
        [id: string]: ClientDataItem<string | number>;
    };
    changed: {
        [id: string]: any;
    };
}

export class Client {
    store: ClientDataStore = {
        timestamp: 0,
        items: Object.create(null),
        changed: Object.create(null)
    };
    constructor(
        public server: Server
    ) { }
    synchronize(): void {
        let store = this.store;
        let clientItems = store.items;
        let changedTimes = store.changed;
        let clientChanges: any = Object.create(null);
        for (let id of Object.keys(changedTimes)) {
            clientChanges[id] = {
                lastModifiedTime: changedTimes[id],
                value: clientItems[id].value
            };
        }
        let response = this.server.synchronize({
            timestamp: store.timestamp,
            clientTime: Date.now(),
            changes: clientChanges
        });
        let serverChanges = response.changes;
        for (let id of Object.keys(serverChanges)) {
            clientItems[id] = {
                id,
                value: serverChanges[id]
            };
        }
        store.timestamp = response.timestamp;
        store.changed = Object.create(null)
    }

    update(id: string, type: 'increment', increment: number): void;
    update<T>(id: string, type: 'value', value: T): void;
    update<T>(id: string, type: DataType, value: T): void {
        let store = this.store;
        let items = store.items;
        let storedChanges = store.changed;
        if (type === 'value') { } else if (type === 'increment') {
            let storedChange = storedChanges[id] as ClientIncrementChange;
            if (storedChange) {
                storedChange.increment += <any>value as number;
            } else {
                storedChange = {
                    type: 'increment',
                    uid: Date.now().toString(),
                    increment: <any>value as number
                };
                storedChanges[id] = storedChange;
            }
        } else {
            throw new TypeError('Invalid data type');
        }
    }
} 