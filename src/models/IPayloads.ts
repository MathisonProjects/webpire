import { DynamoDbTables } from '@/enums'

interface IAxiosConfig {
	baseURL: string
	method: string
	headers: {
		[DynamicKey:string] : string
	}
	url: string
	data: any
}

interface IUnknownPayload {}

interface IDynamoPayload {
	table: DynamoDbTables
	data?: any
}
interface IApiResponse {
	config: any
	data: any
	headers: any
	request: string
	status: number
	statusText: string
	err?: any
	then?: any
}
export {
	IAxiosConfig,
	IUnknownPayload,
	IDynamoPayload,
	IApiResponse
}