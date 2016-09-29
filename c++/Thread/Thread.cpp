
#include <iostream>
#include <pthread.h>
#include <vector>

#pragma comment(lib,"pthreadVC2.lib");
using namespace std;


struct Point
{
	private:
		int _x;
		int _y;
	public:
		int getX() {
			return _x;
		};
		int getY() {
			return _y;
		};
};

std::vector<Point *> v;
pthread_mutex_t nutex;

void* Thread1(void* arg) {
	// Sleep(1000L);
	cout << "Thread 1\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		Point *p = new Point();
		v.push_back(p);
		cout << "Thread1 : " << v.size() << endl;
		pthread_mutex_unlock(&nutex);
	}
}
void* Thread2(void* arg) {
	// Sleep(1000L);
	cout << "Thread 2\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		Point *p = new Point();
		v.push_back(p);
		cout << "Thread2 : " << v.size() << endl;
		pthread_mutex_unlock(&nutex);
	}
}
void* Thread3(void* arg) {
	// Sleep(1000L);
	cout << "Thread 3\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		Point *p = new Point();
		v.push_back(p);
		cout << "Thread3 : " << v.size() << endl;
		pthread_mutex_unlock(&nutex);
	}
}
void* Thread4(void* arg) {
	// Sleep(1000L);
	cout << "Thread 4\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		if (v.size() > 0)
		{
			v.pop_back();
			cout << "Thread4 : " << v.size() << endl;
		}
		pthread_mutex_unlock(&nutex);
	}
}
void* Thread5(void* arg) {
	// Sleep(1000L);
	cout << "Thread 5\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		if (v.size() > 0)
		{
			v.pop_back();
			cout << "Thread5 : " << v.size() << endl;
		}
		pthread_mutex_unlock(&nutex);
	}
}
void* Thread6(void* arg) {
	// Sleep(1000L);
	cout << "Thread 6\n" << endl;
	while(1) {
		pthread_mutex_lock(&nutex);
		if (v.size() > 0)
		{
			v.pop_back();
			cout << "Thread6 : " << v.size() << endl;
		}
		pthread_mutex_unlock(&nutex);
	}
}

int main(int argc, char const *argv[])
{
	cout << "Test Main Thread" << endl;

	/**
	 * 初始化互斥锁对象
	 */
	// pthread_mutex_t nutex;
	pthread_mutex_init(&nutex,NULL);

	/**
	 * 开辟6个线程
	 */
	pthread_t t1;
	pthread_t t2;
	pthread_t t3;
	pthread_t t4;
	pthread_t t5;
	pthread_t t6;
	pthread_create(&t1,NULL,Thread1,NULL);
	pthread_create(&t2,NULL,Thread2,NULL);
	pthread_create(&t3,NULL,Thread3,NULL);
	pthread_create(&t4,NULL,Thread4,NULL);
	pthread_create(&t5,NULL,Thread5,NULL);
	pthread_create(&t6,NULL,Thread6,NULL);

	pthread_join(t1,NULL);
	pthread_join(t2,NULL);
	pthread_join(t3,NULL);
	pthread_join(t4,NULL);
	pthread_join(t5,NULL);
	pthread_join(t6,NULL);
	return 0;
}