/**
 * @description: 文章类别的接口逻辑层
 * @since: 2019-07-12 20:35:37
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-08-04 15:05:44
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
        let cate = ctx.query["cate[]"];

        //判断cate是否为array
        if (cate instanceof Array) {
            let promiseArr = [];
            cate.forEach(item => {
                promiseArr[promiseArr.length] = new Promise(resolve => {
                    resolve(
                        CategoryModel.create({
                            cate_name: item
                        })
                    );
                });
            });
            await Promise.all(promiseArr);
        } else {
            await CategoryModel.create({
                cate_name: cate
            });
        }
        ctx.success({
            msg: "添加成功"
        });
    }

    //获取已有的类别
    static async show(ctx) {
        let category = await CategoryModel.find().exec();
        ctx.success({
            msg: "类别查找成功",
            data: {
                result: category
            }
        });
    }

    /**
     * @description: 删除类别
     * @param {type}
     * id: 类别对应的id {String}
     * @return:
     */
    static async deleteCategory(ctx) {
        let { id } = ctx.query;
        let isExist = null;
        if (id) {
            isExist = await CategoryModel.findByIdAndDelete({ _id: id });
        } else {
            ctx.error({ msg: "缺少参数id" });
            return;
        }

        isExist ? ctx.success({ msg: "类别删除成功" }) : ctx.error({ msg: "不存在该类别" });
    }
}

export default Category;
