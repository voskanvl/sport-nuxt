import sendRequest from "~/utils/sendRequest"
export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()

    const uri = "https://api.football-data.org/v4/teams"

    return sendRequest(uri, apiSecret)
})
