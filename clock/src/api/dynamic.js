import service from '../axios'

export function selectAllDynamic(data) {
    return service({
        method: 'post',
        url: '/dynamic/selectAllDynamic',
        data: data
    })
}

export function selectDynamicByName(username) {
    return service({
        method: 'post',
        url: '/dynamic/selectDynamicByName',
        params:{
            username: username
        }
    })
}

export function selectThisDynamic(uid) {
    return service({
        method: 'post',
        url: '/dynamic/selectUserDynamic',
        params: {
            uid: uid
        }
    })
}

export function updateDynamic(data) {
    return service({
        method: 'post',
        url: '/dynamic/updateDynamic',
        data: data
    })
}

export function deleteDynamic(did) {
    return service({
        method: 'get',
        url: '/dynamic/deleteDynamic',
        params: {
            did: did
        }
    })
}

export function addUserDynamic(data,id) {
    return service({
        method: 'post',
        url: '/dynamic/addUserDynamic',
        // params: {
            data: data,
            id:id,
        // }
    })
}
