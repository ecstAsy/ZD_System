/**
 * Created by Administrator on 2018/7/18 0018.
 * 投诉审核
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const AuditModal = ({...auditModalProps, handleCancel, item, handleConfirm
})=>{

  return (
    <Modal className={classnames(publicStyles.Modal)}
           {...auditModalProps}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm(item)}>同意</Button>,
             <Button type="danger" ghost>驳回</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Row gutter={24}>
        <div className={classnames(publicStyles.biaoti)}>投诉描述：<span style={{color:'#000'}}>返现100</span></div>
      </Row>
    </Modal>
  )
}
AuditModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (AuditModal)
