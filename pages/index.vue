<script setup lang='ts'>
import Ball from "~/assets/images/ball.jpg"
const {data,pending,error,status} = await useFetch<Competitions>("/api/leagues/")
</script>

<template lang='pug'>
h2(v-if="error") {{ error.message }}
h2(v-else-if="pending") Loading
h2(v-else-if="!data || status !== 'success'") The request limit has been exceeded. Try again in a minute

.grid(v-else)
    h2.grid__header LEAGUES
    div.grid__left
        img(:src="Ball", alt="ball")
    ul.competitions(v-if="data")
        li.competitions__item(v-for="i in data.competitions" :key="i.id") 
            NuxtLink.competitions__link(:href="'/leagues/'+i.id")
                div.competitions__id {{ i.id }}
                div.competitions__area {{ i.area.name }}
                div.competitions__name {{ i.name }}
                div.competitions__code {{ i.code }}
</template>

<style scoped lang='sass'>
.grid
    height: calc(100vh - 53px)
    display: grid
    grid-template-columns: 2fr 3fr
    place-items: center
    position: relative

    &__header 
        grid-column: 1 / -1
        margin: 0
        padding: 0
        font-size: clamp(30px,70 / 1920 * 100vw,70px)
        color: #338
        letter-spacing: 3px

    &__left 
        position: relative
        width: 100%
        height: 100%
        
        & > img
            position: absolute
            z-index: -1
            left: 0
            top: 0
            width: 100%
            height: 100%
            object-fit: contain



.competitions
    place-self: start
    width: 100%
    list-style: none
    box-shadow: -15px 15px 8px #7775
    padding-left: 0
    height: 50vh
    overflow-y: auto
    border-radius: 8px 0 0 8px

    &__item
        padding: 0.5rem

        &:nth-child(odd)
            background: #eee
        &:nth-child(even)
            background: #fff

        & > a 
            text-decoration: none
            color: #338
    &__link 
        display: grid
        grid-template-columns: 1fr 1fr 3fr 1fr
        place-items: center start
        
</style>