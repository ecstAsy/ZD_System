/**
 * Created by Administrator on 2018/7/11 0011.
 * 批单审核
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: {
    span:3,
  },
  wrapperCol: {
    span: 21,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const AuditModal = ({...auditModalProps, handleCancel, currentItem,
     form: { getFieldDecorator, getFieldsValue, setFieldsValue }
   })=>{
  return (
    <Modal className={classnames(publicStyles.Modal,styles.AuditModal)}
      {...auditModalProps}
      footer={[
        <Button key="submit" type="primary">通过</Button>,
        <Button key="turn" type="danger" ghost >失效</Button>,
        <Button key="back" onClick={handleCancel}>关闭</Button>
      ]}>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem {...formItemLayout} label='批改信息'>
            {getFieldDecorator('batchInfo',{
              initialValue:currentItem.batchInfo
            })(
              <TextArea autosize={{minRows:6,maxRows:6}}/>
            )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem {...formItemLayout} label='备注'>
            {getFieldDecorator('remark',{
              initialValue:currentItem.remark
            })(
              <TextArea autosize={{minRows:6,maxRows:6}}/>
            )}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}
AuditModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (AuditModal)
