// 管理员模块router
const AdminRouter = {
    path: '/adminMain',
    redirect: 'userList',
    component: () => import('../../views/admin/Main'),
    children: [
        {
            path: '/userList',
            name: 'userList',
            component: () => import('../../views/admin/UserList'),
        },
        {
            path: '/adminAddUser',
            name: 'adminAddUser',
            component: () => import('../../views/admin/adminAddUser')
        },
        {
            path: '/userRecycle',
            name: 'userRecycle',
            component: () => import('../../views/admin/userRecycle')
        },
        {
            path: '/typeInfo',
            name: 'typeInfo',
            component: () => import('../../views/admin/typeInfo')
        },
        {
            path: '/groupEcharts',
            name: 'groupEcharts',
            component: () => import('../../views/admin/groupEcharts')
        },
        {
            path: '/groupInfo',
            name: 'groupInfo',
            component: () => import('../../views/admin/groupInfo')
        },
        {
            path: '/dynamicInfo',
            name: 'dynamicInfo',
            component: () => import('../../views/admin/dynamicInfo')
        },
        {
            path: '/announcement',
            name: 'announcement',
            component: () => import('../../views/admin/announcement')
        },
        {
            path: '/adminInfo',
            name: 'adminInfo',
            component: () => import('../../views/admin/adminInfo')
        },
    ]
}

export default AdminRouter
