import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';
import $ from 'jquery';

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
      console.log(fields)
  };

  const formatFloat =  (f, digit)=> {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  };

 const handleInput=()=>{
    let fields = {
      ...getFieldsValue()
    };
   if(fields.commercialNum){
     let costCommercialNum = formatFloat(currentItem.commercialNum-fields.commercialNum,2);
     $('.detail').eq(1).text(costCommercialNum);
     if(costCommercialNum>30 || costCommercialNum<-30){
       $('.detail').eq(1).addClass('active');
     }else{
       $('.detail').eq(1).removeClass('active');
     }
   }
   if (fields.compulsoryNum){
     let costCompulsoryNumNum = formatFloat(currentItem.compulsoryNum-fields.compulsoryNum,2);
     $('.detail').eq(3).text(costCompulsoryNumNum);
     if(costCompulsoryNumNum>30 || costCompulsoryNumNum<-30){
       $('.detail').eq(3).addClass('active');
     }else{
       $('.detail').eq(3).removeClass('active');
     }
   }
   if(fields.vehicleVesselTax){
     let costVehicleVesselTaxNum = formatFloat(currentItem.vehicleVesselTax-fields.vehicleVesselTax,2);
     $('.detail').eq(5).text(costVehicleVesselTaxNum);
     if(costVehicleVesselTaxNum>30 || costVehicleVesselTaxNum<-30){
       $('.detail').eq(5).addClass('active');
     }else{
       $('.detail').eq(5).removeClass('active');
     }
   }
  }

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
              <Input style={{width:'80%'}} addonAfter='元' onKeyUp={handleInput}/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.commercialNum}</span>
          <span className='title'>差额：</span><span className='detail'>0</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='交强险'>
            {getFieldDecorator('compulsoryNum')(
              <Input style={{width:'80%'}}  addonAfter='元' onKeyUp={handleInput}/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.compulsoryNum}</span>
          <span className='title'>差额：</span><span className='detail'>0</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='车船税'>
            {getFieldDecorator('vehicleVesselTax')(
              <Input style={{width:'80%'}} addonAfter='元' onKeyUp={handleInput}/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.vehicleVesselTax}</span>
          <span className='title'>差额：</span><span className='detail'>0</span>
        </Col>
      </Row>
    </Modal>
  )
}
PolicyActionMoneyModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (PolicyActionMoneyModal)
