import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Timeline ,Button } from 'antd';
import styles from './sendModal.less';
import classnames from 'classnames';
const TimeLineList = (list)=>{
  return (
    <div>
      <div className="time-year">{list.year}</div>
      <div className="time-action">
        <div className="time-hour">{list.hour}</div>
        <div className="time-actionlist">
          <div className="time-status">{list.status}</div>
          <div className="time-action-detail">
            <span>{list.action}</span>，电话：<span>{list.tel}</span>，备注：<span>{list.special}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
const SendModal = ({onCancel,...sendModalProps})=>{
  const TimeData = [
    {year:'2019.06.25',hour:'18:03',status:'提交',action:'保险业务员 周丹',tel:'18621617627',special:'这里是被汉族大在萨达阿'},
    {year:'',hour:'18:45',status:'最终提交',action:'保险业务员 周丹',tel:'18621617627',special:''},
    {year:'2019.06.26',hour:'18:03',status:'审核通过',action:'出单 弹琴',tel:'18621617627',special:'这里是被汉族大在萨达阿'},    {year:'',hour:'18:53',status:'等级保费',action:'出单 弹琴',tel:'18621617627',special:''},
    {year:'2019.06.29',hour:'10:03',status:'修改派送信息',action:'业务员 周倩',tel:'18621617627',special:'这里是被汉族大在萨达阿'}
  ]
  return (
    <Modal {...sendModalProps}
           className={classnames(styles.sendModal)}
           footer={[
             <Button key="back" onClick={onCancel}>关闭</Button>
           ]}>
      <Timeline>
        {
          TimeData.map(list=>{
            return (
              <Timeline.Item color="#8C9EFF">
                <TimeLineList {...list}/>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    </Modal>
  )
}
export default SendModal
