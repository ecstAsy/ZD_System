import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout ,Input } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

const Header = ({
  user, logout, openUserInfo,openSpeechcraftModal,openQuickSearchModal,onChangeSearch,switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu,searchTxt,
}) => {
  let handleClickMenu = e => {
    if(e.key === 'logout'){
       logout()
    }else{
      openUserInfo()
    }
  }
  const openSpeechcraft= e =>{
    openSpeechcraftModal()
  }

  const searchFun= e =>{
    openQuickSearchModal()
  }

  const onChangeSearchTxt= e =>{
    onChangeSearch(e.target.value)
  }

  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <Layout.Header className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className={styles.button}
          onClick={switchSider}
        >
          <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.searchBox}>
          <Input placeholder="车牌/电话/姓名快速查询" value={searchTxt} onPressEnter={searchFun} onChange={onChangeSearchTxt}  />
          <Icon type="search" onClick={searchFun} />
        </div>
        <div className={styles.button} onClick={openSpeechcraft}>
          话术帮助
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {user.username}
            </span>}
          >
            <Menu.Item key="useInfo">
              个人信息
            </Menu.Item>
            <Menu.Item key="logout">
              退出
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
