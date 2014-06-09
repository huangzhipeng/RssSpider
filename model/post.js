var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: {type: String, unique: true},
    link: String,
    description: String,
    descImg: String,
    content: String,
    pubDate: {
        type: Date,
        'default': Date.now
    },
    source: String,
    typeId: Number,
    records: []
});
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
