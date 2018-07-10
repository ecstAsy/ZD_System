import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button } from 'antd';
import styles from './index.less';
import queryString from 'query-string';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:8,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14',
    color:'#333'
  }
}
const SelectFilter = ({ FilterSearch,
   form: { getFieldDecorator, getFieldsValue, setFieldsValue }
 })=>{
  const handleSearch =()=>{
    let fields = getFieldsValue();
    FilterSearch(fields);
  }
  return (
    <Row>
      <Col span={9}>
        <FormItem {...formItemLayout} label="车牌">
          {getFieldDecorator('userPlate')(
            <Input/>
          )}
        </FormItem>
      </Col>
      <Col span={9}>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('userPhone')(
            <Input/>
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <Button type="primary" onClick={handleSearch}>查询</Button>
      </Col>
    </Row>
  )
}

export default Form.create() (SelectFilter)
