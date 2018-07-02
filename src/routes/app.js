/* global window */
/* global document */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Loader, MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import Error from './error'
import '../themes/index.less'
import './app.less'


const { Content, Footer, Sider } = Layout
const { Header, Bread, styles ,UseInfoModal,SpeechcraftModal,EditPwdModal,QuickSearchModal,Appointment,Calendar,Message} = MyLayout
const { prefix, openPages } = config

let lastHref

const App = ({
  children, dispatch, app, loading, location,
}) => {
  const {
    user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions,userInfoModalVisible,speechcraftModalVisible,
    editPwdModalVisible,QuickSearchModalVisible,choseItem,currentItem,searchTxt,defaultActiveKey
  } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
  const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  const { href } = window.location

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    searchTxt,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    openUserInfo(){
      dispatch({ type: 'app/openUserInfo' })
    },
    openSpeechcraftModal(){
      dispatch({ type: 'app/openSpeechcraftModal' })
    },
    openQuickSearchModal(){
      dispatch({ type: 'app/openQuickSearchModal' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
    onChangeSearch(value){
      dispatch({ type: 'app/onChangeSearchTxt',  payload: value, })
    }
  }

  const AppointmentProps={
    defaultActiveKey,
    changeActiveKeyFunc(key){
      dispatch({
        type: `app/changeActiveKey`,
        payload: key,
      })
    }
  }

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
    location,
  }

  const modalProps = {
    // item: modalType === 'create' ? {} : currentItem,
    visible: userInfoModalVisible,
    maskClosable: false,
    // confirmLoading: loading.effects[`user/${modalType}`],
    title: '个人信息',
    cancelText:'取消',
    okText:'保存',
    width:'35%',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `app/saveUseInfo`,
        payload: data,
      })
        .then(() => {

        })
    },
    onCancel () {
      dispatch({
        type: 'app/hideUseInfo',
      })
    },
    openEditPwdModalFunc(){
      dispatch({
        type: 'app/openEditPwdModal',
      })
    }

  }

  const speechcraftModalProps={
    // item: modalType === 'create' ? {} : currentItem,
    visible: speechcraftModalVisible,
    maskClosable: false,
    // confirmLoading: loading.effects[`user/${modalType}`],
    title: '话术帮助',
    okText:'确定',
    footer:null,
    width:'40%',
    wrapClassName: 'vertical-center-modal',
    choseItem:choseItem,
    currentItem:currentItem,
    onOk (data) {
      dispatch({
        type: 'app/hideSpeechcraft',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'app/hideSpeechcraft',
      })
    },
    choseDesId(item){
      dispatch({
        type: 'app/choseDesId',
        payload: item,
      })
    }
  }

  const editPwdModalProps={
    visible: editPwdModalVisible,
    maskClosable: false,
    title: '修改密码',
    okText:'确定',
    cancelText:'取消',
    width:'30%',
    wrapClassName: 'vertical-center-modal',
    choseItem:choseItem,
    currentItem:currentItem,
    onOk (data) {
      dispatch({
        type: 'app/hideEditPwdModal',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'app/hideEditPwdModal',
      })
    },
  }

  const QuickSearchModalProps={
    visible: QuickSearchModalVisible,
    maskClosable: false,
    // confirmLoading: loading.effects[`user/${modalType}`],
    title: '快速查询',
    footer:null,
    width:'35%',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'app/hideQuickSearchModal',
      })
    },
  }

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }
  console.log(user)
  return (

    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>中德呼叫中心系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>

      <Layout className={classnames({ [styles.dark]: darkTheme, [styles.light]: !darkTheme })}>
        {!isNavbar && <Sider
          trigger={null}
          collapsible
          collapsed={siderFold}
        >
          {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
        </Sider>}
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
          <BackTop target={() => document.getElementById('mainContainer')} />
          <Header {...headerProps} />
          {userInfoModalVisible && <UseInfoModal {...modalProps} />}
          {speechcraftModalVisible && <SpeechcraftModal {...speechcraftModalProps} />}
          {editPwdModalVisible && <EditPwdModal {...editPwdModalProps}  />}
          {QuickSearchModalVisible && <QuickSearchModal {...QuickSearchModalProps}  />}
          <Content>
            <div style={{width:permissions.role=='admin'?'80%':'100%',float:'left'}}>
              <Bread {...breadProps} />
              {hasPermission ? children : <Error />}
            </div>
            {
              permissions.role=='admin'?<div style={{width:'20%',float:'left',paddingLeft:'15px'}}>
                <Appointment {...AppointmentProps}/>
                <Calendar  />
                <Message />
              </div>:null
            }
            {/*<div style={{width:'80%',float:'left'}}>*/}
              {/*<Bread {...breadProps} />*/}
              {/*{hasPermission ? children : <Error />}*/}
            {/*</div>*/}
            {/*<div style={{width:'20%',float:'left',paddingLeft:'15px'}}>*/}
              {/*<Appointment {...AppointmentProps}/>*/}
              {/*<Calendar  />*/}
              {/*<Message />*/}
            {/*</div>*/}
          </Content>
          <Footer >
            {config.footerText}
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
