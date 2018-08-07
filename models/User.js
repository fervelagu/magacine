const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const userSchema = new require('mongoose').Schema({
    email: String,
    name: String,
    photoURL: {
        type: String,
        default: 'https://aumentada.net/wp-content/uploads/2015/05/user.png'
    },
    role:{
        type: String,
        enum: ['reader', 'author', 'admin'],
        default: 'reader'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = require('mongoose').model('User', userSchema);