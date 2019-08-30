
#ifndef KEYBOARD_H
#define KEYBOARD_H

#include <map>
#include <iostream>
#include "kbring0.h"

// class KBRing0;

class Keyboard
{
public:
	Keyboard();
	virtual ~Keyboard();

	int GetDllStatus();
	void InitializeOls();
	void DeinitializeOls();
	void KeyPress(char* keyChar);
	void KeyPressWithShift(char* keyChar);
private:
	int getCodeByKeyChar(std::string key);
	void KBCWait4IBE();
	void keyDown(char* keyChar);
	void keyUp(char* keyChar);
	int virtualCodeToScanCode(int vcode);
	
	KBRing0* _kbring0;
	std::map<std::string, int> _keys;
};

#endif