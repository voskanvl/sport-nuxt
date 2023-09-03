<script setup lang='ts'>
import Team from "~/assets/images/team.jpg"

const { data } = await useFetch<Teams>("/api/teams/")
</script>

<template lang='pug'>
.grid
    h2.grid__header TEAMS
    div.grid__left
        img(:src="Team", alt="ball")
    ul.teams(v-if="data")
        li.teams__item(v-for="i in data.teams" :key="i.id") 
            NuxtLink.teams__link(:href="'/teams/'+i.id")
                div.teams__id {{ i.id }}
                div.teams__name {{ i.name }}
                div.teams__short-name {{ i.shortName }}
                div.teams__tla {{ i.tla }}
                img.teams__crest(:src="i.crest", alt="crest")
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

.teams
    place-self: start
    width: 100%
    list-style: none
    box-shadow: -15px 15px 8px #7775
    padding-left: 0
    height: 100%
    overflow-y: auto

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
        grid-template-columns: 40px 2fr 1fr 1fr 80px
        place-items: center start

    &__name, &__short-name 
        font-weight: bold

    &__crest 
        width: 60px
        height: 60px


        
</style>