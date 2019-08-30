
#include "kbring0.h"

KBRing0::KBRing0() {

	_winring0 = LoadLibrary("WinRing0x64.dll");
	if (_winring0 == NULL)
	{
		std::cout << "LoadLibrary WinRing0x64 dll error\n";
		FreeLibrary(_winring0);
	}
	_user32 = LoadLibrary("User32.dll");
	if (_user32 == NULL)
	{
		std::cout << "LoadLibrary User32 dll error\n";
		FreeLibrary(_user32);
	}

	std::cout << "_winring0: " << _winring0 << " ---- _user32: " << _user32 << std::endl;

	initOls = (InitOlsFunc)GetProcAddress(_winring0, "InitializeOls");
	if (initOls == NULL)
	{
		std::cout << "InitializeOls error\n";
	}
	deInitOls = (DeinitOlsFunc)GetProcAddress(_winring0, "DeinitializeOls");
	if (deInitOls == NULL)
	{
		std::cout << "DeinitializeOls error\n";
	}
	dllStatus = (DllStatusFunc)GetProcAddress(_winring0, "GetDllStatus");
	if (dllStatus == NULL)
	{
		std::cout << "GetDllStatus error\n";
	}
	writePort = (WritePortFunc)GetProcAddress(_winring0, "WriteIoPortByte");
	if (writePort == NULL)
	{
		std::cout << "WriteIoPortByte error\n";
	}
	readPort = (ReadPortFunc)GetProcAddress(_winring0, "ReadIoPortByteEx");
	if (readPort == NULL)
	{
		std::cout << "ReadIoPortByteEx error\n";
	}
	virtualKey = (VirtualKeyFunc)GetProcAddress(_user32, "MapVirtualKeyA");
	if (virtualKey == NULL)
	{
		std::cout << "MapVirtualKeyA error";
	}
};

KBRing0::~KBRing0() {
	std::cout << "destroy ~KBRing0\n";
	if (_winring0 != NULL)
	{
		FreeLibrary(_winring0);
		_winring0 = NULL;
	}
	if (_user32 != NULL)
	{
		FreeLibrary(_user32);
		_user32 = NULL;
	}
};