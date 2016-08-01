#include <iostream>
#include <string.h>

using namespace std;

class Base
{
	/*
	*1.public:成员与成员函数---子类成员与成员函数、对象都可访问
	*2.protected:成员与成员函数---子类成员与成员函数可访问
	*3.private:成员与成员函数---子类无权过问
	*/
protected:
	double _x;
	double _y;
public:
	Base();
	Base(double x,double y);
	~Base();
public:
	void basePrint();
	//父类实现三个虚函数
	virtual void virFunc();
	virtual void virFunc1();
	virtual void virFunc2();
};
Base::Base(){
	_x = 0;
	_y = 0;
	cout<<"base defaule function"<<endl;
}
Base::Base(double x,double y){
	_x = x;
	_y = y;
	cout<<"base define function"<<endl;
}
Base::~Base(){
	cout<<"base des function"<<endl;
}
void Base::basePrint(){
	cout<<"_x:"<<_x<<endl;
	cout<<"_y:"<<_y<<endl;
}
void Base::virFunc(){
	cout<<"base virFunc"<<endl;
}
void Base::virFunc1(){
	cout<<"base virFunc1"<<endl;
}
void Base::virFunc2(){
	cout<<"base virFunc2"<<endl;
}

class Divese : public Base
{
	double _i;
	double _j;
public:
	Divese();
	Divese(double x,double y,double i,double j);
	~Divese();
public:
	void divesePrint();
	//重写父类虚函数
	void virFunc();
	void virFunc1();
	void virFunc2();
};
Divese::Divese(){
	_i = 0;
	_j = 0;
	cout<<"divese defaule function"<<endl;
}
Divese::Divese(double x,double y,double i,double j):Base(x,y){
	_i = i;
	_j = j;
	cout<<"divese define function"<<endl;
}
/*
*1.子类先析构
*2.先调用完子类析构后再调用父类析构
*/
Divese::~Divese(){
	cout<<"divese des function"<<endl;
}
void Divese::divesePrint(){
	cout<<"_x:"<<_x<<endl;
	cout<<"_y:"<<_y<<endl;
	cout<<"_i:"<<_i<<endl;
	cout<<"_j:"<<_j<<endl;
}
void Divese::virFunc(){
	cout<<"divese virFunc"<<endl;
}
void Divese::virFunc1(){
	cout<<"divese virFunc1"<<endl;
}
void Divese::virFunc2(){
	cout<<"divese virFunc2"<<endl;
}
int main(int argc, char const *argv[])
{
	cout<<"cao"<<endl;
	int a = a + 2;
	while(a < 10) {
		cout<< "cao" << endl;
		a = 10;
	}
	cout<<"--------------------hello world------------------------0\n";
	/*
	Base base;
	base.basePrint();
	Base base1(2,3);
	base1.basePrint();
	Base* b = new Base();
	b->basePrint();
	Base* b1 = new Base(10,20);
	b1->basePrint();
	*/
	cout<<"-------------------------------------------------------1\n";
	/*
	Divese divese;
	divese.divesePrint();
	Divese divese1(100,200,300,400);
	divese1.divesePrint();
	Divese* d = new Divese();
	d->divesePrint();
	Divese* d1 = new Divese(500,600,700,800);
	d1->divesePrint();
	*/
	cout<<"-------------------------------------------------------2\n";
	/*
	*(实现多态)
	*1.父类的指针指向子类的对象
	*2.如果没有虚函数----无法实现多态
	*/
	Base b;
	b.virFunc();
	b.virFunc1();
	b.virFunc2();
	b.basePrint();
	cout<<"--------------------------------------------------------3\n";
	Divese d;
	d.virFunc();
	d.virFunc1();
	d.virFunc2();
	d.divesePrint();
	cout<<"--------------------------------------------------------4\n";
	Base* pB=&d;//指向谁调用谁
	//Base*pB=&b;
	pB->virFunc();
	pB->virFunc1();
	pB->virFunc2();
	cout<<"--------------------------------------------------------5\n";
	Base* pB1 = new Divese();//一个父类的指针指向一个子类的对象(实现多态)
	pB1->virFunc();
	pB1->virFunc1();
	pB1->virFunc2();
	pB1->basePrint();//用父类的指针调用父类的成员方法(非virtual)//---可行
	//pB1->divesePrint();//用父类的指针调用子类的成员方法(非virtual)//---不可行
	cout<<"--------------------------------------------------------6\n";
	Base* pB2 = new Base();
	pB2->virFunc();
	pB2->virFunc1();
	pB2->virFunc2();
	pB2->basePrint();//调用父类的成员方法(非virtual)//---可行
	//pB2->divesePrint()//调用子类的成员方法(非virtual)//---不可行,父类没有这个方法
	cout<<"--------------------------------------------------------T\n";
	cout<<"base 虚函数表地址:"<<(int*)(&b)<<endl;
	cout<<"base 虚函数表---第一个虚函数地址:"<<(int*)*(int*)(&b)<<endl;
	cout<<"--------------------------------------------------------T\n";
	//手动释放指针
	delete pB;
	delete pB1;
	delete pB2;
	cout<<"--------------------------------------------------------\n";
	return 0;
}