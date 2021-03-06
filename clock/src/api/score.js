import service from '../axios'

export function selectAllScore(data) {
    return service({
        method: 'post',
        url: '/score/selectAllScore',
        data: data
    })
}

export function selectUserScore(uid) {
    return service({
        method: 'post',
        url: '/score/selectUserScore',
        params: {
            uid: uid
        }
    })
}

export function userDaka(uid) {
    return service({
        method: 'post',
        url: '/score/userDaka',
        params: {
            uid: uid
        }
    })
}
