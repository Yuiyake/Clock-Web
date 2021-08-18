import service from '../axios'

export function selectAllGroups(data) {
    return service({
        method: 'post',
        url: '/group/selectAllGroups',
        data: data
    })
}

export function selectMyGroups(uid) {
    return service({
        method: 'post',
        url: '/group/selectMyGroups',
        params: {
            uid: uid
        }
    })
}

export function userJoinGroup(uid, gid) {
    return service({
        method: 'post',
        url: '/group/userJoinGroup',
        params: {
            uid: uid,
            gid: gid,
        }
    })
}

export function updateGroup(data) {
    return service({
        method: 'post',
        url: '/group/updateGroup',
        data: data
    })
}

export  function changeGnum(gid) {
    return service({
        method: 'post',
        url: '/group/changeGnum',
        params: {
            gid: gid
        }
    })
}
