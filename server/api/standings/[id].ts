export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    const query = getQuery(event)

    const uri = `https://api.football-data.org/v4/competitions/${id}/standings?${new URLSearchParams(query).toString()}`

    try {
        const  res = await $fetch(uri, {
            headers: {
                "X-Auth-Token": apiSecret,
            },
        })
        console.log(res);
        if(!res) throw Error("error")
        return res
    } catch (error) {
        return {error}
    }
    return 
})
