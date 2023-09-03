<script setup lang='ts'>
interface Props {
    table: StandingTableItem[]
}
const { table } = defineProps<Props>()
const sortProperty = ref<string>("position")
const sortDirection = ref<boolean>(true)

const getSortValue=()=>{
    return sortDirection.value ? 1 : -1
}

const setSort=(x: string)=>{
    if (sortProperty.value===x){
        sortDirection.value=!sortDirection.value
    } else {
        sortProperty.value=x
        sortDirection.value=true
    }
}



</script>

<template lang='pug'>
.table__item.table__header
    .table__position(@click="setSort('position')", :class="{sorted: sortProperty === 'position', desc: !sortDirection}") position
    .table__team team
    .table__playedGames  played games
    .table__form form
    .table__won(@click="setSort('won')" , :class="{sorted: sortProperty === 'won', desc: !sortDirection}") won
    .table__draw(@click="setSort('draw')" , :class="{sorted: sortProperty === 'draw', desc: !sortDirection}")  draw
    .table__lost(@click="setSort('lost')" , :class="{sorted: sortProperty === 'lost', desc: !sortDirection}")  lost
    .table__points(@click="setSort('points')" , :class="{sorted: sortProperty === 'points', desc: !sortDirection}")  points
    .table__goalsFor(@click="setSort('goalsFor')" , :class="{sorted: sortProperty === 'goalsFor', desc: !sortDirection}") goal for
    .table__goalsAgainst(@click="setSort('goalsAgainst')" , :class="{sorted: sortProperty === 'goalsAgainst', desc: !sortDirection}")  goals against
    .table__goalDifference(@click="setSort('goalDifference')" , :class="{sorted: sortProperty === 'goalDifference', desc: !sortDirection}")  goal difference 
ul.table
    li.table__item(v-for="i of table.sort((a,b)=>a[sortProperty] > b[sortProperty] ? getSortValue() : -1 * getSortValue())" :key="i.position")
        .table__position {{i.position}}
        NuxtLink.table__team(:href="`/teams/${i.team.id}`") {{ i.team.name }}
        .table__playedGames  {{ i.playedGames }}
        .table__form {{ i.form}}
        .table__won {{ i.won }} 
        .table__draw {{ i.draw }} 
        .table__lost {{ i.lost }} 
        .table__points {{ i.points }} 
        .table__goalsFor {{ i.goalsFor }} 
        .table__goalsAgainst {{ i.goalsAgainst }} 
        .table__goalDifference {{ i.goalDifference}} 
</template>

<style lang='sass'>
.table
    padding-left: 0
    margin: 0
    height: 50vh
    overflow-y: auto
    &__item
        display: grid
        grid-template-columns: 1fr 2fr repeat(9, 1fr)
        padding: 1rem
        text-align: center

        &:nth-child(odd)
            background: #ddd

        & > a 
            text-align: left

    &__header 
        text-transform: uppercase
        background: #555
        color: #fff
        
        & > *
            display: grid
            place-items: center
            position: relative
            &.sorted
                &::after
                    content: "\2193"
                    position: absolute
                    left: 80%
                    top: 50%
                    translate: 0 -50%
                &.desc
                    &::after
                        content: "\2191"
                        position: absolute
                        left: 80%
                        top: 50%
                        translate: 0 -50%

</style>