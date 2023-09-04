export default defineEventHandler(async event => {
    const { apiSecret } = useRuntimeConfig()
    const person = event.context.params?.person
    const uri = "https://api.football-data.org/v4/persons/" + person

    try {
        const res: { data: unknown } = await $fetch(uri, {
            headers: {
                "X-Auth-Token": apiSecret,
            },
        })
        if (!res) throw Error("error")
        return res
    } catch (error) {
        return { error }
    }
})
