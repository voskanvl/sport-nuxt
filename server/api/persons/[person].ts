import sendRequest from "~/utils/sendRequest"
export default defineEventHandler(async event => {
    const { apiSecret } = useRuntimeConfig()
    const person = event.context.params?.person
    const uri = "https://api.football-data.org/v4/persons/" + person

    return sendRequest(uri, apiSecret)
})
