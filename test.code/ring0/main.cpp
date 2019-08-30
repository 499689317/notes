
#include <node.h>
#include <iostream>

#include "./src/keyboard.h"

namespace main {

	using namespace std;
	using namespace v8;

	Keyboard* _keyboard = NULL;
	void InitKeyboard(const FunctionCallbackInfo<Value>& args) {
		if (_keyboard != NULL)
		{
			std::cout << "remalloc _keyboard instance\n";
			return;
		}
		_keyboard = new Keyboard();
		_keyboard -> InitializeOls();

		int status = _keyboard -> GetDllStatus();
		printf("dll status: %d\n", status);
	};
	void DestroyKeyboard(const FunctionCallbackInfo<Value>& args) {
		if (_keyboard != NULL)
		{
			delete _keyboard;
			_keyboard = NULL;
		}
	};
	void KeyPress(const FunctionCallbackInfo<Value>& args) {
		if (_keyboard != NULL)
		{
			if (args.Length() != 1)
			{
				printf("pram count error Length()%d\n", args.Length());
				return;
			}
			if (!args[0] -> IsString())
			{
				printf("pram type error IsString()\n");
				return;
			}
		    Local<String> keyChar = Local<String>::Cast(args[0]);
		    String::Utf8Value utfValue(keyChar);

			std::cout << "KeyPress keyChar: " << *utfValue << std::endl;

			_keyboard -> KeyPress(*utfValue);
			return;
		}
		std::cout << "_keyboard is NULL";
	};
	void KeyPressWithShift(const FunctionCallbackInfo<Value>& args) {
		if (_keyboard != NULL)
		{
			if (args.Length() != 1)
			{
				printf("pram count error Length()%d\n", args.Length());
				return;
			}
			if (!args[0] -> IsString())
			{
				printf("pram type error IsString()\n");
				return;
			}
		    Local<String> keyChar = Local<String>::Cast(args[0]);
		    String::Utf8Value utfValue(keyChar);

			std::cout << "KeyPressWithShift keyChar: " << *utfValue << std::endl;
			_keyboard -> KeyPressWithShift(*utfValue);
			return;
		}
		std::cout << "_keyboard is NULL";
	};

	void init(Local<Object> exports) {

		NODE_SET_METHOD(exports, "InitKeyboard", InitKeyboard);
		NODE_SET_METHOD(exports, "DestroyKeyboard", DestroyKeyboard);
	  	NODE_SET_METHOD(exports, "KeyPress", KeyPress);
	  	NODE_SET_METHOD(exports, "KeyPressWithShift", KeyPressWithShift);
	};

	NODE_MODULE(NODE_GYP_MODULE_NAME, init)
};