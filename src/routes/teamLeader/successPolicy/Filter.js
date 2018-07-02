/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import 'moment/src/locale/zh-cn';
import { FilterItem } from 'components'
import classnames from 'classnames'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select ,Icon,TimePicker } from 'antd'

import styles from './List.less'
const Option = Select.Option;
const { Search } = Input
const { RangePicker } = DatePicker
const FormItem = Form.Item

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
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const formItemLayoutLong = {
  labelCol: {
    span:6,
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
  const {name, plate }=filter;

  const handleFields = (fields) => {
    const { submissionDate } = fields;
    if (submissionDate && submissionDate.length && submissionDate.length > 1) {
      fields.submissionDate = [submissionDate[0].format('YYYYMMDD'), submissionDate[1].format('YYYYMMDD')]
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
  <div className={styles.searchBox}>
    <form layout="horizontal">
    <Row gutter={24}>
      <Col {...ColProps}>
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator('name', { initialValue: name })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="车牌"  {...formItemLayout}>
          {getFieldDecorator('plate', { initialValue: plate })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="业务员"  {...formItemLayout}>
          {getFieldDecorator('salesman')(<Select
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
        <FormItem label="出单类型"  {...formItemLayout}>
          {getFieldDecorator('SingleType')(<Select
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
        <FormItem label="状态"  {...formItemLayout}>
          {getFieldDecorator('state')(<Select
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
        <FormItem label="支付方式"  {...formItemLayout}>
          {getFieldDecorator('payType')(<Select
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
      <Col {...ColPropsLong}>
        <FormItem label="提交日期"  {...formItemLayoutLong}>
          {getFieldDecorator('submissionDate')(<RangePicker  style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="派单状态"  {...formItemLayout}>
          {getFieldDecorator('singleState')(<Select
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
      <Col {...ColPropsLong}>
        <FormItem label="保险公司"  {...formItemLayoutLong}>
          {getFieldDecorator('insuranceCompany')(<Cascader placeholder="请选择" options={residences} />)}
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
    </form>
  </div>
  )
};

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
