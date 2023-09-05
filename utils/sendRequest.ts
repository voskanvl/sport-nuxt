export default async function sendRequest(uri: string, secret: string){
     try {
         const res = await $fetch(uri, {
             headers: {
                 "X-Auth-Token": secret,
             },
             async onRequestError({ request, options, error }) {
                 if (error) throw Error(error.message)
             },
             async onResponse({ request, response, options }) {
                 if (response.status === 429) throw Error("429 Too many requests")
             },
         })
         if (!res) throw Error("error")
         return res
     } catch (error) {
         console.log("🚀 ~ error:", error)
         return createError({ statusCode: 429, message: (error as { message: string }).message })
     }

}