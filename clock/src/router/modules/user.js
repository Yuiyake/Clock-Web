// 用户模块router
const UserRouter = {
    path: '/userMain',
    redirect: 'userMsg',
    component: () => import('../../views/user/Main'),
    children: [
        {
            path: '/myGroup',
            name: 'myGroup',
            component: () => import('../../views/user/myGroup'),
        },
        {
            path: '/groupSquare',
            name: 'groupSquare',
            component: () => import('../../views/user/groupSquare'),
        },
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
            path: '/writeBlog',
            name: 'writeBlog',
            component: () => import('../../views/user/writeBlog'),
        },
        // {
        //     path: '/userComment',
        //     name: 'userComment',
        //     component: () => import('../../views/user/userComment'),
        // },
        {
            path: '/myScore',
            name: 'userCommyScorement',
            component: () => import('../../views/user/myScore'),
        },

    ]
}

export default UserRouter
