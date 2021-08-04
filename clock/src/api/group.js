import service from '../axios'

export function selectAllGroups(data) {
    return service({
        method: 'post',
        url: '/group/selectAllGroups',
        data: data
    })
}
