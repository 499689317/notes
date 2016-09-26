#include "winsock2.h"
#include <iostream>

#pragma comment(lib, "ws2_32.lib");

using namespace std;

#define BUF_SIZE 64;

int main(int argc, char const *argv[])
{
	cout << "Progress Server Test" << endl;

	/**
	 * 定义对象
	 */
	WSADATA wsd;
	SOCKET host;
	SOCKET client;
	SOCKADDR_IN serverIp;

	/**
	 * 容器
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
		return 1;
	}

	/**
	 * 创建套接字
	 */
	host = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (INVALID_SOCKET == host)
	{
		cout << "1创建套接字失败" << endl;
		WSACleanup();
		return -1;
	}

	/**
	 * 地址和端口
	 */
	serverIp.sin_family = AF_INET;
	serverIp.sin_addr.s_addr = INADDR_ANY;
	serverIp.sin_port = htons(8080);
	
	/**
	 * 绑定套接字
	 */
	int errcode = bind(host, (LPSOCKADDR)&serverIp, sizeof(serverIp));
	if (SOCKET_ERROR == errcode)
	{
		cout << "2绑定套接字失败" << endl;
		closesocket(host);
		WSACleanup();
		return -1;
	}

	/** 
	 * 开始监听
	 */
	errcode = listen(host, 1);
	if (SOCKET_ERROR == errcode)
	{
		cout << "3监听失败" << endl;
		closesocket(host);
		WSACleanup();
		return -1;
	}

	/**
	 * 接收客户端请求
	 */
	SOCKADDR_IN clientIp;
	int clientIpLen = sizeof(clientIp);
	client = accept(host, (sockaddr FAR*)&clientIp, &clientIpLen);
	if (INVALID_SOCKET == client)
	{
		cout << "4接收客户端请求失败" << endl;
		closesocket(host);
		WSACleanup();
		return - 1;
	}

	while(1) {
		/**
		 * 接收客户端的数据
		 */
		ZeroMemory(buffer, size);
		errcode = recv(client, buffer, size, 0);
		if (SOCKET_ERROR == errcode)
		{
			cout << "5接收数据失败" << endl;
			closesocket(host);
			closesocket(client);
			WSACleanup();
			return -1;
		}

		if (buffer[0] == '\0')
			break;
		
		cout << "client data is : " << buffer << endl;

		/**
		 * 服务器发送数据到客户端
		 */
		cout << "server putin : ";
		cin >> buffer2;
		send(client, buffer2, sizeof(buffer2), 0);
	}

	/**
	 * 退出
	 */
	closesocket(host);
	closesocket(client);
	WSACleanup();
	
	
	return 0;
}