#ifndef KB_RING0_H
#define KB_RING0_H

#include <windows.h>
#include "iostream"

/**
  * ------------------------代码执行GetDllStatus()状态码为非0时---------------------
  */

typedef int(*InitOlsFunc)(void);
typedef int(*DeinitOlsFunc)(void);
typedef int(*DllStatusFunc)(void);
typedef int(*WritePortFunc)(int, int);
typedef int(*ReadPortFunc)(int, void*);
typedef int(*VirtualKeyFunc)(int, int);

class KBRing0
{
public:
	KBRing0();
	virtual ~KBRing0();

	InitOlsFunc initOls = NULL;
	DeinitOlsFunc deInitOls = NULL;
	DllStatusFunc dllStatus = NULL;
	WritePortFunc writePort = NULL;
	ReadPortFunc readPort = NULL;
	VirtualKeyFunc virtualKey = NULL;
private:
	HINSTANCE _winring0 = NULL;
	HINSTANCE _user32 = NULL;
};
#endif