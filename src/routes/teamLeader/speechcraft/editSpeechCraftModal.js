/**
 * Created by Administrator on 2018/7/11 0002.
 * 话术编辑
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span:2,
  },
  wrapperCol: {
    span: 22,
  },
  style:{
    marginBottom: '20px',
    borderRadius:'20px',
    fontSize:'14',
    color:'#333',
  }
};

const EditSpeechCraftModal = ({...EditSpeechCraftModalProps, handleCancel, currentItem, handleSubmit,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  return (
    <Modal className={classnames(styles.EditSpeechCraftModal)}
      {...EditSpeechCraftModalProps}
      footer={[
        <Button type="primary" key="submit" onClick={handleSubmit}>确定</Button>,
        <Button key="back" onClick={handleCancel}>关闭</Button>
      ]}>
        <Row gutter={24}>
          <Col span={24} >
            <FormItem {...formItemLayout} label='标题'>
              {getFieldDecorator('title',{
                initialValue:currentItem.name
              })(
                  <Input style={{textAlign:'center'}}/>
                )}
            </FormItem>
          </Col>
          <Col span={24} >
            <FormItem {...formItemLayout} label='标题'>
              {getFieldDecorator('detail',{
                initialValue:currentItem.detail
              })(
                <TextArea style={{textIndent:'20px'}} autosize={{minRows:14, maxRows: 18}}/>
              )}
            </FormItem>
          </Col>
        </Row>
    </Modal>
  )
};

EditSpeechCraftModal.propTypes = {
  handleCancel:PropTypes.func,
  handleSubmit:PropTypes.func
}
export default Form.create() (EditSpeechCraftModal)
