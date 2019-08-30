#启动mongodb服务
docker run -d -p 27017:27017 -v /data/db/:/data/db/ --privileged=true docker/mongo