/**
 * @description 文章分类 schema
 * 
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  cate_name: {type: String, default: ""}
})

export default mongoose.model('Category', CategorySchema);