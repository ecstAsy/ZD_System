import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, DatePicker } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';
import moment from 'moment';

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

const PolicyActionTimeModal = ({...policyActionTimeModalProps, handleCancel, currentItem,
    form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{

  const handleConfirm = ()=>{

  };
  return (
    <Modal className={classnames(publicStyles.Modal,styles.PolicyActionModal)}
           {...policyActionTimeModalProps}
      title={currentItem.policyAction}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm}>确定</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <FormItem {...formItemLayout} label='缴费日期'>
        {getFieldDecorator('paymentTime',{
          initialValue:moment(currentItem.paymentTime)
        })(
          <DatePicker/>
        )}
      </FormItem>
    </Modal>
  )
}
PolicyActionTimeModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (PolicyActionTimeModal)
