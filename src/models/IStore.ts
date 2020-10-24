import { MdiIcons, LinkActions } from '@/enums';

interface IMenuItem {
    text: string
    icon: MdiIcons
    internal: boolean
    target: string | null
    action?: LinkActions
    dropdown?: any
}

interface IMenuList {
    main: IMenuItem[],
    member: IMenuItem[],
    admin: IMenuItem[],
    menuTypes?: IMenuItem[]
}

interface INotification {
    notification: {
        type: string
        display: boolean
        text: string
    }
}

export {
    INotification,
    IMenuItem,
    IMenuList
}