<script setup lang='ts'>
import Stadium from "~/assets/images/stadium.jpg"
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
.standing-info 
    img.standing-info__img(:src="data.data.competition.emblem", alt="emblem") 
    h2.standing-info__title {{ data.data.competition.name }} 
    h3.standing-info__code {{ data.data.competition.code }} 
    img.standing-info__back(:src="Stadium", alt="emblem")
    
.tabs 
    .tabs__item(@click="changeCurrentTab(0)", :class="{active: currentTab===0}") TOTAL
    .tabs__item(@click="changeCurrentTab(1)", :class="{active: currentTab===1}") HOME
    .tabs__item(@click="changeCurrentTab(2)", :class="{active: currentTab===2}") AWAY
Standing(:standing="data.data.standings[currentTab]")
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

.standing-info 
    display: flex
    align-items: center
    gap: 2rem
    margin: 2rem

    &__back
        position: absolute
        top: 1rem
        right: 1rem
        z-index: -1
        width: 40vw
        aspect-ratio: 1

</style>