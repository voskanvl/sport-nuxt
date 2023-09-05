<script setup lang='ts'>
const { team } = useRoute().params
const { data,pending,error,status } = await useFetch<Team>(`/api/teams/${team}`)
</script>

<template lang='pug'>
h2(v-if="error") {{ error }}
h2(v-else-if="pending") Loading
h2(v-else-if="!data || status !== 'success'") The request limit has been exceeded. Try again in a minute
.team(v-else)
    img.team__crest(v-if="data.crest", :src="data.crest")
    .team__info
        h2.team__name {{ data.name }}
        .team__details.details 
            .details__item(v-for="[key,val] of Object.entries({...data, website:{href:data.website}, crest:{href:data.crest}})")
                span(v-if="typeof val !== 'object'") {{ snakeToWords(key) }}
                span(v-if="typeof val !== 'object'") {{ val}}
            .details__item
                span website
                a(:href="data.website") {{ data.website }}
        .team__staff
            .team__coach.coach(v-if="data.coach")
                    h3 COACH
                    NuxtLink.coach__link(:href="`/persons/${data.coach.id}`") {{ data.coach.name }}

            .team__squad.squad(v-if="data.squad")
                h3.squad__caption 
                    label(for="check-squad") SQUAD
                ul.squad__list 
                    li(v-for="player of data.squad.sort((a,b)=>a.name > b.name ? 1 : -1)")
                        NuxtLink(:href="`/persons/${player.id}`") {{ player.name }}
                                
            h2.team__matches
                NuxtLink(:href="`/matches/${team}`") Matches

</template>

<style lang='sass'>
.team
    padding: 1rem
    position: relative

    &__name
        grid-column: 1 / -1

    
    &__crest
        position: absolute
        right: 1%
        top: 1%
        z-index: -1
        width: 10vw


    [class$="__item"]
        display: grid
        grid-template-columns: 120px 1fr
        padding: 0.5rem 1rem
        border-bottom: 1px dotted #7777

        &:empty
            display: none
        & > span:last-child
            font-weight: bold
            text-transform: uppercase

    &__info
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 2rem



.coach
    &__link 
        padding-left: 2rem

.squad

    &__list
        display: flex
        flex-wrap: wrap
        gap: 0.5rem 1rem
        list-style: none


</style>