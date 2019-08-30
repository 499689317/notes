package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

func sender(conn net.Conn) {

	buf := make([]byte, 128)
	buf = []byte("hello world!")
	conn.Write(buf)
	fmt.Println("send over")
	// conn.Close()
	time.Sleep(time.Minute)
}

func main() {
	url := "192.168.1.200:8000"
	conn, err := net.Dial("tcp", url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
	defer conn.Close()

	fmt.Println("connect success")

	sender(conn)

}
