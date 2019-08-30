package main

import (
	"config"
	"socket"
)

func main() {

	// 启动socket服务器
	config.Cfg()
	socket.CreateSocket()
}
