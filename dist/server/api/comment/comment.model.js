'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: String,
    body: String,
    author: String,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);
