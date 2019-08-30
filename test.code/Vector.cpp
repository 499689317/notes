
#include <iostream>
#include <vector>
#include <string.h>
#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

using namespace std;

// 只能精确到秒
int getNowTiem() 
{
	time_t now_time;
	now_time = time(NULL);
	return now_time;
}

int main(int argc, char const *argv[])
{
	cout << "********Vector Test*********" << endl;
	vector<int> v;
	// vector<int>::iterator it = v.begin();


	/**
	 * 写入数据
	 */
	// DWORD now_time = GetTickCount();
	for (int i = 0; i < 100000000; ++i)
	{
		v.push_back(i);
	}
	// DWORD now_time2 = GetTickCount();
	// cout << "写入耗时:" << (now_time2 - now_time) << endl;

	/**
	 * 方式1
	 */
	// DWORD now_time = GetTickCount();
	// for (int i = 0; i < v.size(); i++)
	// {
	// 	int n = v[i];
	// 	// cout << n << endl;
	// }
	// DWORD now_time2 = GetTickCount();
	// cout << "方式1耗时:" << (now_time2 - now_time) << endl;
	

	/**
	 * 方式2
	 */
	DWORD now_time = GetTickCount();
	for (int i : v)
	{
		int n = i;
		// cout << n << endl;
	}
	DWORD now_time2 = GetTickCount();
	cout << "方式2耗时:" << (now_time2 - now_time) << endl;

	return 0
;}