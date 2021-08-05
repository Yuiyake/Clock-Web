import service from '../axios'

export function selectAllType(data) {
    return service({
        method: 'post',
        url: '/type/selectAllType',
        data: data
    })
}

export function updateType(data) {
    return service({
        method: 'post',
        url: '/type/updateType',
        data: data
    })
}

export function deleteType(tid) {
    return service({
        method: 'get',
        url: '/type/deleteType',
        params: {
            tid: tid
        }
    })
}
