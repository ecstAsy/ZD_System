/**
 * Created by Administrator on 2018/7/18 0018.
 * 分配投诉
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Select } from 'antd';
import styles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const Option = Select.Option;
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
    fontSize:'14'
  }
};

const AllotModal = ({ ...allotModalProps, item, handleCancel, handleConfirm,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  return (
    <Modal {...allotModalProps}
           className={classnames(styles.Modal)}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm(item)}>确认</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>,
           ]}>
      <FormItem {...formItemLayout} label="请选择处理人">
        {getFieldDecorator('processor')(
          <Select style={{width:'60%'}} placeholder='请选择'>
            <Option value='a'>业务员1</Option>
            <Option value='b'>业务员2</Option>
            <Option value='c'>业务员3</Option>
            <Option value='d'>业务员4</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  )
}

AllotModal.propTypes = {
  handleCancel: PropTypes.func,
  handleConfirm:PropTypes.func
};

export default Form.create() (AllotModal)
