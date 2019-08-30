package socket

import (
	"fmt"
	"net"
)

const (
	hostname string = "192.168.1.200"
	port     string = "8000"
)

// net.Listen("tcp", localhost:port)
// listener.Accept()

/**
 * 对外公有方法
 * CreateSocket: 创建tcp服务器
 */
func CreateSocket() {

	var url string = hostname + ":" + port
	fmt.Println(url)

	listener, err := net.Listen("tcp", url)
	defer listener.Close()
	if err != nil {
		fmt.Println("listener初始化错误")
		return
	}
	// return listener
	// fmt.Println(listener)
	// fmt.Println(&listener)
	// fmt.Println(*listener)
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("conn初始化错误")
			continue
		}
		defer conn.Close() // 关闭连接
		fmt.Println("连接成功", conn.RemoteAddr().String())
		go recvConn(conn)
	}
}

// 私有方法
// 处理连接
func recvConn(conn net.Conn) {

	buffer := make([]byte, 2048)
	for {

		n, err := conn.Read(buffer)
		if err != nil {
			fmt.Println("关闭连接: ", err)
			return
		}
		fmt.Println("接收客户端数据:\n", string(buffer[:n]))
	}
}
func initSocket() {

	// listener := createSocketListen()
	// fmt.Println(listener)
	// if listener == nil {
	// 	fmt.Println("listener初始化错误")
	// 	return
	// }
	// // 监听客户端连接
	// for {

	// 	conn, err := listener.Accept()
	// 	if err != nil {
	// 		fmt.Println("conn初始化错误")
	// 		continue
	// 	}
	// 	fmt.Println(conn.RemoteAddr().String(), "连接成功")

	// }
}
