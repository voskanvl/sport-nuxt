<script setup lang='ts'>
const route = useRoute()
const id = route.params.id
const query = route.query
const {data} = await useFetch<{data:StandingPage}>(`/api/standings/${id}?${new URLSearchParams(query).toString()}`)
const currentTab = ref(0)

const changeCurrentTab = (x: number) =>{
    currentTab.value = x
}
</script>

<template lang='pug'>
h1 {{id}} {{ query }}
h2 {{ currentTab }}
.tabs 
    .tabs__item(@click="changeCurrentTab(0)", :class="{active: currentTab===0}") TOTAL
    .tabs__item(@click="changeCurrentTab(1)", :class="{active: currentTab===1}") HOME
    .tabs__item(@click="changeCurrentTab(2)", :class="{active: currentTab===2}") AWAY
//- div(v-if="data.standings")
Standing(:standing="data.data.standings[currentTab]")
//- div(v-else="data.standings")
//- pre {{ data.data.standings }}
</template>

<style lang='sass'>
.tabs
    display: flex
    padding-left: 1rem
    gap: 2px

    &__item
        padding: 1rem
        background: #ddd
        border-radius: 8px 8px 0 0
        cursor: pointer
        border: 2px solid transparent
        border-bottom: none

        &.active
            border: 2px solid #555
            border-bottom: none
</style>