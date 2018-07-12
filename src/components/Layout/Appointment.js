import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout ,Input } from 'antd'
import classnames from 'classnames'
import Menus from './Menu'
import styles from './LeftShow.less'

const Appointment = ({
  user, logout,switchSider, siderFold,changeActiveKeyFunc, defaultActiveKey, location, switchMenuPopover, navOpenKeys, changeOpenKeys, Height
}) => {
  const changeActiveKey=(key)=>{
     changeActiveKeyFunc(key)
  }

  return (
    <div className={styles.appointment}>
        <div className={styles.headTop}>
            <span onClick={()=>changeActiveKey(1)} className={defaultActiveKey==1?styles.active:null}>预约跟踪</span>
            <span onClick={()=>changeActiveKey(2)} className={defaultActiveKey==2?styles.active:null}>首播</span>
        </div>
      {
        defaultActiveKey==1?(
          <ul className={styles.ulList}>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>

          </ul>
        ):(
          <ul className={styles.ulList}>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>
            <li><span>1</span><span>王红</span><span>苏EH7F57</span><span>05-28 10:30</span><span>E</span></li>

          </ul>
        )
      }
    </div>
  )
}



export default Appointment
