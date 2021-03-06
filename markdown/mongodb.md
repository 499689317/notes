## mongodb

1. 分布式文件存储
2. 介与关系数据库和非关系数据库之间
3. 文件存储格式为BSON(一种JSON的扩展)
4. BSON是对二进制格式的JSON的简称，BSON支持文档和数组的嵌套
5. 一个MongoDB 实例可以包含一组数据库，一个DataBase可以包含一组Collection（集合）,一个集合可以包含一组Document（文档）.一个Document包含一组field(字段)每一个字段都是一个key/value pair
	文档：文档是MongoDB的基本单位，类似关系数据库的行（比行复杂），多个键值有序地放在一起就构成了文档
	集合：集合就是一组文档，类似于关系数据库中的表，集合是无模式的，集合中的文档可以是各式各样的
	数据库：MongoDB中多个文档组成集合，多个集合组成数据库，一个MongoDB实例可以承载多个数据库。它们之间相互独立，每个数据库都有独立的权限控制，在磁盘上，不同的数据库存放在不同的文件中。MongoDB 中存在以下系统数据库。
	● Admin 数据库：一个权限数据库，如果创建用户的时候将该用户添加到admin 数据库中，那么该用户就自动继承了所有数据库的权限。
	● Local 数据库：这个数据库永远不会被负责，可以用来存储本地单台服务器的任意集合。
	● Config 数据库：当MongoDB 使用分片模式时，config 数据库在内部使用，用于保存分片的信息。

## 安装mongodb

1. mongodb安装完成(window 7)
2. 新建数据目录(db文件夹)存放数据库数据(只能在磁盘根目录如：c:/ d:/)
3. 使用mongodb shell启动服务器后台管理(mongod命令)
	* 启动服务(mongod --bind_ip 127.0.0.1 --logpath "e:/data/logConf/mongodb.log" --logappend --dbpath "e:/data/db" --port 27017)
	* bind_ip: 127.0.0.1只能本机连接
	* logpath: 日志路径
	* logappend: 追加日志
	* dbpath: 数据目录
	* port: 27017 mongo默认端口
4. 连接数据库(mongo命令) javascript shell

## mongodb GUI管理工具(NoSQL Manager for MongoDB)

1. NoSQL Manager for MongoDB(兼容性好，兼容mongodb 3.0)
2. 破解：
		试用运行该软件
		注册表中删除 HKEY_CURRENT_USER\Software\NoSQL Manager Group
		删除 C:\ProgramData\NoSQL Manager Group
3. 超级用户(admin)与普通用户(test)
	超级用户选择直接认证数据库(admin数据库)
	普通用户需要在Edit...上设置Databases为数据库名
4. 在mongo shell下切换用户输入db.auth("用户名","密码")
	注意：必需先切换数据库(use 数据库名)再切换用户才能验证通过(返回值为1则验证通过)

## mongo shell下创建用户

1. 创建数据库(如：use 数据库名)
	use admin 创建了一个名为admin的数据库
2. 创建超级用户
	db.createUser({user:"用户名",pwd:"密码",roles:[{role:"权限",db:"数据库名"}]})
3. 重起数据库(重起数据中加入--auth参数设置认证)