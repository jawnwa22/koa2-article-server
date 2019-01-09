/**
 * @description 文章标签 schema
 * 
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tag_name: [{type: String, default: ""}]
})

export default mongoose.model('Tag', TagSchema);