<script setup lang='ts'>
interface Props{
    standing: {
        stage: string
        type: "TOTAL" | "HOME" | "AWAY" | null
        group: null
        table: StandingTableItem[]
    }
}
const {standing} = defineProps<Props>()
</script>

<template lang='pug'>

StandingTable(:table="standing.table")
</template>

<style lang='sass'>
</style>