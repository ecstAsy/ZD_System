import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, Cascader, Checkbox } from 'antd';
import Title from './title';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
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
const ColProps2 = {
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};

const CarInsurance = ({
  form:{
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  }})=>{
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
      <div className={classnames(styles.Quote)}>
        <Title title={`车险选项`}/>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="投保公司" >
              {getFieldDecorator('insuranceCompany',{
                initialValue:'china'
              })(
                <Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                  <Option value="china">太保</Option>
                  <Option value="use">平保</Option>
                </Select> )}
            </FormItem>
          </Col>
          <Col {...ColProps2}>
            <FormItem {...formItemLayout} label="派件地址" >
              {getFieldDecorator('insuranceAddress',{})(
                <div>
                  <Cascader options={options}  placeholder="请选择" />
                </div>
              )}
            </FormItem>
          </Col>
        </Row>
        <p className='cutLine'></p>
        <FormItem >
          {getFieldDecorator('insuranceType',{})(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={1}></Col>
                <Col span={23}><Checkbox value="A">商业险</Checkbox></Col>
                <Col span={1}></Col>
                <Col span={23}><Checkbox value="B">交强险</Checkbox></Col>
              </Row>
            </Checkbox.Group> )}
        </FormItem>
      </div>
    )
}
export default Form.create() (CarInsurance)
