import { INotification } from '@/models'

import store from '@/stores'

export default {
    fireNotification(payload: INotification): void {
        store.dispatch('notificationsStore/setNotification', payload)
        setTimeout(() => {
            store.dispatch('notificationsStore/setNotification', this.emptyNotification())
        }, 5000)
    },
    fireErrorNotification(data: string): void {
        const payload: INotification = {
            notification: {
                display: true,
                type: 'red',
                text: data
            }
        }
        this.fireNotification(payload)
    },
    fireSuccessNotification(data: string): void {
        const payload: INotification = {
            notification: {
                display: true,
                type: 'success',
                text: data
            }
        }
        this.fireNotification(payload)
    },
    emptyNotification(): INotification {
        return {
            notification: {
                type: '',
                display: false,
                text: ''
            }
        }
    },
    changeLightMode(dark: boolean): void {
        let payload: INotification = this.emptyNotification()
        if (dark) {
            payload = {
                notification: {
                    type: 'success',
                    text: 'Changed to dark mode!',
                    display: true
                }
            }
        } else {
            payload = {
                notification: {
                    type: 'success',
                    text: 'Changed to light mode!',
                    display: true
                }
            }
        }

        this.fireNotification(payload)
    },
    copiedIconNotification(iconCopied:string): void {
        this.fireSuccessNotification('Icon Copied: ' + iconCopied)
    },
    loginSuccessNotification() {
        this.fireSuccessNotification('Login Successful')
    },
    loginFailedNotification(msg: string) {
        this.fireErrorNotification(msg)
    },
    logoutSuccessfulNotification() {
        this.fireSuccessNotification('Logout Successful')
    },
    registerSuccessNotification() {
        this.fireSuccessNotification('Registration Successful')
    },
    registerFailedNotification() {
        this.fireErrorNotification('Registration Failed')
    },
    pagesSavedNotification() {
        this.fireSuccessNotification('Page Saved Successfully')
    },
    pagesDeletedNotification() {
        this.fireSuccessNotification('Page Deleted Successfully')
    },
    menuSavedNotification() {
        this.fireSuccessNotification('Menu Saved Successfully')
    },
    menuDeletedNotification() {
        this.fireErrorNotification('Menu Deleted Successfully')
    },
    dynamicTableSavedNotification() {
        this.fireSuccessNotification('Dynamic Table Saved Successfully')
    },
    dynamicTableDeletedNotification() {
        this.fireErrorNotification('Dynamic Table Deleted Successfully')
    },
    dynamicTableContentSavedNotification() {
        this.fireSuccessNotification('Dynamic Table Content Saved Successfully')
    },
    dynamicTableContentDeletedNotification() {
        this.fireErrorNotification('Dynamic Table Content Deleted Successfully')
    },
    settingsSavedNotification() {
        this.fireSuccessNotification('Settings Saved Successfully')
    }
}