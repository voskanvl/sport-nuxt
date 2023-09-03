export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()

    const uri = "https://api.football-data.org/v4/teams"

    return await $fetch(uri, {
        headers: {
            "X-Auth-Token": apiSecret,
        },
    })
})
