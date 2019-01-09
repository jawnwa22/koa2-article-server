# markdown文件服务器开发思路
原因：
分离管理后台API服务器和markdown文件服务器之后
能够更好的在开发环境和生产环境进行后台API的测试和开发

## 文章API

### 1. markdown文件上传

功能：上传markdown接口
请求：	post
URL： /api/article

参数：mdfile
类型：File
是否必须：是
描述：上传的markdown的文件对象

参数：tag
是否必须：是
描述：markdown文章的标签

参数：category
是否必须：是
描述：markdown文章的类别

### 2. markdown文件删除
功能：删除markdown文件
请求：delete
URL：/api/article/:id


### 3. markdown文件更新
功能：更新markdown文件
请求：put
URL：/api/article/:id

### 4. 获取markdown文章
功能：获取markdown转换之后的内容
请求：get
URL：/api/article/:id

### 5. 获取文章列表
功能： 获取文章的列表（包括文章的摘要）
请求：get
URL：/api/article/list?page=2&limit=5

参数说明：
page：显示第几页
limit：每页显示的文章数量

### 6. 获取总页数
功能： 获取总的页数
请求： get
URL： /api/article/total_page?limit=5

参数说明：
limit：每页显示的文章数量


## 文章类别API

### 1. 新增类别
功能：新增文章的类别
请求：post
URL： /api/category?cate=XXX

参数说明：
cate：新增的类别
5c348116b83b1010abae29a