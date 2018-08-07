const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const reviewSchema = new require('mongoose').Schema({
    movieTitle: String,
    director: String,
    year: Number,
    stars: Number,
    text: String,
    photoURL: {
        type: String,
        default: 'https://78.media.tumblr.com/e963c0e0802a71f1c040d25a4efbb21c/tumblr_of06zmgumH1solxeko1_540.png'
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = require('mongoose').model('Review', reviewSchema);