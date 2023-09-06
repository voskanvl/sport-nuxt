<script setup lang='ts'>
const {person} = useRoute().params
const {data, error, status, pending} = useFetch<Person>(`/api/persons/${person}`)
</script>

<template lang='pug'>
h2.message(v-if="error") {{ error.message }}
h2.message(v-else-if="pending") Loading
h2.message(v-else-if="!data || status !== 'success'") The request limit has been exceeded. Try again in a minute
.person(v-else) 
    h2.person__name {{ data.name }}
    .person__info
        .person__detail 
            span date of birth
            span {{ data.dateOfBirth }}
        .person__detail 
            span nationality
            span {{ data.nationality }}
        .person__detail 
            span section
            span {{ data.section }}
        .person__detail 
            span position
            span {{ data.position }}
        .person__detail 
            span shirt number
            span {{ data.shirtNumber }}
        .person__detail 
            span last updated
            span {{ data.lastUpdated }}
        .person__contract
            span contract
            p 
                span start
                span {{ data.currentTeam.contract.start }}
            p 
                span until
                span {{ data.currentTeam.contract.until }}

    .person__team.team-person
        h3.team-person__name {{ data.currentTeam.name }} ( {{ data.currentTeam.shortName }} )
        .team-person__left
            img.team-person__crest(:src="data.currentTeam.crest")
            h3.team-person__area {{ data.currentTeam.area.name }}
            img.team-person__flag(:src="data.currentTeam.area.flag")
            div {{ data.currentTeam.address }}
            a(:href="data.currentTeam.website") {{ data.currentTeam.name }}
        .team-person__right



h2(v-else="data") 403 Forbidden
</template>

<style scoped lang='sass'>
.person 
    margin: 1rem
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 100px 1fr
    place-items: start center
    gap: 2rem
    height: calc( 100vh - 53px - 2rem)

    &__name 
        grid-column: 1 / -1
        grid-row-start: 1
        text-align: center

    &__info 
        width: 80%
        margin-inline: auto
        display: flex
        flex-direction: column
        gap: 1rem

        & > *:not(.person__contract)
            display: flex
            align-items: center
            justify-content: space-between

            & > span:last-child
                text-transform: uppercase
                font-weight: bold

    &__contract 
        margin-top: 1rem
        border: 1px solid #7777
        padding: .5rem 1rem
        border-radius: 8px
        & > p 
            padding-left: 1rem
            margin: .5rem
            display: flex
            justify-content: space-between

            & > span:last-child
                text-transform: uppercase
                font-weight: bold

        & > span 
            display: block
            position: absolute
            width: min-content
            padding-inline: .5rem
            background: #fff
            translate: 0 -100%


    .team-person 
        width: 100%
        display: grid
        grid-template-columns: repeat(2, 1fr)
        position: relative

        &__name 
            grid-column: 1 / -1

        &__flag 
            width: 6vw
            aspect-ratio: 4 / 3
        &__crest
            position: absolute
            top: 0
            right: 1rem
            z-index: -1

        &__left 
            display: flex
            flex-direction: column
            gap: 1rem

        &__area 
            margin: 0
        

</style>