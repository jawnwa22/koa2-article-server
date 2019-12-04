/**
 * @description 博客的schema
 * 
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  websiteName: {type: String, required: true},
  master: {type: String, require: true},
  description: {type:String, require: true}
})

export default mongoose.model('Blog',BlogSchema);