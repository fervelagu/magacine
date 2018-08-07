const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const noteSchema = new require('mongoose').Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    text: String,
    images: [
        {
            type: String,
            default: 'https://demoalto-impresionesaerea.netdna-ssl.com/2018/06/amber-heard.jpg'
        }
    ],
    tags: [
        {
            type: String,
            default: 'cinema'
        }
    ]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = require('mongoose').model('Note', noteSchema);