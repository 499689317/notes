


/*******c程序******/
#include <stdio.h>
//使用C语言模拟一个C++类
struct Point{
	double _x;
	double _y;
	double (* _px)(struct Point p);   //定义一个指向函数的指针,参数为结构体本身
	double (* _py)(struct Point p);
	void (* _pX)(double x,struct Point* p);  //定义一个指向函数的指针，带一个double类型参数，与一个结构体指针
	void (* _pY)(double y,struct Point& p);  //结构体传递一个引用
};
//实现相关方法
double getX(struct Point p){
	return p._x;
}
double getY(struct Point p){
	return p._y;
}
void setX(double x,struct Point* p){
	p->_x = x;
	printf("setX function:%p---",&p);
	printf("%f\n",p->_x);
}
void setY(double y,struct Point& p){
	p._y = y;
	printf("setY function:%p---",&p);
	printf("%f\n",p._y);
}

int main(){
	printf("------------------------------------------------hello world-------------------------------------------------\n");
	/*
	*乘法口决表*/
	/*
	int a = 0;
	int b = 0;
	int c = 0;
	printf("%d\n",a);
	printf("%p\n",a);
	printf("%d\n",b);
	printf("%p\n",b);
	for (int i = 0; i < 9; ++i)
	{
		a = i +1;
		for (int j = i; j < 9; ++j)
		{
			b = j + 1;
			c = a*b;
			printf((i == j) ? "\n" : "   ");
			printf("%d %s %d %s %d",a,"X",b,"=",c);
		}
		printf("\n");
		printf("---------------------------------------------------------------------------------------------------------\n");
	}*/
	/*
	*struct Point demo
	*/
	struct Point p1 = {0,0,getX,getY,setX,setY};
	printf("%f\n",p1._px(p1));
	printf("%f\n",p1._py(p1));
	p1._pX(0.1,&p1);  //传指针--修改对象本身的值
	p1._pY(0.1,p1);   //传引用--修改对象本身的值 //-----传值--只修改了一个临时副本
	printf("%f %p\n",p1._x,&p1);
	printf("%f %p\n",p1._y,&p1);
	printf("-------------------------------------------------------------------------------------------------------------\n");

	return 0;
}