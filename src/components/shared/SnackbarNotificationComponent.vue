<template>
    <v-snackbar :value="notificationData.display" bottom :color="notificationData.type" outlined right>
        {{ notificationData.text }}
    </v-snackbar>
</template>

<script>
    export default {
        name      : "snackbar-notification-component",
        props     : {},
        model: {
            event: 'updateModel'
        },
        components: {},
        created()   {},
        data()      {
            return {}
        },
        computed  : {
            notificationData() {
                return this.$store.state.notificationsStore.notification
            }
        },
        methods   : {},
        watch     : {}
    }
</script>

<style scoped>
</style>