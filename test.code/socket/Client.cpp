
#include "winsock2.h"
#include <iostream>
#pragma comment(lib, "ws2_32.lib");

using namespace std;

#define BUF_SIZE 64;

int main(int argc, char const *argv[])
{
	cout << "Progress Client Test" << endl;

	/**
	 * 套接字中一些对象
	 */
	WSADATA wsd;
	SOCKET host;
	SOCKADDR_IN serverIp;

	/**
	 * 容器(缓冲区)
	 */
	int size = BUF_SIZE;
	char buffer[size];
	char buffer2[size];

	/**
	 * 初始化套接字动态库
	 */
	if (WSAStartup(MAKEWORD(2,2), &wsd) != 0)
	{
		cout << "WSAStartup 失败" << endl;
		return -1;
	}

	/**
	 * 创建套接字
	 */
	host = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (INVALID_SOCKET == host)
	{
		cout << "socket套接字创建失败" << endl;
		// 释放套接字资源
		WSACleanup();
		return -1;
	}

	/**
	 * 设置服务器地址和端口
	 */
	serverIp.sin_family = AF_INET;
	serverIp.sin_addr.s_addr = inet_addr("127.0.0.1");
	serverIp.sin_port = htons((short)8080);


	/**
	 * 连接服务器
	 */
	int errcode = connect(host, (LPSOCKADDR)&serverIp, sizeof(serverIp));
	if (SOCKET_ERROR == errcode)
	{
		cout << "1连接服务器失败" << endl;
		// 关闭套接字
		closesocket(host);
		// 释放套接字资源
		WSACleanup();
		return -1;
	}

	while(1) {
		/**
		 * 向服务器发送数据
		 */
		// 初始化buffer容器
		ZeroMemory(buffer, size);
		cout << "client putin : ";
		cin >> buffer;
		errcode = send(host, buffer, strlen(buffer), 0);
		if (SOCKET_ERROR == errcode)
		{
			cout << "2发送数据失败" << endl;
			closesocket(host);
			WSACleanup();
			return -1;
		}

		/**
		 * 接收服务器回传的数据
		 */
		ZeroMemory(buffer2, size);
		recv(host, buffer2, size, 0);
		cout << "server data is : " << buffer2 << endl;
	}

	/**
	 * 退出
	 */
	closesocket(host);
	WSACleanup();


	return 0;
}