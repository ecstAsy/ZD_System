import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Timeline, Button } from 'antd';
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
};

const SendModal = ({onCancel, ...sendModalProps, TimeData})=>{
  return (
    <Modal {...sendModalProps}
           className={classnames(styles.sendModal)}
           footer={[
             <Button key="back" onClick={onCancel}>关闭</Button>
           ]}>
      <Timeline>
        {
          TimeData.map((list,i)=>{
            return (
              <Timeline.Item color="#8C9EFF" key={i}>
                <TimeLineList {...list}/>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    </Modal>
  )
};

export default SendModal
