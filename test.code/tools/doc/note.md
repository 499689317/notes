
## 2017年09月16日

+ 调试log记录是否准确
+ 内测环境迁移到云服务上
阿里云企业账号：
Lavignezcc001
Fenliemofang2018


内测地址：47.92.158.10
内测密码：Zhiyule1234
远程连接密码：772693

## 2017年09月18日

+ 关卡
	掉落
+ 每日挑战
+ 背包
+ 数据统计
+ 新手引导
+ 离线数据同步

## 2017年09月19日

+ 压测websocket工具：http://www.blue-zero.com/websocket/
+ cpu跑满情况下：4000的socket连接要占用100M内存(客户端与服务器保持数据传输状态)



+ 开启章节---待测试//---
+ 关卡推图---待测试//---
+ 关卡掉落---待测试//---


+ 离线数据同步---待测试//---
+ 定时掉落//---
+ 每日挑战---待测试//---
+ 新手引导---待测试//---
+ 背包-------待测试//


## 2017年09月20日

+ 添加最大可通关关卡数限制（读表）

+ 客户端16000(压测工具极限连接数)的并发连接情况下，服务端cpu最高会到80%的峰值，有1200个连接失败(这个可能与客户端有关)，在13000左右的连接下，服务端内存占用在70-100M左右。

## 2017年09月21日

+ 掉落系统
+ linux相关命令：
	. 查看内存大小：cat /proc/meminfo
	. 查看硬盘大小：fdisk -l
	. 查看内核信息：uname -a
	. 查看cpu信息：cat /proc/cpuinfo
	. 查看主机名字：hostname
	. 查看内存使用：free -m
	. 查看各分区磁盘使用：df -h
	. 查看操作系统版本：lsb_release -a
	. 查看操作系统内核：cat /proc/version

+ 搭建内测环境
+ linux设置环境变量
	修改/etc/profile文件(全局环境变量)
	添加：export PATH=&PATH:路径


## 2017年09月22日

+ 内测环境搭建
+ 外部连接实例需要设置安全组，否则会出现连接不上的问题
+ score积分未带

## 2017年09月23日

+ 客户端加心跳
+ 测试各已联调模块
+ docker的桥接网：启动docker后，docker会在宿主机上自动生成一个虚拟网卡docker0，所有在宿主机上的docker实例将会共享这个虚拟网卡的网络，如果关闭docker0，则所有创建的实例都连不上网。必要情况可以直接将实例的网络挂在宿主机上

## 2017年09月25日

crontab输出自定义日志：>> /var/log/mycrondlog.log 2>&1

+ 账号服：118.190.201.78
+ log服：118.190.204.213----627473
+ 逻辑服：120.27.11.46 --- 582856
+ 数据库：mongodb://root:Zhiyule1234@dds-m5e062e8a6d2ac241.mongodb.rds.aliyuncs.com:3717,dds-m5e062e8a6d2ac242.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-4537449

## 2017年09月25日

+ production
+ 逻辑服代码布署ok---docker镜像
+ 账号服需要修改分配的逻辑服ip
+ 账号服代码部署ok----docker环境---docker镜像
+ log服代码部署ok----docker环境----docker镜像---导入镜像

+ 使用ecs连接阿里云mongodb实例时，ecs与mongodb的网络类型必需一致
+ 遇到一个坑：阿里云mongodb实例在经典网络切换到专有网络时，是选择不了ecs的交换机的，此时必需要新创建一个交换机专门给mongodb连接(可用区选择必需一致)
+ mongodb3.0版本以后增加了连接认证的要求，阿里云mongodb实例给的连接地址是连接admin数据库，此时直接对数据库节点进行操作是没有权限的，需要先在admin数据库内创建新数据库的用户
	db.createUser({
		user: "zhiyule",
		pwd: "Fenliemofang2018",
		roles: [
			{role: "readWrite", db: "log"},
			{role: "readWrite", db: "gate"},
			{role: "readWrite", db: "game"}
		]
	});

+ 	1. 利用mongo shell进入admin数据库
	2. 在admin数据库中切换到要创建的新库中(use game)
	3. 创建新库的连接账号密码
创建完用户后即可对mongodb副本集各节点进行读写操作了

+ 定时任务命令：0 5 * * * cd /data/shell/ && ./05-00-00.sh >> /var/log/mycrondlog.log 2>&1

+ 设置阿里云后台警告

## 2017年09月27日

+ 升级mongodb驱动版本

## 2017年09月28日

+ 启动线上服务器
+ DMS连接线上云数据库：https://dms-rds.aliyun.com/?host=Lavignezcc001
	有个坑: 只能上主节点操作数据，从节点无法操作......

## 2017年10月11日

+ 账号服务器加负载均衡（对接第三方平台，开游戏新分区）
+ 逻辑服务器socket连接优化（心跳检测与客户端socket连接）
+ 游戏内商城
+ 充值对接

## 2017年10月12日

+ 在使用阿里云数据库备份文件时，下载下来的备份文件在本地的mongodb环境跑不起来，只能在能连上该实例的esc上用mongodb自带的mongodump命令临时备份数据：./mongodump -h 阿里云数据库地址:端口 -u 用户名 -p 密码 -d 备份的数据库名 --authenticationDatabase admin -o 备份文件输出路径

+ log统计需要重新测试准确性，每天需要重置的数据需要检查是否已重置


## 2017年10月17日
./mongodump -h dds-m5e062e8a6d2ac241.mongodb.rds.aliyuncs.com:3717 -u zhiyule -p Zhiyule1234 -d game --authenticationDatabase admin -o /dump

## 2017年10月18日

+ log服务器全局统计不稳定，个人统计比较靠谱
+ 账号服务器需要加入新的统计
+ ng作node.js负载均衡器：http://blog.csdn.net/chszs/article/details/43203127
+ 使用redis服务器



## 2017年10月19日

+ 布署反向代理服务器（nginx)
反向代理（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

+ Nginx官网提供了三个类型的版本
1、Mainline version：Mainline 是 Nginx 目前主力在做的版本，可以说是开发版
2、Stable version：最新稳定版，生产环境上建议使用的版本
3、Legacy versions：遗留的老版本的稳定版

+ 安装nginx
	1. 下载nginx安装包
		. 安装c++编译工具yum install gcc-c++
	2. 安装rewrite包依赖pcre，a: ./configure b: make & make install
	3. 安装包依赖zlib，a: ./configure b: make & make install
	4. 安装包依赖openssl，a: ./config b: make & make install
	5. 安装nginx，a: ./configure b: make & make install

+ 启动/测试nginx
	启动：./usr/local/nginx/sbin/nginx
	测试：curl -i http://localhost/

+ 配置nginx

+ 修改/usr/local/nginx/conf/nginx.conf文件

## 2017年10月20日

+ 完善线上部署方案
+ 将线上的数据库备份到本地
	. game/gate/log的bson文件备份
	. 阿里云数据备份

+ 账号服务器不记录玩家登录的逻辑服务器地址
	. 当前项目不是开分区网络游戏，无服概念
	. 一个逻辑服务器不对应一个数据库

## 2017年10月23日

+ 完善集群的负载均衡功能

## 2017年10月24日

+ 精力系统

## 2017年10月28日

+ redis教程：http://www.cnblogs.com/shanyou/archive/2012/01/28/2330451.html
			http://www.cnblogs.com/yuhangwang/p/5817930.html

## 2017年10月31日

+ 3维坐标下圆的参数方程：http://blog.sina.com.cn/s/blog_6496e38e0102vi7e.html

1. 设圆心坐标为：（x0, y0, z0）
2. 圆半径为：r
3. 球面方程为：（x-x0）²+（y-y0）²+（z-z0）²=r²
4. 求法向量：待定系数法(因为一个平面有无数个法向量，直接假设一个就可以)
5. 圆所在平面的方程：已知平面上两点(x-x0,y-y0,z-z0) * （A, B, C） = A(x-x0) + B(y-y0) + C(z-z0) = 0 
6. 联立方程
	x² + y² + z² = r²
	Ax + By + Cz = 0

## 2017年11月01日

+ pvp对战开房间机制：每个房间使用一个进程去跑，每个进程启动一个socket服务器
+ buffer与stream
	. buffer
	为数据缓冲对象，是一个类似数组结构的对象，可以通过指定开始写入的位置及写入的数据长度，往其中写入二进制数据
	. stream
	是对buffer对象的高级封装，其操作的底层还是buffer对象，stream可以设置为可读、可写，或者即可读也可写，在nodejs中继承了EventEmitter接口，可以监听读入、写入的过程。具体实现有文件流，httpresponse等~~
+ 处理像TCP流或文件流时，必须使用到二进制数据

## 2017年11月06日

+ 商城
	商城有个人商城与全服商城
+ 充值
	充值sdk包

+ 使用OpenResty代替nginx作负载均衡
	. 相比ng来说OpenResty有健康检查机制
	. 安装依赖：yum install readline-devel pcre-devel openssl-devel

## 2017年11月07日

+ 解决openresty无法健康检查问题
	. 检查原理，ng每隔一定时间(可配置)轮询目标节点
	. spawn_checker块内http_req参数配置(get/post请求)配置必须可以请求成功并成功返回

+ 优化完善了服务器http的get请求
	. get请求形式：url + path ? 参数1 & 参数2

## 2017年11月08日

## 2017年11月09日

+ 商城刷新是否会刷出相同货品
+ 刷出相同货品后如何计算购买次数
+ find / -name 文件名：查找文件对所在的路径


https://zhuanlan.zhihu.com/p/30953275


## 2017年11月13日

+ 设置变量的三种方法
	1. 在/etc/profile文件中添加变量【对所有用户生效（永久的）】
	用VI在文件/etc/profile文件中增加变量，该变量将会对Linux下所有用户有效，并且是“永久的”。
	例如：编辑/etc/profile文件，添加CLASSPATH变量
	vi /etc/profile
 	export PATH=$PATH: /home/go/bin/
	注：修改文件后要想马上生效还要运行source /etc/profile不然只能在下次重进此用户时生效

	2. 在用户目录下的.bash_profile文件中增加变量【对单一用户生效（永久的）】
	用VI在用户目录下的.bash_profile文件中增加变量，改变量仅会对当前用户有效，并且是“永久的”。
	例如：编辑mdh用户目录（/home/mdh）下的.bash_profile
	vi /home/mdh/.bash_profile
 	添加如下内容：
 	export PATH=$PATH: /home/go/bin/
	注：修改文件后要想马上生效还要运行$ source /home/mdh/.bash_profile不然只能在下次重进此用户时生效

 	3. 直接运行export命令定义变量【只对当前shell（BASH）有效（临时的）】
	在shell的命令行下直接使用[export变量名=变量值]定义变量，该变量只在当前的shell（BASH）或其子shell（BASH）下是有效的，shell关闭了，变量也就失效了，再打开新shell时就没有这个变量，需要使用的话还需要重新定义。

https://github.com/gislu/goSocket

## 2017年11月25日

+ 签到系统
+ 优化登录逻辑


## 2017年11月28日

+ 3台ecs服务器，1台mongodb实例
+ 搭建docker环境(appjs/mongo)openresty环境mongoshell环境
+ 阿里云mongodb管理工具开启mongodb实例
+ 将项目导入各服务器
+ 在log服务器上搭建openresty服务器作为负载均衡
+ 在log服务器上创建game数据定时重置系统


## 2017年11月29日

+ nodejs主进程与子进程间网络句柄传递：https://segmentfault.com/a/1190000005069010
+ nodejs主进程将net.Server对象传递给子进程后，子进程会根据句柄信息重新生成一个net.Server对象，这两个net.Server对象是互相独立的

有一个特例，发送{cmd: 'NODE_foo'}。当一个消息在他的cmd属性中包含一个NODE_前缀会被看做使用Node.js核心(被Node.js保留)。这时候不会触发子进程的process.on('message')。而是使用process.on('internalMessage')事件，同时会被Node.js内部消费，一般不要使用这个方法。sendHandle这个用于给子进程传入一个TCP Server或者一个socket，为process.on('message')回调的第二个参数接受。callback当消息已经发送，但是子进程还没有接收到的时候触发，这个函数只有一个参数成功为null否则为Error对象。如果没有指定callback同时消息也不能发送ChildProcess就会触发error事件。当子进程已经退出就会出现这个情况。child.send返回false如果父子进程通道已经关闭，或者积压的没有传输的数据超过一定的限度，否则这个方法返回true。

当socket被发送到子进程的时候那么父进程已经无法追踪这个socket什么时候被销毁的。这时候.connections属性就会成为null,因此我们建议不要使用.maxConnections。注意：这个方法在内部JSON.stringify去序列化消息



+ 继续布署线上环境
+ shell脚本在执行js脚本时不知道什么原因一直报找不到js文件，一直追不到具体原因，可能是shell脚本保存的文件格式不正确，重新创建shell脚本后又能正常执行了
+ 启动openresty(nginx): nginx -c nginx.conf
+ 账号服务器：101.201.239.241:3001/101.201.239.241:3002
+ 逻辑服务器：39.106.112.199:5000/39.106.112.199:8000
+ log服务器：101.201.234.73:7000/101.201.234.73:3000(账号服务器负载均衡)/game数据库定时重置数据
+ 阿里云数据库后台账号管理：dds-2zec1e43dc2f61c41.mongodb.rds.aliyuncs.com:3717（主节点）
+ 如果阿里云在所有其它问题都排除的情况下还是连不上那就是ecs的安全组设置有问题了

## 2017年12月02日

+ 重置脚本没有退出进程，导致一直占用系统资源，cpu跑到100%
+ kbps概念：
	. 1MB=8192Kbps 而Kbps又称比特率，指的是数字信号的传输速率，也就是每秒钟传送多少个千位的信息（K表示千，Kb表示的是多少千个位）
	. Kbps也可以表示网络的传输速度，为了在直观上显得网络的传输速度较快，一般公司都使用kb（千位）来表示， 如果是KBps，则表示每秒传送多少千字节。1KByte/s=8Kbps(一般简写为1KBps=8Kbps)
	. ADSL上网时的网速是512Kbps,如果转换成字节，就是512/8=64KByte(即64千字节每秒）
	. 1MB宽带=1Mbps=1024Kbps=1024/8KBps=128KB/s

+ 测试服务器node绝对路径:/root/nvm/versions/node/v4.8.4/bin/node

## 2017年12月04日


+ 重置脚本出现连接数据库问题
	. 初步分析可能是mongodb shell版本问题，暂时未发现其它原因导致的
	. 先将版本升级上去，再进行一下步观察
+ copy一份log数据库：./mongodump -h dds-2zec1e43dc2f61c42.mongodb.rds.aliyuncs.com:3717 -u zhiyule -p Fenliemofang2018 -d log --authenticationDatabase admin -o /dump
+ 将数据还原到本地：./mongorestore -h 本地mongo地址 -d copy到本地数据库名 源数据库路径
./mongorestore -h 192.168.1.114:27017 -d log-20171204 /mnt/hgfs/share/第二批测试数据/20171204/log/


## 2017年12月05日

+ 奖励数据表导成json出错了，需要重新导表
+ 重置脚本连接数据库问题已定位是mongodb shell版本问题
+ 逻辑服务器cpu基本处于0%使用率状态(2核4g内存配置)，数据样本严重不足，与传统游戏相比还是相差很大，带宽使用量最高只有30kbps
+ log服务器cpu出现100%占用情况，后发现是定时任务进程异常导致的，带宽使用量最高只有30kbps
+ 账号服务器由于开启了多个进程，使用nginx在内网做负载均衡，带宽占用为0，cpu基本处理0%使用率状态
+ mongodb副本集实例(1核2g内存30g硬盘)使用率同样并不高



## 2017年12月07日

+ 排查游戏内请求延时特别高的问题（初步猜测数据库检索代价特别高引起的）
+ 搭建一个阿里云mongodb实例的测试用例，测试数据库的性能


## 2017年12月08日

+ 清理玩家socket时应该是报错了，导致后续将玩家从在线队列移到离线队列代码没有走，玩家就一直驻留在在线队列中
+ 此时玩家不能被销毁，导致这个账号一直不能进入游戏，并且导致内存泄漏
+ 如何解决？？？------如果检测到玩家在登录时玩家还缓存在在线队列中，那么直接将玩家从在线队列移到离线队列中

+ 将阿里云的mongodb迁移到自已的服务器上去
+ 启动mongodb进程时带--auth参数，表示连接时需要账号密码认证(单台mongodb可以用这个参数，副本集不能使用这个参数)

## 2017年12月09日

+ mongodb启动后需要认证连接
+ 连接mongodb时传入的w参数不能大于启动的节点数，否则insert数据时会报错，这个参数是告诉mongo向多少个节点写数据

+ mongodb副本集认证启动过程
	. 先非认证启动数据库副本集：
	docker run -d -p 3717:27017 -v /data/db/:/data/db/ --privileged=true --replSet zhiyule
	. 在admin数据库创建几个数据库管理账号
	db.createUser({
		user: "root",
		pwd: "111111",
		roles: [
			{role: "root", db: "admin"},
			{role: "userAdminAnyDatabase", db: "admin"}
		]
	});
	. 使用认证启动数据库副本集，使用--keyFile参数启动数据库
	. 开启了keyFile,隐含就开启了auth，这个时候连接副本集就需要进行认证了
	. 生成keyFile文件：openssl rand -base64 100 > /data/mongodb-keyfile
	. 修改keyFile权限：chmod 600 mongodb-keyfile(好像只能600权限，不能多不能少)
	. 修改KeyFile所属权限：chown 999 mongodb-keyfile(这是个大坑啊，不改这个权限无法启动)
	. 启动带认证数据库：
	docker run -d -p 3717:27017 -v /data/db/:/data/db/ -v /data/logs/:/data/logs/ -v /data/keyfile/:/opt/keyfile/
	--privileged=true docker/mongo -f /opt/keyfile/mongodb.conf
	. mongodb.conf配置：
	logpath=/data/logs/mongo.log
	logappend=true
	replSet=zhiyule
	keyFile=/opt/keyfile/mongodb-keyfile


## 2017年12月10日

+ 迁移数据库（将阿里去数据库数据迁移到自已数据库里）
	1. 停服（log服，逻辑服，账号服）
	2. 导出阿里云数据（备份数据一起导出）
	3. 将导出的数据导入到自已的数据库中
	4. 将线上服务器连接阿里云地址改为自已数据库连接地址
	5. 重新起动线上服务器，迁移完毕

## 2017年12月10日

+ 继续深追mongodb查询特别慢的问题
	. 线上环境（阿里云mongodb副本实例）线上服务器内部查询一次非常慢
	. 线上环境（自已手动搭建的mongodb副本集）线上服务器内部查询一次非常慢
	. 线上环境（自已手动搭建的mongodb副本集）使用服务器内部api单独拿出来查询，查询速度正常，很奇怪
	. 线上环境（自已手动搭建的mongodb副本集）使用thunk函数api一样，查询速度正常。此时非常奇怪了
	. 阿里云（搭建mongodb单点）查询一次正常速度
	. 内网环境（搭建mongodb单点）查询一次正常速度
	. 内网环境（搭建mongodb副本集）待测试


## 2017年12月12日

+ 解决无法登录游戏的问题，临时在log服起了一个账号服暂时解决一下
+ 导致的原因是因为项目内部查询一次时间太长了，nginx在做负载均衡时设置接收账号服务器数据的超时时间是1秒，但显然查询时间大于1秒，所以ng一直判定账号服务器超时，只能先把超时时长改长一点暂时先解决这个问题。主要问题还是需要解决查询特别慢这个问题

+ 首要问题解决数据库查询特别慢这个问题，问题已经很严重了
+ mongodb副本集配了这几个参数后，find查询莫明其妙突然特别慢了，后边需要将mongodb配置参数详细研究一下
{
	"poolSize": 10,
	"connectTimeoutMS": 30000,
    "socketTimeoutMS": 500,
    "w": 1,
    "wtimeout": 500,
    "j": true
}

## 2017年12月13日

+ 做一个发放物品的接口
+ 整理了项目中的gm功能，新加了gm发放道具功能

## 2017年12月15日

+ navicat数据库工具--可作为导表工具

## 2017年12月18日

+ 写脚本将线上数据库的所有数据表全部跑成文本文件
+ 优化mongodb对数据库的查询操作

## 2017年12月19日

+ 完成了在线数据导出集成工具

## 2017年12月20日

+ 研究后期项目中会用上的redis缓存服务器
+ 查线上日志有一个socket连接bug
+ 与墨飞沟通gm管理后台系统
+ 明天任务计划：研究后期项目中会用上的技术点

## 2017年12月21日

+ 调整数据在excel表内展示的格式
+ 同步线上服务器代码到内测服务器
+ 明天任务计划：实践redis在当前项目的可行性

## 2017年12月22日

+ nodejs加解密系统应用
+ 修改记录新手引导数据方式
+ 重新部署服务器环境将线上所有节点迁移到1台服务器


## 2017年12月25日

+ 整理nodejs加密系统crypto模块api
+ 刲装des对称加密系统
+ 刲装aes对称加密系统
+ 刲装rsa/md5/sha1获取签名方法
+ 刲装hmac获取hash摘要认证码方法


## 2017年12月26日

+ 整理nodejs的buffer模块系统
+ 实现buffer类型与其它类型数据之间实现编码转换方法
+ 实现数据传输过程压缩数据方法
+ 刲装deflate/inflate解压缩数据api
+ 刲装gzip/gunzip解压缩数据api

## 2017年12月27日

+ 完成广告显示概率发放
+ 完成广告奖励发放领取

## 2017年12月28日

+ 广告奖励发放接口兼容不主动推送isShowAd字段问题
+ 搭建oss更新apk文件环境
+ 缩减线上一台服务器并重新部署线上环境
+ 备份缩减服务器上的数据

## 2017年12月29日

+ 更新新包到oss服务器
+ 更新账号服务器当前版本号，提供新版本apk下载更新
+ 更新逻辑服务器与账号服务器连接地址/level表数据
+ 更新逻辑服务器下一版本新功能

+ 更新公告---
+ 新版本号0.3---
+ 显示广告概率---上线---

## 2017年12月30日

+ 上线部署
	1. 上传apk到oss
	2. 同步代码到账号服务器与逻辑服器
	3. 备份数据库数据----
	4. 重启账号服务器与逻辑服务器
	5. 测试

## 2018年01月02日

+ 合并0.3版本代码到master分支，master版本检出新分支
+ 查进入游戏体力为0的bug

## 2018年01月03日

+ 导出第三次线上测试数据到本地
+ 分析各log数据导出.csv文件

## 2018年01月04日

+ 阿里云ipv6地址配置
	. 开启阿里云ipv6服务，阿里云默认不开启ipv6
	. 1. 修改/etc/modprobe.d/disable_ipv6.conf文件，修改 options ipv6 disable 为 0
	. 2. 修改/etc/sysconfig/network文件，NETWORKING_IPV6 为 yes
	. 3. 修改/etc/sysconfig/network-scripts/ifcfg-eth0文件，添加 IPV6INIT 为 yes 和 IPV6_AUTOCONF 为 yes
	. 4. 修改/etc/sysctl.conf文件，修改net.ipv6.conf.all.disable_ipv6/net.ipv6.conf.default.disable_ipv6/net.ipv6.conf.lo.disable_ipv6都为0
	. 5. 创建系统启动时自动加载ipv6模块脚本，创建脚本文件 ipv6.modules 
	vi /etc/sysconfig/modules/ipv6.modules
	脚本内容
	!/bin/sh
	if [! -c /proc/net/if_inet6];then
	exec /sbin/insmod /lib/modules/uname -r/kernel/net/ipv6/ipv6.ko
	fi
	. 6. 重启系统，ifconfig查看ecs的ipv6模块是否开启成功

+ 在he下配置的ipv6信息：tunnelbroker.net
	. Create Regular Tunnel填入ecs公网地址
	. You are viewing from显示连接he网站ip地址
	. Available Tunnel Servers选择隧道服务器，默认选择离你延时最低的服务器
	. 隧道创建成功后在Example Configuratior页签中根据ecs系统获取配置文件

+ 修改/etc/init.d/network网卡的启动脚本,系统重启时自动配置ipv6 tunnel
	编辑脚本
	vi /etc/init.d/network
	在 touch /var/lock/subsys/network 之前添加以下脚本
	# 添加 IPv6 脚本支持
	ifconfig sit0 up
	ifconfig sit0 inet6 tunnel ::66.220.18.42
	ifconfig sit1 up
	ifconfig sit1 inet6 add 2001:470:c:2b6::2/64
	route -A inet6 add ::/0 dev sit1
	#修改结束
	现在每次重启机器都可以自动分配好ipv6地址。使用境外的机器，使用Ping6及curl测试IPv6隧道地址访问看结果正常
	




