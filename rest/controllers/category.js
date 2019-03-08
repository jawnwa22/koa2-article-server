/**
 * @description 管理厚爱文章的相关接口逻辑
 */
import {CategoryModel} from '../models/index';

class Category {

  // 添加类别
  static async add (ctx) {
    let cate = ctx.query.cate;

    let isExist = await CategoryModel.findOne({cate_name: cate});

    let add_cate = async (cate) => {
      //添加到categoryModel中
      await CategoryModel.create({cate_name: cate});
    }
    
    !isExist && (add_cate(cate));
    !isExist ? 
      ctx.success({msg: '分类添加成功'}) :
      ctx.error({msg: '该分类已存在'})
  }

  //获取已有的类别
  static async show (ctx) {
    let category = await CategoryModel.find().exec();

    category ?
      ctx.success({
        msg:'类别查找成功',
        data: category
      }) :
      ctx.error({msg: '不存在任何分类'});
  }

}

export default Category;
