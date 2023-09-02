export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    console.log("🚀 ~ id:", id)
    // const query = getQuery(event)


    const uri = `https://api.football-data.org/v4/competitions/${id}`

    return await $fetch(uri, {
        headers: {
            "X-Auth-Token": apiSecret,
        },
    })
})
