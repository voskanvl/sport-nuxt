// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    runtimeConfig: {
        baseURL: "https://api.football-data.org/v4/",
        apiSecret: process.env.API_SECRET,
    },
    components: {
        global: true,
        dirs: ["~/components"],
    },
})
