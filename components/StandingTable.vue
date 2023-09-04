<script setup lang='ts'>
interface Props {
    table: StandingTableItem[]
}
const props = defineProps<Props>()
const sortProperty = ref<string>("position")
const sortDirection = ref<boolean>(true)
const search = ref("")

const setSort = (x: string) => {
    if (sortProperty.value === x) {
        sortDirection.value = !sortDirection.value
    } else {
        sortProperty.value = x
        sortDirection.value = true
    }
}

const d = ref<StandingTableItem[]>([...props.table])
watch([props, sortProperty, sortDirection, search], () => {
    const getSortValue = () => {
        return sortDirection.value ? 1 : -1
    }
    d.value = [...props.table]
        .sort((a, b) => a[sortProperty.value] > b[sortProperty.value] ? getSortValue() : -1 * getSortValue())
        .filter(e => e.team.name.includes(search.value))
})

</script>

<template lang='pug'>
.table
    label.table__search(for="search-team")
        span Search team by name
        input#search-team(v-model="search", placeholder="team's name")
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
    ul.table__list
        li.table__item(v-for="i of d" :key="i.position")
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
    position: relative

    &__search
        position: absolute
        top: 0
        right: 0
        translate: 0 -100%
        display: flex
        align-items: center
        gap: 1rem

        & > input
            font-size: 1rem
            padding: 0.5rem 1rem
            border-radius: 1rem 0 0 1rem
            border-color: #7777
            text-align: center

        & > span 
            font-family: "Open Sans", Arial, Helvetica, sans-serif
            font-size: 25px
    &__list 
        padding-left: 0
        margin: 0
        height: 40vh
        overflow-y: auto

    &__item
        display: grid
        grid-template-columns: 1fr 2fr repeat(9, 1fr)
        padding: 1rem
        text-align: center


        &:nth-child(odd)
            background: #ddd
        &:nth-child(even)
            background: #fff

        & > a 
            text-align: left
            cursor: pointer

    &__header.table__item 
        text-transform: uppercase
        background: #555
        color: #fff
        
        & > *
            display: grid
            place-items: center
            position: relative
            cursor: pointer
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

    &__team, &__playedGames,&__form
        cursor: default

</style>