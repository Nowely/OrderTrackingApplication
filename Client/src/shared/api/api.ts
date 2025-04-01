import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import {paths} from "./orders.v1";

const fetchClient = createFetchClient<paths>({
	baseUrl: import.meta.env.VITE_SERVER_URL,
});

export const Api = createClient(fetchClient);
