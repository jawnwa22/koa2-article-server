/**
 * @description 文章的相关接口逻辑层
 */
// import {ArticleModel} from '../models/index'; 
import mongoose from 'mongoose';
import marked from 'marked';
import fs from 'fs';
import { ArticleModel, CategoryModel, TagModel } from '../models/index';


class ArticleController {

  /**
   * 获取前端上传的文件
   * 如果数据库存在相同的文件名则返回错误
   * 不存在相同的文件名就移动到articles文件夹中
   * 并将信息保存到数据库中
   */
  static async upload(ctx) {
    let mdfile = ctx.request.files.mdfile;
    
    let md = ctx.query;

    let isExist = await ArticleModel.findOne({name: mdfile.name});
    
    let tag = md['tag[]']
  
    // 插入文章到数据库
    const add_article = async () => {
      const add_tag = (tag) => {
        
        return TagModel.create({tag_name: tag});
      }

      //创建文档对象
      let article = {
        name: mdfile.name,
        createdAt: md.createdAt,
        categoryID: mongoose.Types.ObjectId(md.category),
        tagID: (await add_tag(tag))._id,
      }
      
      return ArticleModel.create(article);
    }
    
    /**
     * @description 移动文件到aricles中
     * @todo 需要添加数据库的事物回滚
     * @todo 当移动文件出现问题时，需要撤销文章的添加
     * @attention 因为fs中的回调异常无法被外部中间件的try catch捕获，因此使用promise
     * @param {Object} file 
     */
    const moveToAricles = (file) => {
      return new Promise((resolve, reject) => {
        fs.rename(file.path, './articles/' + file.name, (err) => {
<<<<<<< Updated upstream
          err ? reject(err) : resolve(true);
=======
          !err && reject(err);
          resolve(true);
>>>>>>> Stashed changes
        })
      })
    }

    //删除缓存文件
    const removeFile = (file) => {
      return new Promise((resolve, reject) => {
        fs.unlink(file.path, function (err) {
<<<<<<< Updated upstream
          err ? reject(err) : resolve(true);
=======
          !err && reject(err);
          resolve(true);
>>>>>>> Stashed changes
        })
      })
 
    }

    let new_article = null;

    !isExist ? 
      (new_article = (await add_article())) && 
      (await moveToAricles(mdfile)) &&
      ctx.success({
        msg: '添加文章成功',
        data: new_article
      }) :
      (await removeFile(mdfile)) &&
      ctx.error({msg: '文章已存在'})

  }

  static async update(ctx) {
    ctx.body = 'hello'
  }
  

  /**
   * 删除文章及相关标签
   */
  static async delete(ctx) {
    let article_id = ctx.params.id;
    let article = await ArticleModel.findById({_id: article_id});
    
    article ?
      (await TagModel.findByIdAndDelete({_id: article.tagID})) && 
      (await ArticleModel.findByIdAndDelete({_id: article_id})) &&
      ctx.success({msg: '文章已成功删除'}) :
      ctx.error({msg: '不存在该文章！'})
  }

  // 获取文章
  static async get_article(ctx) {
    let id = ctx.params.id;
    let article = await ArticleModel.findById({_id: id});
    
    // 将获取的article对象转换成html
    const convertToHtml = (article) => {
      return new Promise((resolve, reject) => {
        //匹配h1内容
        let titleReg =  /<h1[^>]*>([\w-\W]+)<\/h1>/;
        fs.readFile('./articles/' + article.name, 'utf-8', async (err, data) => {
          if (err) reject(err);

          let content = data ? marked(data) : '';
          let title = data ? content.match(titleReg)[0] : article.name;
          content = data ? content.replace(title, '') : '打开该文件遇到问题...';
          //去除标题的h1标签
          title = data ? title.match(titleReg)[1] : '打开该文件遇到问题';
          resolve({
            _id: article._id,
            title,
            content,
            category: (await CategoryModel.findById({_id: article.categoryID})),
            tags: (await TagModel.findById({_id: article.tagID})),
            createdAt: article.createdAt
          })
        })
      })
    }

    article ? 
      ctx.success({
        msg: '获取文章成功',
        data: await convertToHtml(article)
      }) :
      ctx.error({msg: '没找到该文章'})

    
  }

  // 获取文章列表
  static async get_list(ctx) {
    let limit = parseInt(ctx.query.limit) || 5;
    let page = ctx.query.page || 1;

    let skipPage = limit * (page - 1);

    let mdlist = await ArticleModel
      .find()
      .sort({'_id': -1})
      .skip(skipPage)
      .limit(limit)
      .exec();

    /**
     * @description 读取markdown文件并且转换成html
     * @param {Object} mdlist 
     */
    const convertToHtml = (mdlist) => {
      //匹配md文章中##之前的所有内容
      let summaryReg = /^#[^#]*/;
      //匹配h1内容
      let titleReg =  /<h1[^>]*>([\w-\W]+)<\/h1>/;

      let promiseArr = [];

      mdlist.forEach( (file) => {
        
        promiseArr[promiseArr.length] = new Promise(  (resolve) => {
          fs.readFile('./articles/' + file.name, 'utf-8', async (err, data) => {
            let content = data ? marked(data.match(summaryReg)[0]) : '';
            let title = data ? content.match(titleReg)[0] : file.name;
            //去除标题之后的摘要
            content = data ? content.replace(title, '') : '打开该文件遇到问题';
            //去除标题的h1标签
            title = data ? title.match(titleReg)[1] : '打开该文件遇到问题';
            resolve({
              _id:file._id,
              title,
              content,
              category: (await CategoryModel.findById({_id: file.categoryID})),
              tags: (await TagModel.findById({_id: file.tagID})),
              createdAt: file.createdAt
            })
          })
        })

      })
      return promiseArr;
    } // end convertToHtml
    
    !mdlist.length ? 
      ctx.error({msg: '文章列表为空'}) :
      ctx.success({
        msg: '文章列表获取成功',
        data: await Promise.all(convertToHtml(mdlist))
      });
  }

  // 获取总页数
  static async get_totoal_page (ctx) {
    let limit = ctx.query.limit || 5;
    console.log(limit);
    

    let count = await ArticleModel.count({});
    // 将总的文章数量除以一页显示的文章数， 得到的结果向上取整即可
    let total_page = Math.ceil(count/limit); // 如果是无文章，返回总页数是0

    limit > 0 ? 
      ctx.success({
        msg: '页数获取成功',
        data: total_page}) :
      ctx.error({msg: '参数出错'})
  }
}

export default ArticleController;
