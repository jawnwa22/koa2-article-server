/**
 * @description 创建需要的文件夹
 * 
 */
import fs from 'fs';

let dir = [
  './articles',
  './uploads'
]

try {
  dir.forEach( (value) => {
    if (!fs.existsSync((value))) {
      fs.mkdir(value, function (err) {
        if (err)  throw new Error('无法创建文件夹')
      })
    }
  })
} catch (error) {
  console.log(error);
  process.exit();   //终止程序
}