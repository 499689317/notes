; CLW file contains information for the MFC ClassWizard

[General Info]
Version=1
LastClass=CMyBrowserExView
LastTemplate=CDialog
NewFileInclude1=#include "stdafx.h"
NewFileInclude2=#include "MyBrowserEx.h"
LastPage=0

ClassCount=6
Class1=CMyBrowserExApp
Class2=CMyBrowserExDoc
Class3=CMyBrowserExView
Class4=CMainFrame

ResourceCount=3
Resource1=IDD_ABOUTBOX
Resource2=IDR_MAINFRAME
Class5=CAboutDlg
Class6=CProxyDlg
Resource3=IDD_DIALOG1

[CLS:CMyBrowserExApp]
Type=0
HeaderFile=MyBrowserEx.h
ImplementationFile=MyBrowserEx.cpp
Filter=N

[CLS:CMyBrowserExDoc]
Type=0
HeaderFile=MyBrowserExDoc.h
ImplementationFile=MyBrowserExDoc.cpp
Filter=N

[CLS:CMyBrowserExView]
Type=0
HeaderFile=MyBrowserExView.h
ImplementationFile=MyBrowserExView.cpp
Filter=C
BaseClass=CEditView
VirtualFilter=VWC
LastObject=ID_HOST


[CLS:CMainFrame]
Type=0
HeaderFile=MainFrm.h
ImplementationFile=MainFrm.cpp
Filter=T




[CLS:CAboutDlg]
Type=0
HeaderFile=MyBrowserEx.cpp
ImplementationFile=MyBrowserEx.cpp
Filter=D
LastObject=CAboutDlg

[DLG:IDD_ABOUTBOX]
Type=1
Class=CAboutDlg
ControlCount=4
Control1=IDC_STATIC,static,1342177283
Control2=IDC_STATIC,static,1342308480
Control3=IDC_STATIC,static,1342308352
Control4=IDOK,button,1342373889

[MNU:IDR_MAINFRAME]
Type=1
Class=CMainFrame
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_SAVE
Command4=ID_FILE_SAVE_AS
Command5=ID_FILE_PRINT
Command6=ID_FILE_PRINT_PREVIEW
Command7=ID_FILE_PRINT_SETUP
Command8=ID_FILE_MRU_FILE1
Command9=ID_APP_EXIT
Command10=ID_EDIT_UNDO
Command11=ID_EDIT_CUT
Command12=ID_EDIT_COPY
Command13=ID_EDIT_PASTE
Command14=ID_VIEW_TOOLBAR
Command15=ID_VIEW_STATUS_BAR
Command16=ID_DEFAULT
Command17=ID_PROXY
Command18=ID_HOST
Command19=ID_APP_ABOUT
CommandCount=19

[ACL:IDR_MAINFRAME]
Type=1
Class=CMainFrame
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_SAVE
Command4=ID_FILE_PRINT
Command5=ID_EDIT_UNDO
Command6=ID_EDIT_CUT
Command7=ID_EDIT_COPY
Command8=ID_EDIT_PASTE
Command9=ID_EDIT_UNDO
Command10=ID_EDIT_CUT
Command11=ID_EDIT_COPY
Command12=ID_EDIT_PASTE
Command13=ID_NEXT_PANE
Command14=ID_PREV_PANE
CommandCount=14

[TB:IDR_MAINFRAME]
Type=1
Class=?
Command1=ID_FILE_NEW
Command2=ID_FILE_OPEN
Command3=ID_FILE_SAVE
Command4=ID_EDIT_CUT
Command5=ID_EDIT_COPY
Command6=ID_EDIT_PASTE
Command7=ID_FILE_PRINT
Command8=ID_APP_ABOUT
CommandCount=8

[DLG:IDD_DIALOG1]
Type=1
Class=CProxyDlg
ControlCount=4
Control1=IDOK,button,1342242817
Control2=IDCANCEL,button,1342242816
Control3=IDC_STATIC,static,1342308352
Control4=IDC_PROXYNAME,edit,1350631552

[CLS:CProxyDlg]
Type=0
HeaderFile=ProxyDlg.h
ImplementationFile=ProxyDlg.cpp
BaseClass=CDialog
Filter=D
LastObject=IDC_PROXYNAME
VirtualFilter=dWC

