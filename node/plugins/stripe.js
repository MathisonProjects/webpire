const Dotenv = require('dotenv')
const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env
const envVariables = Dotenv.config({ path: envFile }).parsed
const stripe = require('stripe')(envVariables.STRIPE_SECRET_KEY)


const StripeController = {
    async processPayment(payload) {
        return await this.createAccountProfile(payload.user).then( async (user) => {
            return await this.createCardProfile(payload.card,user).then(async (paymentSource) => {
                const chargePayload = {
                    card: paymentSource,
                    description: payload.description,
                    amount: payload.amount
                }
                this.paymentIntent(chargePayload).then( async (paymentIntent) => {
                    this.chargeCard(paymentIntent).then( async (chargeResponse) => {
                        console.log(chargeResponse)
                    })
                })
            })
        })
    },
    async createAccountProfile(user) {
        user.description = Date.now() + ' - api-router charge'
        return await stripe.customers.create(user)
    },
    async createCardProfile(card,user) {
        card.object = 'card'
        return await stripe.customers.createSource(user.id, {source: card})
    },
    async paymentIntent(payload) {
        return await stripe.paymentIntents.create({
            amount: payload.amount,
            source: payload.card.id,
            customer: payload.card.customer,
            currency: 'usd',
            payment_method_types: ['card'],
        })
    },
    async chargeCard(payload) {
        return await stripe.paymentIntents.confirm(payload.id)
    }
}

module.exports = StripeController

// const payload = {
//     user: {
//         name: '',
//         address: {
//             line1: '',
//             city: '',
//             state: '',
//             postal_code: '',
//         },
//         email: '',
//         description: ''
//     },
//     card: {
//         object: 'card',
//         number: '4111111111111111',
//         exp_month: '12',
//         exp_year: '25',
//         cvc: '555'
//     },
//     description: "this is a test",
//     amount: 100
// }
