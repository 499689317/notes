#include <iostream>
#include <string.h>

using namespace std;
/*
*Point Class*/
class Point{
	int _x;
	int _y;
public:
	Point(){cout <<"defaule point function"<<endl;};
	//Point(int x = 0,int y = 0,int z = 0){cout<<"defaule function"<<endl;};
	Point(int x,int y):_x(x),_y(y){cout<<"define point function"<<endl;};
	~Point(){cout<<"point des function"<<endl;};
public:
	void setX(int tempX){
		_x = tempX;
	}
	int getX(){
		return _x;
	}
	void setY(int tempY){
		_y = tempY;
	}
	int getY(){
		return _y;
	}
};
/*
*Cirle Class*/
/*
*继承的方式不影响子类调用父类的权限
*但继承的方式会影响子类对象调用父类成员的权限
*private继承：子类对象不能直接调用父类的所有成员
*public继承：子类对象可以直接调用父类的public成员
*protect继承：只局限与子类成员与成员方法对父类成员与成员方法的调用
*/
class Cirle : public Point
{
	double _r;
public:
	Cirle();
	Cirle(int x,int y,double r):Point(x,y),_r(r){cout<<"define cirle function"<<endl;};
	~Cirle();
public:
	void print();
};
//如果没有显示调用父类的构造函数初始化父类，系统将默认调用父类的默认构造
Cirle::Cirle():Point(0,0){
	_r = 0;
	cout<<"defaule cirle function"<<endl;
}
Cirle::~Cirle(){
	cout<<"cirle des function"<<endl;
}
void Cirle::print(){
	// cout<<"_x:"<<_x<<endl; //父类的private成员不能在子类调用
	// cout<<"_y:"<<_y<<endl; //父类的私有成员不能在子类调用
	cout<<"getX:"<<getX()<<endl;//子类的成员与成员方法只能调用父类的public成员与protect成员
	cout<<"getY:"<<getY()<<endl;
	cout<<"_r:"<<_r<<endl;
}
/*
*String Class*/
class String
{
	int len;
	char* rep;
public:
	String();                   //默认构造
	String(const char* p);      //自定义构造
	String(const String& str);  //拷贝构造
	~String(){delete[]rep;cout<<"str des function"<<endl;};
public:
	//判断是否越界
	char& at(int index);                     //非const版本
	const char& at(int index)const;          //const版本
	String& operator=(const String& str);    //赋值符号的重载，生成一个新的字符串
	String& operator+=(const String& str);   //拼接字符串重载,在原来的字符串拼接
	/*
	*用成员方式重载运算符
	*不能改变参数的个数
	*二元运算符用成员重载时
	*只需要一个参数
	*另一个参数由this指针传入
	*如果需要两个参数
	*那么可以在类外面定义
	*然后在类里声明为友元
	*/
	friend String operator+(const String& str,const String& ostr);
	friend bool operator==(const String& str,const String& ostr);//全等符号重载(判断俩个字符串是否相等)
	friend bool operator<(const String& str,const String& ostr);
	//下标符号的重载
	char& operator[](int index);             //非const版本
	const char& operator[](int index)const;  //const版本
	void print();
};

String::String(){
	rep = new char[1];
	strcpy(rep,"");
	len = 0;
}
String::String(const char* p){
	if (p)
	{
		len = strlen(p);
		rep = new char[len + 1];
		strcpy(rep,p);
	}
	else
	{
		rep = new char[1];
		strcpy(rep,"");
		len = 1;
	}
}
String::String(const String& str){

	len = str.len;
	rep = new char[len + 1];
	strcpy(rep,str.rep);

}/**/
char& String::at(int index){
	if (index >= len || index < 0)
	{
		// throw("数组越界");
		cout<<"数组越界"<<endl;
	}
	return rep[index];
}
const char& String::at(int index)const{
	if (index >= len || index < 0)
	{
		// throw("数组越界");
		cout<<"数组越界"<<endl;
	}
	return rep[index];
}
//赋值符号的重载
String& String::operator=(const String& str){
	//判断是否为自赋值
	if (this != &str)
	{
		len = str.len;
		//删除旧空间
		delete[]rep;
		//申请新空间
		rep = new char[len + 1];
		strcpy(rep,str.rep);
	}
	return *this;
}
String& String::operator+=(const String& str){
	//申请一个临时指针
	char* tempp = rep;
	len = len + str.len;
	//申请新空间
	delete[]rep;
	rep = new char[len + 1];
	strcpy(rep,tempp);
	strcat(rep,str.rep);
	//删除临时空间
	delete[]tempp;

	return *this;
}
//实现友元方法(参数有俩个)
String operator+(const String& str,const String& ostr){
	int i = str.len + ostr.len;
	char* tempp = new char[i + 1];
	strcpy(tempp,str.rep);
	strcat(tempp,ostr.rep);
	String s(tempp);
	delete[]tempp;

	return s;
}
bool operator==(const String& str,const String& ostr){
	if (strcmp(str.rep,ostr.rep) == 0)
	{
		return true;
	}
	return false;
}
bool operator<(const String& str,const String& ostr){
	if (strcmp(str.rep,ostr.rep) < 0)
	{
		return true;
	}
	return false;
}
//实现下标符号的重载
char& String::operator[](int index){
	return rep[index];
}
const char& String::operator[](int index)const{
	return rep[index];
}
void String::print(){
	cout <<"string:"<<this->rep<<endl;
}

int main(){
	cout<<"-----------------hello world---------------\n"<<endl;
	/*
	//声明一个Point对象
	Point q;//调用默认构造函数
	Point p(0,10);//调用自定义构造
	int a = 0;
	int b = 0;
	a = p.getX();
	b = p.getY();
	cout << "a:" << a << "b:" << b << endl;
	p.setX(10);
	p.setY(100);
	a = p.getX();
	b = p.getY();
	cout << "a1:" << a << "b1:" << b << endl;
	*/
	cout<<"-------------------------------------------\n";
	/*
	//String s1="i am string";   //将字符串转换为对象
	String s1("i love you");     //将字符串转换为对象
	String s2 = s1;              //调用赋值符号的重载
	
	cout<<"s1 addr:"<<&s1<<"---"<<"s2 addr:"<<&s2<<endl;
	s1.print();
	s2.print();
	String s3 = s1 + s2;         //调用+符号的重载
	cout<<"s3 addr:"<<&s3<<endl;
	if (s1 == s2)                //调用==符号的重载
	{
		cout<<"==符号的重载"<<endl;
	}
	if (s2 < s3)                 //调用<符号的重载
	{
		cout<<"<符号的重载"<<endl;
	}
	s3.print();
	cout<<"at函数判断越界："<<s1.at(100)<<endl;
	cout<<"[]下标符号的重载："<<s1[2]<<endl;           //调用[]下标符号的重载*/
	cout<<"-------------------------------------------\n";
	Cirle c;
	c.print();
	c.getY();
	Cirle c1(10,20,30);
	c1.print();
	cout<<"-------------------------------------------\n";

	return 0;
}