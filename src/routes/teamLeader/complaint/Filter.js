import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
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
const formItemLayout2 = {
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
const ColProps = {
  xs: 24,
  sm: 5,
  style: {
    marginBottom: 10,
    marginRight:30
  },
};
const ColProps2 = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:30
  },
};
const Filter = ({onFilterChange,
        form: {
          getFieldDecorator,
          getFieldsValue,
          setFieldsValue,
        },
      })=>{
  const handleFields = (fields) => {
    const { creatTime ,handleTime} = fields;
      creatTime.length ? fields.creatTime = [creatTime[0].format('YYYYMMDD'), creatTime[1].format('YYYYMMDD')]:''
      handleTime.length ? fields.handleTime = [handleTime[0].format('YYYYMMDD'), handleTime[1].format('YYYYMMDD')]:''
    return fields
  };
  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    console.log(fields)
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit()
  };
  return (
    <div className={classnames(styles.searchBox)}>
      <Form>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="姓名">
              {getFieldDecorator('userName', {
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="手机号">
              {getFieldDecorator('userPhone', {
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="车牌号">
              {getFieldDecorator('userPlate', {
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="处理人">
              {getFieldDecorator('processor', {
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="状态">
              {getFieldDecorator('status', {
              })(<Select showSearch style={{ width: '100%' }} placeholder="请选择" >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                 </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps2}>
            <FormItem  {...formItemLayout2} label="创建日期">
              {getFieldDecorator('creatTime', {
                initialValue:[]
              })(<RangePicker />)}
            </FormItem>
          </Col>
          <Col {...ColProps2}>
            <FormItem  {...formItemLayout2} label="处理日期">
              {getFieldDecorator('handleTime', {
                initialValue:[]
              })(<RangePicker />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col >
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' ,}}>
              <div>
                <Button type="primary" className="margin-right" onClick={handleSubmit}>查询</Button>
                <Button onClick={handleReset}>重置</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
Filter.propTypes = {
  onFilterChange: PropTypes.func,
}
export default Form.create() (Filter)
