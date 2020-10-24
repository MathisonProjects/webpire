import camelCase from 'lodash/camelCase'
import { IModule } from '@/models'

const requireModule = require.context('.', false, /\.ts$/)
const modules: IModule = {}

requireModule.keys().forEach(function(fileName: string) {
    if (fileName === './index.ts') return
    const moduleName: string = camelCase(
        fileName.replace(/(\.\/|\.ts)/g, '')
    )
    modules[moduleName] = {
        namespaced: true,
        ...requireModule(fileName).default
    }
})

export default modules