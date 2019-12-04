/**
 * @description 用户的schema
 * 
 * 
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true }, //用户名
  nickname: { type: String, default: 'mickey' }, // 昵称
  password: { type: String, required: true },
  email: { type: String, default: '' },
  avatar: { type: String,default:'' },    // 头像
  profile: { type: String,default:'' },   // 个人简介
  admin: { type: Boolean, default:true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema);
