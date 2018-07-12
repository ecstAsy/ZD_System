import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout ,Input } from 'antd'
import classnames from 'classnames'
import Menus from './Menu'
import styles from './LeftShow.less'

const Message = ({
  user, logout,switchSider, siderFold,location, switchMenuPopover, navOpenKeys, changeOpenKeys, Height
}) => {


  return (
    <div className={styles.appointment} style={{marginTop:'20px'}}>
      <div className={classnames(styles.headTop,styles.message)}>
        提醒
      </div>
      <div className={styles.messageBox} style={{height:`${Height*0.3}px`}}>
        <ul className={styles.ulList3} >
          <li><span>●</span>还剩<span>75</span>条首播未处理</li>
          <li><span>●</span>还剩<span>113</span>条首播未处理</li>
        </ul>
        <p>已处理<span>115</span>条</p>
        <p>成功<span>2</span>条</p>
        <p>失败<span>16</span>条</p>
      </div>
    </div>
  )
}



export default Message
