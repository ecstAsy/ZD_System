/**
 * Created by Administrator on 2018/7/10 0010.
 * 修改登记金额
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:10,
  },
  wrapperCol: {
    span: 14,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const PolicyActionMoneyModal = ({...policyActionMoneyModalProps, handleCancel, currentItem,
   form: { getFieldDecorator, getFieldsValue, setFieldsValue }
 })=>{

  const handleConfirm = ()=>{
      let fields = getFieldsValue();
          fields.costNum = formatFloat(formatFloat(currentItem.commercialNum-fields.commercialNum,2)+
            formatFloat(currentItem.compulsoryNum-fields.compulsoryNum,2)+
            formatFloat(currentItem.vehicleVesselTax-fields.vehicleVesselTax,2),2)
  };

  const formatFloat =  (f, digit)=> {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  };

  return (
    <Modal className={classnames(publicStyles.Modal,styles.PolicyActionModal)}
           {...policyActionMoneyModalProps}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm}>确定</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='商业险'>
            {getFieldDecorator('commercialNum')(
              <Input style={{width:'80%'}} addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.commercialNum}</span>
          <span className='title'>差额：</span><span style={{color:getFieldsValue().commercialNum&&formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2)<-30||getFieldsValue().commercialNum&&formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2)>30
            ?'#EC412B':'#333'}}
          className='detail'>{getFieldsValue().commercialNum ? formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2):0}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='交强险'>
            {getFieldDecorator('compulsoryNum')(
              <Input style={{width:'80%'}}  addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.compulsoryNum}</span>
          <span className='title'>差额：</span><span className='detail' style={{color:getFieldsValue().compulsoryNum&&formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2)<-30||getFieldsValue().compulsoryNum&&formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2)>30
            ?'#EC412B':'#333'}}
        >{getFieldsValue().compulsoryNum ? formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2):0}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='车船税'>
            {getFieldDecorator('vehicleVesselTax')(
              <Input style={{width:'80%'}} addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.vehicleVesselTax}</span>
          <span className='title'>差额：</span><span className='detail' style={{color:getFieldsValue().vehicleVesselTax&&formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2)<-30||getFieldsValue().vehicleVesselTax&&formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2)>30
            ?'#EC412B':'#333'}}>
          {getFieldsValue().vehicleVesselTax ? formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2):0}</span>
        </Col>
      </Row>
    </Modal>
  )
}
PolicyActionMoneyModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (PolicyActionMoneyModal)
