import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout ,Input } from 'antd'
import classnames from 'classnames'
import Menus from './Menu'
import styles from './LeftShow.less'

const Calendar = ({
  user, logout,switchSider, siderFold,location, switchMenuPopover, navOpenKeys, changeOpenKeys,
}) => {


  return (
    <div className={styles.appointment} style={{marginTop:'20px'}}>
      <div className={classnames(styles.headTop,styles.calendar)}>
        预约日历
      </div>
      <ul className={styles.ulList2}>
        <li><span>05/31</span><span>已预约45单，还可预约<span>75</span>单</span></li>
        <li><span>05/31</span><span>已预约45单，还可预约<span>75</span>单</span></li>
        <li><span>05/31</span><span>已预约45单，还可预约<span>75</span>单</span></li>
        <li><span>05/31</span><span>已预约45单，还可预约<span>75</span>单</span></li>
      </ul>
    </div>
  )
}



export default Calendar
