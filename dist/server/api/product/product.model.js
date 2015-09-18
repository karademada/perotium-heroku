'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    url: String,
    name: Schema.Types.Mixed,
    prix: Schema.Types.Mixed,
    images: Schema.Types.Mixed,
    categorie: Schema.Types.Mixed,
    upvotes: {type: Number, default: 0},
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);
