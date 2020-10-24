<template>
    <div>
        <v-row>
            <v-col md="6">
                <h1><v-icon large>{{ mdiIconsList.MATERIALDESIGN }}</v-icon> Design Icons</h1>
            </v-col>
            <v-col md="6">
                <v-text-field v-model='searchString' label='Search Icons' />
            </v-col>
        </v-row>

        <div class='row'>
            <div class='col-md-6'>
                <b>{{ this.iconListFiltered.length }}</b> <i>Icons</i>
            </div>
            <div class='col-md-6 text-right'>
                <v-select v-model='pageSize' :items='perPageOptions' label='Total Records per Page' />
            </div>
        </div>

        <v-card>
            <v-card-text>
                <v-row>
                    <v-col v-for='(iconItem, index) in iconListPaginated' :key='index' xs='6' sm='4' md='3' lg='2' class='text-center'>
                        <a @click='copyText(iconItem)'><v-icon>{{ iconItem }}</v-icon><br />
                        {{ iconItem }}</a>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { MdiIcons } from '@/enums'
    export default {
		name      : "admin-icons-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            mdiIconsList() {
                return MdiIcons
            },
            perPageOptions() {
                return [ 5, 10, 15, 20, 25, 50, 100]
            },
            iconsList() {
                return this.$store.state.jsonStore.materialistIconsList
            },
            iconListFiltered() {
                return this.iconsList.filter( item => {
                    return item.includes(this.searchString)
                })
            },
            iconListPaginated() {
                return this.iconListFiltered.filter( (item, index) => {
                    return index >= this.pageNumber && index < (this.pageNumber + 1) * this.pageSize
                })
            },
            totalPages() {
                return this.iconListFiltered.length
            }
        },
		data()      {
            return {
                searchString: '',
                pageNumber: 0,
                pageSize: 25
            }
        },
		methods   : {
            copyText(copyText) {
                navigator.clipboard.writeText(copyText)
                this.$p.notifications.copiedIconNotification(copyText)
            }
        },
		watch     : {}
    }
</script>

<style scoped>
</style>