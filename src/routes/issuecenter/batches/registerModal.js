import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:12,
  },
  wrapperCol: {
    span: 12,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const ColProps = {
  style: {
    marginBottom: 50,
  },
};

const RegisterModal = ({...registerModalProps, handleCancel, currentItem,
     form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  return (
    <Modal className={classnames(styles.Modal,styles.RegisterModal)}
      {...registerModalProps}
      footer={[
        <Button type="primary" key="submit">确定</Button>,
        <Button key="back" onClick={handleCancel}>关闭</Button>
      ]}>
      <Row gutter={24}>
        <Col {...ColProps}>
        <Col span={24}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.insuranceNum}</span>
        </Col>
        <Col span={24}>
          <span className='title'>差价：</span><span className='detail' style={{color:'#ec412b'}}>{`-${currentItem.costNum}`}</span>
        </Col>
        </Col>
        <Col span={24}>
          <FormItem {...formItemLayout} label='最终报价'>
            {getFieldDecorator('finalNum',{
              initialValue:currentItem.insuranceNum-currentItem.costNum
            })(
              <Input style={{width:'60%'}}/>
            )}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}
RegisterModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (RegisterModal)
