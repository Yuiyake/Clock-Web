import service from '../axios'

export function userLogin(data) {
    return service({
        method: 'post',
        url: '/user/login',
        data: data
    })
}

export function userRegister(data) {
    return service({
        method: 'post',
        url: '/user/register',
        data: data
    })
}

export function selectAllUser(data) {
    return service({
        method: 'post',
        url: '/user/selectAllUser',
        data: data
    })
}

export function deleteUser(data) {
    return service({
        method: 'get',
        url: '/user/deleteUser',
        params: {
            id: data
        }
    })
}

export function updateUser(data) {
    return service({
        method: 'post',
        url: '/user/updateUser',
        data: data
    })
}
