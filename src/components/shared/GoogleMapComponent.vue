<template>
    <GmapMap :center="{lat:29.7604, lng:-95.3698}" :zoom="10" map-type-id="terrain" style="height: 500px" class='w-100'>
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false"></gmap-info-window>
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false" :icon='m.icon' @click="toggleInfoWindow(m,index)" />
    </GmapMap>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "google-map-component",
		props     : [
            'markers'
        ],
		components: {},
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			user() {
				return this.$store.getters['userStore/userData']
            },
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
            }
		},
		data()      {
            return {
                infoWindowPos: null,
                infoWinOpen: false,
                currentMidx: null,
                infoOptions: {
                    content: '',
                    //optional: offset infowindow so it visually sits nicely on top of our marker
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                }
            }
        },
		methods   : {
            toggleInfoWindow: function(marker, idx) {
                this.infoWindowPos = marker.position;
                this.infoOptions.content = marker.infoText;

                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }

                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
                }
            }
        },
		watch     : {}
    }

    // For additional marker types, please refer to https://sites.google.com/site/gmapsdevelopment/
</script>

<style>

</style>