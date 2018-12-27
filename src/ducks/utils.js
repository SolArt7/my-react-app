import {OrderedMap, Map} from 'immutable';

export function generateId() {
    return Date.now();
}

export function fbDataToEntities(data, RecordModel = Map) {
    return (new OrderedMap(data)).mapEntries(([uid, value]) => {
        return [uid, new RecordModel(value).set('uid', uid)]
    })
}