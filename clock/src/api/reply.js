import service from '../axios'

export function selectUserReply(did) {
    return service({
        method: 'post',
        url: '/reply/selectUserReply',
        params: {
            did: did
        }
    })
}

export function addRootReply(data) {
    return service({
        method: 'post',
        url: '/reply/addRootReply',
        data: data
    })
}

export function addSonReply(data) {
    return service({
        method: 'post',
        url: '/reply/addSonReply',
        data: data
    })
}

export function deleteReply(rid) {
    return service({
        method: 'get',
        url: '/reply/deleteReply',
        params: {
            rid: rid
        }
    })
}
