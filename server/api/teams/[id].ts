import sendRequest from "~/utils/sendRequest"
export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    const uri = "https://api.football-data.org/v4/teams/" + id

    return sendRequest(uri, apiSecret)
})
