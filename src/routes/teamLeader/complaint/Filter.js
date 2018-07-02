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
    fontSize:'14'
  }
};
const formItemLayoutTwo = {
  labelCol: {
    span:7,
  },
  wrapperCol: {
    span: 17,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
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
const ColPropsTwo = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:30
  },
};
const Filter = ({FilterSearch,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue }
  })=>{
  const handleFields = (fields) => {
    if( fields.creatTime && fields.creatTime instanceof Array && fields.creatTime.length > 1 ){
       fields.creatTime = [fields.creatTime[0].format('YYYYMMDD'), fields.creatTime[1].format('YYYYMMDD')]
    };
    if( fields.handleTime && fields.handleTime instanceof Array && fields.handleTime.length > 1 ){
       fields.handleTime = [fields.handleTime[0].format('YYYYMMDD'), fields.handleTime[1].format('YYYYMMDD')]
    };
    return fields;
  };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    FilterSearch(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      fields[item] = fields[item] instanceof Array ? [] : undefined
    };
    setFieldsValue(fields);
    handleSubmit();
  };
  return (
    <div className={classnames(styles.searchBox)}>
      <Form>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="姓名">
              {getFieldDecorator('userName')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="手机号">
              {getFieldDecorator('userPhone')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="车牌号">
              {getFieldDecorator('userPlate')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="处理人">
              {getFieldDecorator('processor')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem  {...formItemLayout} label="状态">
              {getFieldDecorator('status', )(
                <Select showSearch style={{ width: '100%' }} placeholder="请选择" >
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...ColPropsTwo}>
            <FormItem  {...formItemLayoutTwo} label="创建日期">
              {getFieldDecorator('creatTime')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col {...ColPropsTwo}>
            <FormItem  {...formItemLayoutTwo} label="处理日期">
              {getFieldDecorator('handleTime')(
                <RangePicker />
              )}
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
  FilterSearch: PropTypes.func,
}

export default Form.create() (Filter)
