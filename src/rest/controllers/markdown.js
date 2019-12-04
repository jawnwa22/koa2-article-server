/**
 * @description: markdown文件输出方法
 * @since: 2019-07-13 09:04:39
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-07-13 10:51:30
 */

import marked from "marked";

const Markdown =  {
    /**
     * @description: 将获取到的markdown文件内的信息转换成html
     * 只获取摘要部分
     * “#” 之后 "##" 之前的部分为文章的摘要部分
     * @param {String}  
     * @return: 返回文章标题和摘要部分
     */
    getSummary(mdData) {
        // 匹配“##”之前的所有内容
        let summaryReg = /^#[^#]*/;
        // 匹配h1内容
        let titleReg = /<h1[^>]*>([\w-\W]+)<\/h1>/;
        
        let html = mdData ? marked(mdData.match(summaryReg)[0]) : "";
        let title = mdData ? html.match(titleReg)[0] : "打开该文件遇到问题";
        // 去除标题之后的摘要
        let content = mdData ? html.replace(title, "") : "";
        // 去除h1标签的标题
        title = mdData ? title.match(titleReg)[1] : "打开该文件遇到问题";
        
        return {
            title,
            content
        }
    },

    /**
     * @description: 获取文章内容并且转换成html
     * @param {String} 
     * @return {Object}
     */
    getContent(mdData) {
        // 匹配h1内容
        let titleReg = /<h1[^>]*>([\w-\W]+)<\/h1>/;
        let html = mdData ? marked(mdData) : "";
        let title  = mdData ? html.match(titleReg)[0] : "打开该文件遇到问题";
        // 去除标题之后的文章内容
        let content = mdData ? html.replace(title, "") : "";
        // 去除h1标签的标题
        title = mdData ? title.match(titleReg)[1] : "打开该文件遇到问题";

        return {
            title,
            content
        }
    }
}

export default Markdown;