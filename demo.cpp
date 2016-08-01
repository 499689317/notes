


#include <iostream>
#include <string.h>

using namespace std;

class Demo
{
	char* _pC;
	double _sum;
public:
	Demo();
	Demo(const char* str,double sum);
	~Demo();
public:
	void demoPrint();
public:
	/*
	*1.<<符号的重载返回值为ostream类型
	*2.传递俩个参数
	*/
	friend ostream& operator<<(ostream& out,const Demo& demo);
};
Demo::Demo(){
	_pC = new char[1];
	strcpy(_pC,"");
	_sum = 0;
	cout<<"demo defaule function"<<endl;
}
Demo::Demo(const char* str,double sum){
	_pC = new char[100];
	strcpy(_pC,str);
	_sum = sum;
}
Demo::~Demo(){
	delete _pC;
	cout<<"demo des function"<<endl;
}
void Demo::demoPrint(){
	cout<<"_pC with print:"<<_pC<<endl;
	cout<<"_sum with print:"<<_sum<<endl;
}
ostream& operator<<(ostream& out,const Demo& demo){
	out<<"_pC:"<<demo._pC<<endl;
	out<<"_sum:"<<demo._sum<<endl;

	return out;
}

int main(int argc, char const *argv[])
{
	cout<<"---------------hello world------------------\n";
	//demo
	Demo d;
	d.demoPrint();
	cout<<d;     //直接调用<<符号的重载
	cout<<"--------------------------------------------\n";
	Demo d1("I Love You",1314);
	d1.demoPrint();
	cout<<d1;
	cout<<"--------------------------------------------\n";
	return 0;
}