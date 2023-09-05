<script setup lang="ts">


const { league } = useRoute().params
const { data, pending, status, error } = useFetch<League>(`/api/leagues/${league}`)
</script>

<template lang="pug">
h2(v-if="error") {{ error.message }}
h2(v-else-if="pending") Loading
h2(v-else-if="!data || status !== 'success'") The request limit has been exceeded. Try again in a minute
.league(v-else) 
    img.league__flag(v-if="data.area.flag", :src="data.area.flag", alt="flag")
    .league-area 
        .league-area__name 
            span area name  
            span {{ data.area.name }} 
        .league-area__code 
            span code
            span  {{ data.area.code }} 
    .league-info 
        .league-info__id 
            span id 
            span {{ data.id }}
        h2.league-info__name {{ data.name }}
        .league-info__code 
            span code
            span {{ data.code }}
        .league-info__type 
            span type 
            span {{ data.type }}
        img.league-info__emblem(v-if="data.emblem", :src="data.emblem", alt="emblem")
    .league-current-season
        h3 CURRENT SEASON
        .league-current-season__id
            span id 
            span {{ data.currentSeason.id }}
        .league-current-season__startDate
            span start date 
            span {{ data.currentSeason.startDate }}
        .league-current-season__endDate 
            span end date
            span {{ data.currentSeason.endDate }}
        .league-current-season__currentMatchday
            span current matchday 
            span {{ data.currentSeason.currentMatchday }}
        NuxtLink.league-current-season__winner(v-if="data.currentSeason.winner", :href="'/teams/'+data.currentSeason.winner.id") {{ data.currentSeason.winner.name }}

    
            
    .league-seasons
        h2.league-seasons__head Seasons. 
        .league-seasons__sticky.league-seasons__header
                .league-seasons__id id
                .league-seasons__standings standing
                .league-seasons__start-date start date
                .league-seasons__end-date end date
                .league-seasons__current-matchday current matchday
                .league-seasons__winner winner
        ul.league-seasons__list
            li.league-seasons__season(v-for="season of data.seasons", :key="season.id")
                .league-seasons__id {{ season.id }}
                NuxtLink(:href="`/standings/${league}?season=${new Date(season.startDate).getFullYear()}`") standings
                .league-seasons__start-date {{ season.startDate }}
                .league-seasons__end-date {{ season.endDate }}
                .league-seasons__current-matchday {{ season.currentMatchday }}
                .league-seasons__winner(v-if="season.winner")
                    NuxtLink(:href="'/teams/'+season.winner.id") {{ season.winner.name || "" }}
                .league-seasons__winner(v-else="season.winner")

h2.league-error(v-if="!data && !pending") 403 Forbidden 
</template>

<style lang="sass">
.league 
    display: grid
    grid-template-columns: 1fr 2fr 1fr
    grid-template-rows: repeat(2, calc(50vh - 1rem - 27px))
    place-items: center
    padding: 1rem
    &__flag
        position: absolute
        z-index: -1
        inset: 0
        width: 100%
        height: 100%
        filter: opacity(0.3) blur(1px)
        object-fit: cover
        object-position: center

.league-area

    & > *
        display: flex
        justify-content: space-between
        gap: 1rem
        
        & > span:first-child
            color: #555
            font-weight: 300

        & > span:last-child
            text-transform: uppercase
            font-weight: bold
            font-size: 1.1em

.league-info
    display: grid
    grid-template-columns: 1fr 2fr
    grid-template-rows: 1fr repeat(3, 50px)
    background: #fffd
    border-radius: 6px
    padding: 1rem
    box-shadow: 0 0 16px #7777

    & > *
        display: grid
        grid-template-columns: repeat(2, 1fr)
        gap: 1rem 

        & > *
            flex: 1

        
        & > span:first-child
            color: #555
            font-weight: 300

        & > span:last-child
            text-transform: uppercase
            font-weight: bold
            font-size: 1.1em
    &__name
        display: block
        margin: 0 0 1rem 
        grid-column: 1 / -1
        grid-row-start: 1
        font-size: clamp(30px, 50 / 1920 * 100vw, 50px)
        text-transform: uppercase
        text-align: center

    &__emblem
        grid-column: -2 / -1
        grid-row: 2 / span 2
        width: 100%
        height: 100%
        object-fit: contain


.league-seasons
    grid-column: 1 / -1
    padding: 0
    height: 100%
    width: 100%
    overflow-y: auto
    position: relative

    &__list 
        list-style: none
        padding-left: 0
        margin-top: 0

    &__season
        display: grid
        grid-template-columns: repeat(6, 1fr)
        
        &:nth-child(odd)
            background: #eee7
        &:nth-child(even)
            background: #fff7
        
        & > *
            display: grid
            place-items: center
            &:not(:last-child)
                padding-block: 0.5rem
                border-right: 1px solid #0005

    &__header.league-seasons__season
        font-weight: bold
        text-transform: uppercase
        background: #cccd

    &__sticky
        @extend .league-seasons__season
        position: sticky
        top: 0
        background: #ccc

.league-current-season
    @extend .league-area

.league-error 
    display: grid
    place-items: center

</style>
