<template>
    <div class='force-right'>
        <div class='row position-absolute'>
            <div class='col orient-counter-clockwise'>
                Support
            </div>
            <div class='col' v-if='showSupport'>
                Test
            </div>
        </div>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "submit-support-ticket-component",
		props     : [],
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
                showSupport: false
            }
        },
		methods   : {},
		watch     : {}
    }
</script>

<style>
    .force-right {
        margin: 50% 0px 0px 95%;
    }
    .orient-counter-clockwise {
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
</style>