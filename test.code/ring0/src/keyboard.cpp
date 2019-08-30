
#include "keyboard.h"
// #include "kbring0.h"

Keyboard::Keyboard() {

	_kbring0 = new KBRing0();

	std::string numkeys[] = {"0","1","2","3","4","5","6","7","8","9"};
	std::string lowzkeys[] = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
    std::string otherkeys[] = {"Tab","Enter","Shift","Ctrl","Alt","Pause","CapsLock","Esc","Space"};

	int numcodes[] = {48,49,50,51,52,53,54,55,56,57};
	int lowzcodes[] = {65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90};
	int othercodes[] = {9,13,16,17,18,19,20,27,32};

	for (int i = 0; i < 10; ++i)
	{
		_keys.insert(std::pair<std::string, int>(numkeys[i], numcodes[i]));
	}
	for (int i = 0; i < 26; ++i)
	{
		_keys[lowzkeys[i]] = lowzcodes[i];
	}
	for (int i = 0; i < 9; ++i)
	{
		_keys[otherkeys[i]] = othercodes[i];
	}

	std::map<std::string, int>::iterator iter;
	for(iter = _keys.begin(); iter != _keys.end(); iter++) {
		std::cout << iter->first.c_str() << "----" << iter->second << std::endl;
	}
};

void Keyboard::KeyPress(char* keyChar) {
	keyDown(keyChar);
	keyUp(keyChar);
};
void Keyboard::KeyPressWithShift(char* keyChar) {
	keyDown("Shift");
	keyDown(keyChar);
	keyUp(keyChar);
	keyUp("Shift");
};

void Keyboard::KBCWait4IBE() {

	int val = -1;
	do {
		void* ptr = malloc(8);
		val = _kbring0 -> readPort(0x64, ptr);
		printf("val: %d\n", val);
		if (val < 0)
		{
			std::cout << "readPort error: " << val << std::endl;
		}
	} while((2 & val) > 0);
};
int Keyboard::getCodeByKeyChar(std::string key) {
	// printf("-----------getCodeByKeyChar-----: %s\n", key.c_str());
	std::map<std::string, int>::iterator iter = _keys.find(key);
	if (iter == _keys.end())
	{
		printf("not find keycode: %s\n", key.c_str());
		return 0;
	}
	return iter -> second;
};
void Keyboard::keyDown(char* keyChar) {
	// printf("--------keyDown: %s\n", keyChar);
	std::string key(keyChar);
	int vCode = getCodeByKeyChar(key);
	if (vCode == 0)
	{
		std::cout << "key down vCode error\n";
		return;
	}
	int scanCode = virtualCodeToScanCode(vCode);
	if (scanCode == 0)
	{
		std::cout << "key down scanCode error\n";
		return;
	}
	KBCWait4IBE();
	_kbring0 -> writePort(100, 210);
	// _kbring0 -> writePort(0X60, 0xD2);

	KBCWait4IBE();
	_kbring0 -> writePort(96, (BYTE)scanCode);
	// _kbring0 -> writePort(0X60, scanCode);
};
void Keyboard::keyUp(char* keyChar) {
	// printf("=============keyUp: %s\n", keyChar);
	std::string key(keyChar);
	int vCode = getCodeByKeyChar(key);
	if (vCode == 0)
	{
		std::cout << "key up vCode error\n";
		return;
	}
	int scanCode = virtualCodeToScanCode(vCode);
	if (scanCode == 0)
	{
		std::cout << "key up scanCode error\n";
		return;
	}
	std::cout << "vCode: " << vCode << " ---- scanCode: " << scanCode << std::endl;
	KBCWait4IBE();
	_kbring0 -> writePort(100, 210);
	// _kbring0 -> writePort(0X60, 0xD2);

	KBCWait4IBE();
	_kbring0 -> writePort(96, (BYTE)scanCode || 128);
	// _kbring0 -> writePort(0X60, scanCode);
};

int Keyboard::virtualCodeToScanCode(int vcode) {
	if (_kbring0 != NULL)
	{
		return _kbring0 -> virtualKey(vcode, 0);
	}
	std::cout << "vcode to scan code error\n";
	return 0;
};

int Keyboard::GetDllStatus() {
	if (_kbring0 != NULL)
	{
		return _kbring0 -> dllStatus();
	}
	return 0;
};
void Keyboard::InitializeOls() {
	if (_kbring0 != NULL)
	{
		bool b = _kbring0 -> initOls();
		std::cout << "b: " << b << std::endl;
	}
};
void Keyboard::DeinitializeOls() {
	if (_kbring0 != NULL)
	{
		_kbring0 -> deInitOls();
	}
};

Keyboard::~Keyboard() {
	std::cout << "destroy ~Keyboard\n";
	DeinitializeOls();
	delete _kbring0;
	_kbring0 = NULL;
};
