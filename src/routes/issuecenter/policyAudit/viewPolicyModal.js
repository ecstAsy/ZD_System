/**
 * Created by Administrator on 2018/7/11 0011.
 * 查看保单信息（审核通过）
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Row, Col, Icon } from 'antd';
import { Title, PolicyTable } from 'components';
import publicStyles from '../../publicStyle.less';
import styles from './index.less';
import classnames from 'classnames';
import SendTable from './sendTable';

const ViewPolicyModal = ({...viewPolicyModalProps, handleCancel, currentItem,
  })=>{
  return (
    <Modal className={classnames(publicStyles.Modal,styles.ViewPolicyModal,styles.InsuranceSlipModal)}
           {...viewPolicyModalProps}
           footer={[
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
      <Row>
        <img src="../ghef_03.png" alt=""/>
        <span>投保机构：</span><span>江苏分公司</span>
      </Row>
      <Row gutter={24}>
        <Col span={18}>
          <span className='title'>商业险<span className='unit'>（元）</span> ：</span><span className='detail allNum'>{currentItem.commercialNum}</span>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.commercialNum}</span>
          <span className='title'>差额：</span><span className='detail'>{currentItem.commercialNum}</span>
        </Col>
        <Col span={18}>
          <span className='title'>交强险<span className='unit'>（元）</span> ：</span><span className='detail allNum'>{currentItem.compulsoryNum}</span>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.compulsoryNum}</span>
          <span className='title'>差额：</span><span className='detail'>{currentItem.compulsoryNum}</span>
        </Col>
        <Col span={18}>
          <span className='title'>车船税<span className='unit'>（元）</span> ：</span><span className='detail allNum'>{currentItem.commercialNum}</span>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.vehicleVesselTax}</span>
          <span className='title'>差额：</span><span className='detail'>{currentItem.vehicleVesselTax}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={11}>
          <img src="../ghef_03.png" alt=""/>
          <span>支付码：</span><span>362919</span>
        </Col>
        <Col span={11}>
          <span className='title'>收款二维码：</span>
          <img src="../call2.png" alt=""/>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={1}>
          <img src="../ghef_03.png" alt=""/>
        </Col>
        <Col span={11}>
          <span className='title'>投保单1：</span>
          <img src="../call2.png" alt=""/>
        </Col>
        <Col span={11}>
          <span className='title'>投保单2：</span>
          <img src="../call2.png" alt=""/>
        </Col>
      </Row>
    </Modal>
  )
}
ViewPolicyModal.propTypes = {
  handleCancel:PropTypes.func
}
export default ViewPolicyModal
