export default defineEventHandler(async event => {
    const { apiSecret, baseURL } = useRuntimeConfig()
    const id = event.context.params?.id


    const uri = "https://api.football-data.org/v4/competitions"

     try {
         const res = await $fetch(uri, {
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
