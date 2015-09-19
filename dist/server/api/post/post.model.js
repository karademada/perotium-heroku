'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    product: Object,
    comments: Object
});

module.exports = mongoose.model('Post', PostSchema);
