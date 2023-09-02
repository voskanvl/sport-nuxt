<template lang='pug'>
menu.menu
    nav.menu__nav
        NuxtLink(href="/") Main
        NuxtLink(href="/leagues") Leagues
        NuxtLink(href="/teams") Teams
</template>

<style lang='sass'>
.menu 
    --height: 53px
    margin: 0
    padding-inline: 1rem
    height: var(--height)
    background: linear-gradient(90deg, #fff 0%, #0070a8 100%)
    user-select: none
    display: grid
    place-items: center end
    &__nav
        display: flex
        justify-content: flex-end
        gap: 1rem 
        & > a
            text-transform: uppercase
            text-decoration: none
            color: #fff
</style>