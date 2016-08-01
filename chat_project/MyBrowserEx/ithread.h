#ifndef __InternetThread_h__
#define __InternetThread_h__
#include <wininet.h>

// GetWebPageWorkerThreadde�ķ���ֵ
const UINT THREAD_GOOD = 0 ;
const UINT THREAD_BAD = 1 ;

// ���߳̽���ʱ���͵���Ϣ
#define WM_READFILECOMPLETED (WM_USER + 100)


// �����Internet�ж������ݵĹ����߳�
class CInternetThread
{
public:
   // Construction
   CInternetThread() ;
   ~CInternetThread() ;

   // ��ʼ������
   BOOL Init(HWND hPostMsgWnd) ;

   // �ڸı�������ͺ����³�ʼ��Internet����
   void ResetSession() ;

   // ��������HTML���ݵĻ�����
   void EmptyBuffer()
      { delete m_buffer ; m_buffer = NULL ; }
   BOOL IsBufferEmpty() 
      { return m_buffer == NULL;}
   char* GetBuffer()
      { return m_buffer ;}

   // �õ���������
   int GetAccessTypeIndex() ;
   void SetAccessTypeIndex(int index) ;

   // �õ������������
   CString& GetProxyServer() 
      {return m_strProxyServer; }
   void SetProxyServer(CString& strProxyServer) 
      { m_strProxyServer = strProxyServer; ResetSession() ;}

   // �õ��������ҳ
   void GetPage(CString& rAddress) ;

private:
   // �õ������߳�
   static UINT GetWebPageWorkerThread(LPVOID pvThread) ;

   UINT _GetPageWorker() ;

   CString m_strServer ;
   CString m_strPath ;   
   DWORD m_dwAccessType ;
   char* m_buffer ;
   HINTERNET m_hSession ;
   HWND m_hPostMsgWnd ;
public:
	CString m_strProxyServer ;
};

UINT GetWebPageWorkerThread(LPVOID pvThreadData);

#endif 
