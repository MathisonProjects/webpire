interface IRoute {
    path: string
    component: any
    props: boolean
    children: IRoute[]
    meta: {
        title: string
    }
}

interface IRoutes {
    [index: number]: IRoute[]
}

export {
    IRoute,
    IRoutes
}