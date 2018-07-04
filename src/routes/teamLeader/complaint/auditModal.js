import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
const AuditModal = ({
      ...auditModal, item, handleCancel, handleConfirm, handleReject
 })=>{
  return (
    <Modal {...auditModal}
      className={classnames(styles.AuditModal)}
      footer={[
        <Button type="primary" key="submit" onClick={handleConfirm(item)}>同意</Button>,
        <Button type="danger" ghost key="reject" onClick={handleReject(item)}>驳回</Button>,
        <Button key="back" onClick={handleCancel}>取消</Button>,
      ]}>
      <span className='contentTitle'>投诉描述：</span>
      <span>{item.cpDecription}</span>
    </Modal>
  )
}

AuditModal.propTypes = {
  handleCancel: PropTypes.func,
  handleReject: PropTypes.func,
  handleConfirm:PropTypes.func
};

export default AuditModal
