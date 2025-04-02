import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { paths } from './orders.v1'
import { BaseUrl } from './BaseUrl.ts'

const fetchClient = createFetchClient<paths>({
	baseUrl: BaseUrl
})

export const Api = createClient(fetchClient)
