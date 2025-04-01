import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { paths } from './orders.v1'

export const BASE_URL: string = import.meta.env.VITE_SERVER_URL

const fetchClient = createFetchClient<paths>({
	baseUrl: BASE_URL
})

export const Api = createClient(fetchClient)
