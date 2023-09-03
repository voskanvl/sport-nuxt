export default defineEventHandler(async event => {
    const { apiSecret } = useRuntimeConfig()
    const team = event.context.params?.team
    console.log("🚀 ~ team:", team)


    const uri = `https://api.football-data.org/v4/teams/${team}/matches`

    try {
        const res = await $fetch(uri, {
            headers: {
                "X-Auth-Token": apiSecret,
            },
        })
        if (!res) throw Error("error")
        return { data: res }
    } catch (error) {
        return { error }
    }
    return
})
