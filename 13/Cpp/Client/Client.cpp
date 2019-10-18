#include <WinSock2.h>
#include <WS2tcpip.h>
#include <iostream>

int main()
{
	WSADATA wsaData;
	SOCKET client = INVALID_SOCKET;
	try
	{
		if (WSAStartup(0x202, &wsaData) == SOCKET_ERROR)
			throw std::exception("Init error");

		if ((client = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == INVALID_SOCKET)
			throw std::exception("Socket creation error");

		SOCKADDR_IN remoteAddress;
		remoteAddress.sin_family = AF_INET;
		remoteAddress.sin_port = htons(40000);
		inet_pton(AF_INET, "127.0.0.1", &remoteAddress.sin_addr);

		if (connect(client, (SOCKADDR*)&remoteAddress, sizeof(remoteAddress)) == SOCKET_ERROR)
			throw std::exception("Connecting error");

		const char buf[] = "TEST";
		send(client, "TEST", strlen(buf), 0);
		char recved[1024] = { 0 };
		recv(client, recved, sizeof(recved), 0);

		std::cout << recved << std::endl;

		closesocket(client);
	}
	catch (const std::exception & e)
	{
		std::cerr << e.what();
	}

	WSACleanup();
}
