<template>
    <v-card>
        <v-card-text>
            <v-data-table :headers='headers' :items='items' :items-per-page="itemsPerPage" v-model='selected' :single-select='singleSelect' :show-select='showSelect' />
        </v-card-text>
    </v-card>
</template>

<script lang='ts'>
    import { Component, Prop, Watch, Model, Vue } from 'vue-property-decorator'

    @Component
    export default class VuetifyDataTableComponent extends Vue {
        constructor() {
            super()
        }
        // Model
        @Model('tableUpdate')

        // Set Props
        @Prop({required: true}) readonly headers: any[] | undefined
        @Prop({required: true}) readonly items: any[] | undefined
        @Prop({required: false, default: false}) readonly singleSelect: boolean | undefined
        @Prop({required: false, type: Boolean, default: false}) readonly showSelect: boolean | undefined
        @Prop({required: false, type: Number, default: 5}) readonly itemsPerPage: number | undefined

        // Set Data
        private selected: any[] = []

        // Watch
        @Watch('selected')
        selectedChange(newVal: any[]) {
            this.$emit('tableUpdate', newVal)
        }
    }
</script>

<style>

</style>