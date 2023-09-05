import sendRequest from "~/utils/sendRequest"
export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    const query = getQuery(event)

    const uri = `https://api.football-data.org/v4/competitions/${id}/standings?${new URLSearchParams(query as Record<string,string>).toString()}`

    return sendRequest(uri, apiSecret)
})
