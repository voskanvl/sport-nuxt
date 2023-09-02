export default defineEventHandler(async event => {
    const { secret } = useRuntimeConfig()
    const id = event.context.params?.id
    const query = getQuery(event)

    const a = new URLSearchParams()

    return await $fetch(`https://v3.football.api-sports.io/${id}?${query}`, {
        headers: {
            "x-apisports-key": secret,
        },
    })
})
