import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, DatePicker, Button, Cascader } from 'antd';
import styles from './index.less';
import queryString from 'query-string';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
  labelCol: {
    span:7,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
  }
};
const formItemLayout_b = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
  }
};

const Filter = ({FilterSearch, location,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  const values = queryString.parse(location.search);
  const handleFildes = (fields)=>{
     if(fields.applyTime && fields.applyTime instanceof Array && fields.applyTime.length>1){
       fields.applyTime = [fields.applyTime[0].format('YYYY-MM-DD HH:mm:ss'), fields.applyTime[1].format('YYYY-MM-DD HH:mm:ss')]
     }
     return fields
  };
  const handleSubmit = ()=>{
    let fields = getFieldsValue();
    fields = handleFildes(fields);
    FilterSearch(fields)
  };
  const handleReset = ()=>{
    const fields = getFieldsValue();
    for (let item in fields) {
      fields[item] = fields[item] instanceof Array ? [] : undefined
    };
    setFieldsValue(fields);
    handleSubmit();
  };
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];

  return (
     <div className={classnames(styles.searchBox)}>
        <Row gutter={24}>
           <Col span={6}>
              <FormItem {...formItemLayout} label="申请人">
                 {getFieldDecorator('applicant',{
                   initialValue:values.applicant
                 })(
                    <Input style={{width:'80%'}}/>
                 )}
              </FormItem>
           </Col>
           <Col span={6}>
              <FormItem {...formItemLayout} label="客户姓名">
                 {getFieldDecorator('customer',{
                   initialValue:values.customer
                 })(
                    <Input style={{width:'80%'}}/>
                 )}
              </FormItem>
           </Col>
           <Col span={6}>
              <FormItem {...formItemLayout} label="车牌">
                 {getFieldDecorator('carPlate',{
                   initialValue:values.carPlate
                 })(
                    <Input style={{width:'80%'}}/>
                 )}
              </FormItem>
           </Col>
           <Col span={6}>
              <FormItem {...formItemLayout} label="状态">
                 {getFieldDecorator('status',{
                   initialValue:values.status
                 })(
                    <Select style={{width:'80%'}} placeholder='请选择'>
                       <Option value='a'>驳回</Option>
                       <Option value='b'>同意</Option>
                       <Option value='c'>未处理</Option>
                       <Option value='d'>上级申请中</Option>
                    </Select>
                 )}
              </FormItem>
           </Col>
        </Row>
        <Row gutter={24}>
           <Col span={8}>
              <FormItem {...formItemLayout_b} label="申请日期">
                 {getFieldDecorator('applyTime',{
                   initialValue:values.applyTime
                 })(
                    <RangePicker />
                 )}
              </FormItem>
           </Col>
           <Col span={14}>
              <FormItem {...formItemLayout_b} label="保险公司">
                 {getFieldDecorator('insuranceCompany',{
                   initialValue:values.insuranceCompany
                 })(
                    <Cascader options={options} style={{width:'80%'}} placeholder="请选择" />
                 )}
              </FormItem>
           </Col>
        </Row>
        <Row>
           <Col >
              <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' ,}}>
                 <div>
                    <Button type="primary" className="margin-right" onClick={handleSubmit}>查询</Button>
                    <Button onClick={handleReset}>重置</Button>
                 </div>
              </div>
           </Col>
        </Row>
      </div>
  )
}

Filter.propTypes = {
  FilterSearch:PropTypes.func
}

export default Form.create() (Filter)
