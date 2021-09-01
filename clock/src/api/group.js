import service from '../axios'

export function selectAllGroups(data) {
    return service({
        method: 'post',
        url: '/group/selectAllGroups',
        data: data
    })
}

export function selectByGroupName(data) {
    return service({
        method: 'post',
        url: '/group/selectByGroupName',
        data: data
    })
}

export function userAddGroup(data){
    return service({
        method: 'post',
        url: '/group/userAddGroup',
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

export function userQuitGroup(uid, gid){
    return service({
        method: 'delete',
        url: '/group/userQuitGroup',
        params: {
            uid: uid,
            gid: gid,
        }
    })
}

export function userDeleteGnum(gid){
    return service({
        method: 'post',
        url: '/group/userDeleteGnum',
        params: {
            gid: gid,
        }
    })
}

export function getBarList() {
    return service({
        method: 'get',
        url: '/group/barvo'
    })
}

export function userGroupClock(gid, uid) {
    return service({
        method: 'post',
        url: '/group/userGroupClock',
        params: {
            gid: gid,
            uid: uid,
        }
    })
}
