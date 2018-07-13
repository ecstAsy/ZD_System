import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Select, } from 'antd';
const FormItem = Form.Item
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span:7,
  },
  wrapperCol: {
    span: 17,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const ChangeSalesman = ({
  onOk,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
  ...changeSalesProps
})=>{
  const handelOk=()=>{
    let files = getFieldsValue();
    onOk(files);
  };
  const SalesProps={
    ...changeSalesProps,
    onOk:handelOk,
  };

  return (
  <Modal {...SalesProps}>
        <div>
          <FormItem label="业务员"  {...formItemLayout}>
            {getFieldDecorator('salesMan')(<Select
              showSearch
              style={{ width: '70%' }}
              placeholder="请选择"
              dropdownStyle={{lineHeight:'25px'}}
            >
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>)}
          </FormItem>
        </div>
    </Modal>
  )
};


export default Form.create()(ChangeSalesman)
