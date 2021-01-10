<template>
    <div>
		<p>This exists solely to help with testing random components...</p>
        <GoogleMapComponent :markers='markers' />
    </div>
</template>

<script>
    import GoogleMapComponent from '@/components/shared/GoogleMapComponent'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "testing-component",
		props     : [],
		components: {
            GoogleMapComponent
        },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			user() {
				return this.$store.getters['userStore/userData']
            },
            propertyMappingId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('property_mapping').id
            },
            properties() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.propertyMappingId)
            },
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
            },
            markers() {
                return this.properties.map( (item) => {
                    return {
                        position: {
                            lat: parseFloat(item.content.lat),
                            lng: parseFloat(item.content.lng)
                        },
                        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
                        infoText: item.content.infotext
                    }
                })
            }
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>