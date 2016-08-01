// Login.cpp : implementation file
//

#include "stdafx.h"
#include "chatclient.h"
#include "Login.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#undef THIS_FILE
static char THIS_FILE[] = __FILE__;
#endif

/////////////////////////////////////////////////////////////////////////////
// CLogin dialog


CLogin::CLogin(CWnd* pParent /*=NULL*/)
	: CDialog(CLogin::IDD, pParent)
{
	//{{AFX_DATA_INIT(CLogin)
	m_strImage = _T("1");
	m_strName = _T("ΙΫηχ");
	m_strServerIP = _T("10.22.73.21");
	//}}AFX_DATA_INIT
}


void CLogin::DoDataExchange(CDataExchange* pDX)
{
	CDialog::DoDataExchange(pDX);
	//{{AFX_DATA_MAP(CLogin)
	DDX_CBString(pDX, IDC_IMAGE, m_strImage);
	DDX_CBString(pDX, IDC_NAME, m_strName);
	DDX_Text(pDX, IDC_SERVER, m_strServerIP);
	//}}AFX_DATA_MAP
}


BEGIN_MESSAGE_MAP(CLogin, CDialog)
	//{{AFX_MSG_MAP(CLogin)
		// NOTE: the ClassWizard will add message map macros here
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()

/////////////////////////////////////////////////////////////////////////////
// CLogin message handlers
void CLogin::OnCancel()
{
	CDialog::OnCancel();
}
void CLogin::OnOK()
{
	CDialog::OnOK();
}
