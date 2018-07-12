/**
 * Created by Administrator on 2018/7/11 0011.
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'moment/src/locale/zh-cn';
import { FilterItem } from 'components';
import styles from '../../publicStyle.less';
import { Form, Button, Row, Col, DatePicker, Input, Select, Cascader } from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span:8,
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
  sm: 5,
  style: {
    marginBottom: 10,
    marginRight:30
  },
};
const  ColPropsLong={
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const formItemLayoutLong = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 18,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const { carPlate, name, sendTime, policyScene, area, team, salesman, payWay, customerType,
    status, registrationAmountStatus, submissionTime, insuranceCompany, }=filter;

  const handleFields = (fields) => {
    const { paymentTime } = fields;
    if (paymentTime && paymentTime.length && paymentTime.length > 1) {
      fields.paymentTime = [paymentTime[0].format('YYYYMMDD'), paymentTime[1].format('YYYYMMDD')]
    }
    return fields
  };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    onFilterChange(fields)
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

  const residences = [{
    value: 'renbao',
    label: '人保',
    children: [{
      value: 'suzhou',
      label: '苏州',
      children: [{
        value: 'xinqu',
        label: '新区',
      }],
    }],
  }, {
    value: 'taibao',
    label: '太保',
    children: [{
      value: 'nanjing',
      label: '南京',
      children: [{
        value: 'xuanwu',
        label: '玄武',
      }],
    }],
  }];

  return (
    <div className={styles.searchBox}>
      <form layout="horizontal">
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', { initialValue: name })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="车牌" {...formItemLayout}>
              {getFieldDecorator('carPlate', { initialValue: carPlate })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="现场"  {...formItemLayout}>
              {getFieldDecorator('policyScene', { initialValue: policyScene })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                dropdownStyle={{lineHeight:'25px'}}
              >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="团队"  {...formItemLayout}>
              {getFieldDecorator('team', { initialValue: team })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                dropdownStyle={{lineHeight:'25px'}}
              >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="业务员"  {...formItemLayout}>
              {getFieldDecorator('salesman', { initialValue: salesman })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="状态"  {...formItemLayout}>
              {getFieldDecorator('status', { initialValue: status })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="支付方式"  {...formItemLayout}>
              {getFieldDecorator('payWay', { initialValue: payWay })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="扫码支付">扫码支付</Option>
                <Option value="转账至保险公司">转账至保险公司</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="金额登记"  {...formItemLayout}>
              {getFieldDecorator('registrationAmountStatus', { initialValue: registrationAmountStatus })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="客户类型"  {...formItemLayout}>
              {getFieldDecorator('customerType', { initialValue: customerType })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="A">A</Option>
                <Option value="B">B</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="区域"  {...formItemLayout}>
              {getFieldDecorator('area', { initialValue: area })(<Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                dropdownStyle={{lineHeight:'25px'}}
              >
                <Option value="suzhou">苏州</Option>
                <Option value="nanjing">南京</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColPropsLong}>
            <FormItem label="派送日期"  {...formItemLayoutLong}>
              {getFieldDecorator('sendTime', { initialValue: sendTime })
              (<RangePicker  style={{ width: '70%' }} />)}
            </FormItem>
          </Col>
          <Col {...ColPropsLong}>
            <FormItem label="提交时间"  {...formItemLayoutLong}>
              {getFieldDecorator('submissionTime', { initialValue: submissionTime })
              (<RangePicker  style={{ width: '70%' }} />)}
            </FormItem>
          </Col>
          <Col {...ColPropsLong}>
            <FormItem label="保险公司"  {...formItemLayoutLong}>
              {getFieldDecorator('insuranceCompany', { initialValue: insuranceCompany })
              (<Cascader placeholder="请选择" options={residences} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col >
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' ,}}>
              <div>
                <Button type="primary" onClick={handleSubmit} >查询</Button>
                <Button onClick={handleReset} >重置</Button>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  )
};

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
