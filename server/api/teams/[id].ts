export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    const uri = "https://api.football-data.org/v4/teams/"+id

    return await $fetch(uri, {
        headers: {
            "X-Auth-Token": apiSecret,
        },
    })
})
