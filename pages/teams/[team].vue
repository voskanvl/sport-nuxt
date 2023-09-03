<script setup lang='ts'>
const { team } = useRoute().params
const { data } = await useFetch<Team>(`/api/teams/${team}`)
</script>

<template lang='pug'>
.team(v-if="data")
    img.team__crest(v-if="data.crest", :src="data.crest")
    .team__info
        h2.team__name {{ data.name }}
        .team__details.details 
            .details__item(v-for="[key,val] of Object.entries(data)")
                span(v-if="typeof val !== 'object'") {{ snakeToWords(key) }}
                span(v-if="typeof val !== 'object'") {{ val}}
        .team__coach.coach(v-if="data.coach")
            input#check-coach(type="radio", name="radio", hidden)
            h3.coach__caption 
                label(for="check-coach") COACH
            .coach__list
                div
                    .coach__item(v-for="[key,val] of Object.entries(data.coach)")
                        span(v-if="typeof val !== 'object'") {{ snakeToWords(key) }}
                        span(v-if="typeof val !== 'object'") {{ val}}
        .team__squad.squad(v-if="data.squad")
            input#check-squad(type="radio", name="radio",hidden)
            h3.squad__caption 
                label(for="check-squad") SQUAD
            .squad__list 
                div
                    ul.squad__player(v-for="player of data.squad") 
                        li.squad__item(v-for="[key,val] of Object.entries(player)")
                            span(v-if="typeof val !== 'object'") {{ snakeToWords(key) }}
                            span(v-if="typeof val !== 'object'") {{ val}}
        NuxtLink(:href="`/matches/${team}`") Matches
            
</template>

<style lang='sass'>
.team
    padding: 1rem
    position: relative

    
    &__crest
        position: absolute
        right: 1%
        top: 1%
        z-index: -1


    [class$="__item"]
        display: grid
        grid-template-columns: 120px 1fr
        padding: 0.5rem 1rem
        border-bottom: 1px dotted #7777

        &:empty
            display: none

    &__info
        display: grid
        grid-template-columns: 1fr 1fr
        grid-template-areas: "title title" "details coach" "details squad"
        grid-template-rows: 50px 25vh 25vh
        gap: 2rem

    &__name 
        grid-area: title

    &__detail 
        grid-area: details

    &__coach
        grid-area: coach

    &__squad 
        grid-area: squad



.coach
    &__caption
        cursor: pointer
        & > label 
            cursor: pointer

    #check-coach:checked ~ .coach__list
        grid-template-rows: 1fr

    &__list
        display: grid
        grid-template-columns: 100%
        grid-template-rows: 0fr
        transition: grid-template-rows .6s

        & > div 
            overflow: auto
            max-height: 20vh
.squad
    &__caption
        cursor: pointer
        & > label 
            cursor: pointer

    #check-squad:checked ~ .squad__list
        grid-template-rows: 1fr

    &__list
        display: grid
        grid-template-columns: 100%
        grid-template-rows: 0fr
        transition: grid-template-rows .6s

        & > div 
            overflow: auto
            max-height: 20vh

    &__player
        padding-left: 0

        &:nth-child(odd)
            background: #eee


</style>