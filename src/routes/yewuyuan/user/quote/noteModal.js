import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Form ,Button, Input } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
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
const ColProps = {
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const NoteModal = ({loading,...noteModalProps,
                   form:{
                     getFieldDecorator,
                     getFieldsValue,
                     setFieldsValue,
                   }})=>{

  return (
    <Modal {...noteModalProps} className={classnames(styles.NoteModal)}
           footer={[
             <Button key="submit" type="primary" loading={loading} >
               发送
             </Button>,
             <Button key="back" >取消</Button>,
           ]}>
      <Form>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="发送至其他号码" {...formItemLayout}>
              {getFieldDecorator('userType', {

              })(<Input/>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="业务员" {...formItemLayout}>
              {getFieldDecorator('giveGoods', {
                initialValue:'刘媛媛'
              })(<Input/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>

    </Modal>
  )
}
export default Form.create() (NoteModal)
