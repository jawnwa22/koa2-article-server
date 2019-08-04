/**
 * @description: 文章类别的接口逻辑层
 * @since: 2019-07-12 20:35:37
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-08-04 12:11:53
 */

import { CategoryModel } from "../models/index";

class Category {
    /**
     * @description: 添加标签
     * @param {type} 
     * query：cate[] {array}
     * @return: 
     */
    static async add(ctx) {
        let cate  = ctx.query["cate[]"];
        console.log(cate);
        
        let promiseArr = [];
        cate.forEach(item => {
            promiseArr[promiseArr.length] = new Promise(resolve => {
                resolve(CategoryModel.create({
                    cate_name: item
                }))
            })
        })
        let arr = await Promise.all(promiseArr);
        console.log(arr);
        
        ctx.success({
            msg: "添加成功",
        })
    }

    //获取已有的类别
    static async show(ctx) {
        let category = await CategoryModel.find().exec();
        ctx.success({
            msg: "类别查找成功",
            data: {
                result: category
            }
        })
    }
}

export default Category;
