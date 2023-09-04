<script setup lang='ts'>
import Stadium from "~/assets/images/stadium.jpg"
const route = useRoute()
const id = route.params.id
const query = route.query
const URLQuery = new URLSearchParams(query as Record<string, string>).toString()
const {data,pending,error} = await useFetch<StandingPage>(`/api/standings/${id}?${URLQuery}`)
const currentTab = ref(0)

const changeCurrentTab = (x: number) =>{
    currentTab.value = x
}
</script>

<template lang='pug'>
//- pre {{ data }}
h2(v-if="pending") Loading...
//- pre(v-if="data && !error") {{data}}
.standing-info(v-if="data && data.competition") 
    .standing-info__details
        img.standing-info__img(v-if="data.competition.emblem", :src="data.competition.emblem", alt="emblem")
        h2.standing-info__title {{ data.competition.name }} 
        h3.standing-info__code {{ data.competition.code }} 
        img.standing-info__back(:src="Stadium", alt="emblem")
    
    .tabs 
        .tabs__item(@click="changeCurrentTab(0)", :class="{active: currentTab===0}") TOTAL
        .tabs__item(@click="changeCurrentTab(1)", :class="{active: currentTab===1}") HOME
        .tabs__item(@click="changeCurrentTab(2)", :class="{active: currentTab===2}") AWAY
    Standing.standing-info__table(v-if="data && data.standings", :standing="data.standings[currentTab]")
h2.matches-error(v-if="!pending && !data") 403 Forbidden 
pre.matches-error(v-if="error") {{ error }} 
</template>

<style lang='sass'>
.tabs
    margin-top: 3rem
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
    
    gap: 2rem
    margin: 2rem

    &__details 
        display: flex
        align-items: center
        gap: 1rem

    &__back
        position: absolute
        top: 1rem
        right: 1rem
        z-index: -1
        width: 40vw
        aspect-ratio: 1
    
    &__img
        width: 18%

    &__table 
        margin-inline: -2rem

</style>