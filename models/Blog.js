const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    writer: {
        type: String
        // type: Schema.Types.ObjectId,
        // ref: 'admins'
    }
})

BlogSchema.set('timestamps', true)

module.exports = mongoose.model('blogs', BlogSchema)