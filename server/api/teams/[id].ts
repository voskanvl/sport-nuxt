export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id
    const uri = "https://api.football-data.org/v4/teams/"+id

     try {
         const res: {data: unknown} = await $fetch(uri, {
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
