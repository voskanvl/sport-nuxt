// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        baseURL: "https://api.football-data.org/v4/",
        apiSecret: process.env.API_SECRET,
    },
})
