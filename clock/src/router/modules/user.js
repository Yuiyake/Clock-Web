// 用户模块router
const UserRouter = {
    path: '/userMain',
    redirect: 'userMsg',
    component: () => import('../../views/user/Main'),
    children: [
        {
            path: '/userMsg',
            name: 'userMsg',
            component: () => import('../../views/user/userMsg'),
        },
        {
            path: '/timeLine',
            name: 'timeLine',
            component: () => import('../../views/user/timeLine'),
        },
        {
            path: '/userComment',
            name: 'userComment',
            component: () => import('../../views/user/userComment'),
        },
    ]
}

export default UserRouter
