/**
 * Created by Administrator on 2018/7/11 0011.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PolicyTable } from 'components';
import {  Modal, Button, Form, Row, Col, Icon } from 'antd';
import publicStyles from '../../publicStyle.less';
import styles from './index.less';
import classnames from 'classnames';
import SendTable from './sendTable';

const InsuranceSlipModal = ({...insuranceSlipModalProps, handleCancel ,handleConfirm,
})=>{
  return (
    <Modal className={classnames(publicStyles.Modal,styles.InsuranceSlipModal)}
           {...insuranceSlipModalProps}
           footer={[
             <Button key="submit" type="primary" onClick={handleConfirm}>通过</Button>,
             <Button key="turn" type="danger" ghost >退单</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Row gutter={24}>
        <Col span={12}>
          <span>谢仙花团队-卓玉娟<span>扫码支付</span> </span>
        </Col>
        <Col span={12}>
          <span><Icon type="download" />下载</span>
        </Col>
      </Row>
      <PolicyTable/>
      <SendTable/>
    </Modal>
  )
}
InsuranceSlipModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (InsuranceSlipModal)
