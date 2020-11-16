import moment from 'moment'

export default {
    standardizedTime(input: Date) {
        return moment(input).format('MMMM Do YYYY, h:mm:ss a')
    }
}