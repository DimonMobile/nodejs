#include <iostream>
#include <WinSock2.h>

int main()
{
	WSADATA wsaData;
	SOCKET server = INVALID_SOCKET;
	try
	{
		if (WSAStartup(0x202, &wsaData) == SOCKET_ERROR)
			throw std::exception("Init error");

		if ((server = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == INVALID_SOCKET)
			throw std::exception("Socket creation error");

		SOCKADDR_IN localAddress;
		localAddress.sin_family = AF_INET;
		localAddress.sin_port = htons(40000);
		localAddress.sin_addr.S_un.S_addr = INADDR_ANY;

		if (bind(server, (SOCKADDR*)&localAddress, sizeof(localAddress)) == SOCKET_ERROR)
			throw std::exception("Binding error");

		while (1)
		{
			if (listen(server, SOMAXCONN) == SOCKET_ERROR)
				throw std::exception("Listening error");

			SOCKADDR_IN remoteAddress;
			int remoteAddrLen = sizeof(remoteAddress);
			SOCKET remoteSocket = INVALID_SOCKET;
			if ((remoteSocket = accept(server, (SOCKADDR*)&remoteAddress, &remoteAddrLen)) == INVALID_SOCKET)
				throw std::exception("Acceptance error");

			char buf[1024];
			int recievedLen = recv(remoteSocket, buf, 1024, 0);
			if (recievedLen == 0)
				break;
			buf[recievedLen] = '\0';

			char newStr[1024] = { 0 };
			strcpy_s(newStr, "ECHO: ");
			strcat_s(newStr, buf);
			send(remoteSocket, newStr, strlen(newStr), 0);

			closesocket(remoteSocket);
		}
	}
	catch (const std::exception & e)
	{
		std::cerr << e.what() << std::endl;
	}
	closesocket(server);
	WSACleanup();
}