// MainFrm.cpp : implementation of the CMainFrame class
//

#include "stdafx.h"
#include "MyBrowser.h"

#include "MainFrm.h"
#include <afxinet.h>
#include "MyBrowserView.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#undef THIS_FILE
static char THIS_FILE[] = __FILE__;
#endif

/////////////////////////////////////////////////////////////////////////////
// CMainFrame

IMPLEMENT_DYNCREATE(CMainFrame, CFrameWnd)

BEGIN_MESSAGE_MAP(CMainFrame, CFrameWnd)
	//{{AFX_MSG_MAP(CMainFrame)
		// NOTE - the ClassWizard will add and remove mapping macros here.
		//    DO NOT EDIT what you see in these blocks of generated code !
	ON_WM_CREATE()
	//}}AFX_MSG_MAP
	ON_CBN_SELENDOK(ID_COMBO,OnNewAddress)
	ON_COMMAND(IDOK,OnNewAddressEnter)
END_MESSAGE_MAP()

static UINT indicators[] =
{
	ID_SEPARATOR,           // status line indicator
	ID_INDICATOR_CAPS,
	ID_INDICATOR_NUM,
	ID_INDICATOR_SCRL,
};

/////////////////////////////////////////////////////////////////////////////
// CMainFrame construction/destruction

CMainFrame::CMainFrame()
{
	// TODO: add member initialization code here
	
}

CMainFrame::~CMainFrame()
{
}

int CMainFrame::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if (CFrameWnd::OnCreate(lpCreateStruct) == -1)
		return -1;
	
	if (!m_wndRebar.Create(this))      
	{
		TRACE0("Failed to create combobox\n");
		return -1;      // fail to create
	}

	if (!m_wndAddress.Create(CBS_DROPDOWN | WS_CHILD, 
     CRect(0, 0, 200, 120), this, ID_COMBO))  //����һ������Ͽ�
	{
		TRACE0("Failed to create combobox\n");
		return -1;      // fail to create
	}

	m_wndRebar.AddBar(&m_wndAddress,"��ַ��"); 
    //����Ͽ���ӵ�Rebar�У���Ͽ�ı���Ϊ"��ַ"


	if (!m_wndStatusBar.Create(this) ||
		!m_wndStatusBar.SetIndicators(indicators,
		  sizeof(indicators)/sizeof(UINT)))
	{
		TRACE0("Failed to create status bar\n");
		return -1;      // fail to create
	}

	// TODO: Delete these three lines if you don't want the toolbar to
	//  be dockable
	
	return 0;
}

BOOL CMainFrame::PreCreateWindow(CREATESTRUCT& cs)
{
	if( !CFrameWnd::PreCreateWindow(cs) )
		return FALSE;
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return TRUE;
}

/////////////////////////////////////////////////////////////////////////////
// CMainFrame diagnostics

#ifdef _DEBUG
void CMainFrame::AssertValid() const
{
	CFrameWnd::AssertValid();
}

void CMainFrame::Dump(CDumpContext& dc) const
{
	CFrameWnd::Dump(dc);
}

#endif //_DEBUG

/////////////////////////////////////////////////////////////////////////////
// CMainFrame message handlers

void CMainFrame::OnNewAddress()
{
	m_wndAddress.GetLBText(m_wndAddress.GetCurSel(), m_strAddress);
	Connect();
}

void CMainFrame::OnNewAddressEnter()
{
	m_wndAddress.GetEditCtrl()->GetWindowText(m_strAddress);
	
	COMBOBOXEXITEM item;
	item.mask = CBEIF_TEXT;
	item.iItem = -1;
	item.pszText = (LPTSTR)(LPCTSTR)m_strAddress;
	m_wndAddress.InsertItem(&item);
	Connect();
}


void CMainFrame::Connect()
{
	CInternetSession session(_T("My Browser"));
	CHttpConnection* pServer = NULL;
	CHttpFile* pFile = NULL;
	if(m_strAddress.Find("http://"))
	m_strAddress = "http://" + m_strAddress;
	m_strContent.Empty();
	try
	{
		CString strServer;
		CString strObject;
		INTERNET_PORT nPort;
		DWORD dwServiceType;
		
		if(!AfxParseURL(m_strAddress,dwServiceType,strServer,strObject,nPort)||
			dwServiceType != INTERNET_SERVICE_HTTP)
		{
			MessageBox(_T("����HTTPվ��"),_T("����"));
		}
		pServer = session.GetHttpConnection(strServer,nPort);

		pFile = pServer->OpenRequest(1,strObject,NULL,1,NULL,NULL,
                                     INTERNET_FLAG_EXISTING_CONNECT | INTERNET_FLAG_NO_AUTO_REDIRECT );
		pFile->AddRequestHeaders(_T("My Browser"));
		pFile->SendRequest();

		DWORD dwRet;
		pFile->QueryInfoStatusCode(dwRet);
		// ����������ܾ�������ʾ�û�ʹ������
		if (dwRet == HTTP_STATUS_DENIED)
		{
			DWORD dwPrompt;
			dwPrompt = pFile->ErrorDlg(NULL, ERROR_INTERNET_INCORRECT_PASSWORD,
				FLAGS_ERROR_UI_FLAGS_GENERATE_DATA | FLAGS_ERROR_UI_FLAGS_CHANGE_OPTIONS, NULL);

			// ����û�ȡ���˶Ի������˳�
			if (dwPrompt != ERROR_INTERNET_FORCE_RETRY)
			{
				MessageBox(_T("�������ܾ�,������Ч"),_T("����"));
			}

			pFile->SendRequest();
			pFile->QueryInfoStatusCode(dwRet);
		}

		CString strNewLocation;
		pFile->QueryInfo(HTTP_QUERY_RAW_HEADERS_CRLF, strNewLocation);

		// �Ƿ���Ҫ���¶���
		if (dwRet == HTTP_STATUS_MOVED ||
			dwRet == HTTP_STATUS_REDIRECT ||
			dwRet == HTTP_STATUS_REDIRECT_METHOD)
		{
			CString strNewLocation;
			pFile->QueryInfo(HTTP_QUERY_RAW_HEADERS_CRLF, strNewLocation);

			int nPlace = strNewLocation.Find(_T("Location: "));
			if (nPlace == -1)
			{
				MessageBox(_T("վ���ַ�ı�"),_T("����"));
			}

			strNewLocation = strNewLocation.Mid(nPlace + 10);
			nPlace = strNewLocation.Find('\n');
			if (nPlace > 0)
				strNewLocation = strNewLocation.Left(nPlace);

			//�ر��ض���վ��
			pFile->Close();
			delete pFile;
			pServer->Close();
			delete pServer;

			// ���ԭ����λ��
			if (!AfxParseURL(strNewLocation, dwServiceType, strServer, strObject, nPort))
			{
				MessageBox(_T("�ض����URL�޷�������"),_T("����"));
			}

			if (dwServiceType != INTERNET_SERVICE_HTTP)
			{
				MessageBox(_T("�ض����URL����һ��HTTP��Դ"),_T("����"));
			}

			// ������λ��
			pServer = session.GetHttpConnection(strServer, nPort);
			pFile = pServer->OpenRequest(1,strObject, NULL, 1, NULL, NULL,
				 				  INTERNET_FLAG_EXISTING_CONNECT | INTERNET_FLAG_NO_AUTO_REDIRECT);
			pFile->AddRequestHeaders(_T("MyBrowser"));
			pFile->SendRequest();

			pFile->QueryInfoStatusCode(dwRet);
			if (dwRet != HTTP_STATUS_OK)
			{
				MessageBox(_T("HTTP״̬����"),_T("����"));
			}
		}

		CString line;
		while(pFile->ReadString(line))
			m_strContent += line+"\r\n";
		
		pFile->Close();
		pServer->Close();
	}
	catch (CInternetException* pEx)
	{
		TCHAR szErr[1024];
		pEx->GetErrorMessage(szErr, 1024);
		MessageBox(szErr,_T("����"));
		pEx->Delete();
	}

	if (pFile != NULL)
		delete pFile;
	if (pServer != NULL)
		delete pServer;
	session.Close();
	
	CMyBrowserView* pView =(CMyBrowserView*)GetActiveView();	
	pView->SetWindowText(m_strContent);
}
