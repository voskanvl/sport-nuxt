<script setup lang='ts'>
const route = useRoute()
const team = route.params.team

interface Props{
    data:{
        data: Matches
    }
}

const {data:teamData} = useFetch<Props>(`/api/teams/${team}`)
const {data} = useFetch<Props>(`/api/matches/${team}`)

</script>

<template lang='pug'>
.matches 
    .matches__info 
        h2 {{ teamData.name }}

    .matches__header 
        .match__area area
        .matches__competition competition 
        .matches__season season
        .matches__teams teams
        .matches__status status
        .matches__stage stage
        .matches__lastUpdated last updated
    ul.matches__list 
        li.matches__item(v-for="i of data.data.matches")
            .match__area
                .matches__area-name {{ i.area.name }}
                .matches__area-code {{ i.area.code }}
                img.matches__area-flag(:src="i.area.flag", alt="flag")
            .matches__competition
                .matches__competition-name {{ i.competition.name }}
                .matches__competition-code {{ i.competition.code }}
                img.matches__competition-emblem(:src="i.competition.emblem", alt="emblem")
            .matches__season
                .matches__season-startDate {{ i.season.startDate }}
                .matches__season-endDate {{ i.season.endDate }}
                NuxtLink.matches__season-winner(v-if="i.season.winner" :href="`/teams/${i.season.winner.id}`") {{ i.season.winner.name }}
            

            .matches__teams
                .matches__home-team.matches__team
                    .matches__home-team-title HOME
                    NuxtLink.matches__home-team-shortName(:href="`/teams/${i.homeTeam.id}`") {{ i.homeTeam.shortName }}
                    img.matches__home-team-crest(:src="i.homeTeam.crest ") 
                    .matches__home-team-halfTime(v-if="i.status==='FINISHED'") 
                        span half time
                        span {{ i.score.halfTime.home }}
                    .matches__home-team-fullTime(v-if="i.status==='FINISHED'") 
                        span full time
                        span {{ i.score.fullTime.home }}
                    .matches__home-score(v-if="i.status==='FINISHED'")  {{ i.score.fullTime.home  }}
                .matches__away-team.matches__team
                    .matches__away-team-title AWAY
                    NuxtLink.matches__away-team-shortName(:href="`/teams/${i.awayTeam.id}`") {{ i.awayTeam.shortName }}
                    img.matches__away-team-crest(:src="i.awayTeam.crest ") 
                    .matches__away-team-halfTime(v-if="i.status==='FINISHED'")  
                        span half time
                        span {{ i.score.halfTime.away }}
                    .matches__away-team-fullTime(v-if="i.status==='FINISHED'") 
                        span full time
                        span {{ i.score.fullTime.away }}
                    .matches__away-score(v-if="i.status==='FINISHED'")  {{ i.score.fullTime.away  }}

            .matches__status {{ i.status }}
            .matches__stage {{ i.stage }}
            .matches__lastUpdated {{ i.lastUpdated }}
            
//- pre {{ data.data }}

</template>

<style lang='sass'>
.matches 

    &__info 
        margin-left: 1rem

    &__list
        display: flex
        flex-direction: column 
        row-gap: 1rem
        padding-left: 0
        margin: 0
        height: 75vh
        overflow-y: auto


    &__item, &__header 
        padding: 1rem
        display: grid
        grid-template-columns: 1fr 1fr 1fr 30vw 1fr 1fr 1fr
        place-items: center

        &:nth-child(odd)
            background: #ddd

            .matches__teams
                background: #777
                color: #fff
                & a 
                    color: #fff

                .matches__home-score, .matches__away-score
                    border-color: #fff
                

        &:nth-child(even)
            .matches__teams
                background: #fff

                

    &__area-flag, &__competition-emblem, &__home-team-crest, &__away-team-crest
        width: 60px
        height: 40px
        object-fit: contain

    &__teams
        place-self: stretch
        display: grid
        grid-template-columns: repeat(2,1fr)
        padding: 1rem
        border-radius: 8px
        box-shadow: 0 5px 8px #7777


    &__team 
        display: grid
        grid-template-columns: repeat(2, 1fr)
        place-items: center
        row-gap: 1rem

    &__home-team-halfTime, &__home-team-fullTime, &__away-team-halfTime, &__away-team-fullTime 
        display: flex
        flex-direction: column 
        align-items: center
        
        & > *:first-child 
            font-size: 13px
            font-weight: 300
        & > *:last-child 
            font-size: 18px
            font-weight: bold

    &__home-team-title, &__away-team-title
        grid-column: 1 / -1

    &__home-team-shortName, &__away-team-shortName
        place-self: center end

    &__home-score, &__away-score
        font-size: 30px
        font-weight: bold
        text-shadow: 0 0 4px #777
        grid-column: 1 / -1
        padding: 1rem
        margin-inline: 1rem
        border-radius: 4px
        border: 1px solid #777
        place-self: stretch
        text-align: center

    & .matches__header
        background: #555
        color: #fff

        .matches__teams 
            place-self: center
            background: #555
            color: #fff
            box-shadow: none
    
</style>