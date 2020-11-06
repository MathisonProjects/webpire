<template>
    <v-card>
        <v-card-text>
            <v-data-table :headers='headers' :items='items' :items-per-page="itemsPerPage" v-model='selected' :single-select='singleSelect' :show-select='showSelect' />
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name      : "vuetify-form-component",
		props     : {
            headers: {
                required: true
            },
            items: {
                required: true
            },
            singleSelect: {
                required: false,
                default: false
            },
            showSelect: {
                required: false,
                default: false
            },
            itemsPerPage: {
                required: false,
                default: 5
            }
        },
        model: {
			event: 'tableUpdate'
		},
		components: {},
		created()   {},
		data()      {
            return {
                selected: []
            }
        },
		computed  : {},
		methods   : {},
		watch     : {
            selected(newValue) {
                this.$emit('tableUpdate', newValue)
            }
        }
    }
</script>

<style>

</style>