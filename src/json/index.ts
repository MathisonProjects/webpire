import camelCase from 'lodash/camelCase'
import { IJson } from '@/models'

const requireModule = require.context('.', false, /\.json$/)

const JsonStore: IJson = {}

requireModule.keys().forEach(function(fileName: string) {
    const moduleName: string = camelCase(
        fileName.replace(/(\.\/|\.json)/g, '')
    )
    JsonStore[moduleName] = requireModule(fileName)
})

export default JsonStore