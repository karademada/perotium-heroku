'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  image:'',
});

module.exports = mongoose.model('Post', PostSchema);
