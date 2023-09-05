import sendRequest from "~/utils/sendRequest"
export default defineEventHandler(async event => {
    const { apiSecret } = useRuntimeConfig()
    const team = event.context.params?.team

    const uri = `https://api.football-data.org/v4/teams/${team}/matches`

    return sendRequest(uri, apiSecret)
})
