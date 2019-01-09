/**
 * @description 文章的schema
 * 
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  name: {type: String, required: true},
  categoryID: {type: Schema.Types.ObjectId, ref: 'Category'},
  comments: {type: Schema.Types.ObjectId, ref: 'Comment'},
  tagID: {type: Schema.Types.ObjectId, ref: 'Tag'},
  createdAt: {type: Date, required: true},

})

export default mongoose.model('Article', ArticleSchema);