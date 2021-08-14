import service from '../axios'

export function selectUserReply(did) {
    return service({
        method: 'post',
        url: '/reply/selectUserReply',
        did: did
    })
}

export function addReply(data) {
    return service({
        method: 'post',
        url: '/reply/addReply',
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
