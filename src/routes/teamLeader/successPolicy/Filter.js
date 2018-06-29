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
const  ColProps2={
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const formItemLayout2 = {
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
const ColProps3 = {
  xs: 24,
  sm:10,
  style: {
    marginBottom: 10,
    marginRight:0
  },
};
const ColProps4 = {
  xs: 24,
  sm: 3,
  style: {
    marginBottom: 10,
    marginRight:0,
    paddingLeft:0,
    paddingRight:10
  },
};
const formItemLayout3 = {
  labelCol: {
    span:0,
  },
  wrapperCol: {
    span: 24,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const Filter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  isMore,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
  isShowMoreFunc,
}) => {
  const handleFields = (fields) => {
    const { beginDate } = fields;
    console.log(fields);
    if (beginDate.length) {
      fields.beginDate = [beginDate[0].format('YYYYMMDD'), beginDate[1].format('YYYYMMDD')]
    }


    console.log(fields);
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

  const handleChange = (key, values) => {
    let fields = getFieldsValue();
    fields[key] = values;
    fields = handleFields(fields);
    onFilterChange(fields)
  };
  const { name, address } = filter;

  let initialCreateTime = [];
  if (filter.beginDate && filter.beginDate[0]) {
    initialCreateTime[0] = moment(filter.beginDate[0])
  }
  if (filter.beginDate && filter.beginDate[1]) {
    initialCreateTime[1] = moment(filter.beginDate[1])
  }
  const isShowMore=(isMore)=>{
    console.log(isMore)
    isShowMoreFunc(isMore)
  }
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
          {getFieldDecorator('name', {
          })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="车牌"  {...formItemLayout}>
          {getFieldDecorator('chepai', {
          })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="业务员"  {...formItemLayout}>
          {getFieldDecorator('yewuyuan', {
          })(<Select
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
          {getFieldDecorator('chudanType', {
          })(<Select
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
          {getFieldDecorator('zhuangtai', {
          })(<Select
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
          {getFieldDecorator('payType', {
          })(<Select
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
      <Col {...ColProps2}>
        <FormItem label="提交日期"  {...formItemLayout2}>
          {getFieldDecorator('beginDate', {initialValue: initialCreateTime
          })(<RangePicker  style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="派单状态"  {...formItemLayout}>
          {getFieldDecorator('paidanType', {
          })(<Select
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
      <Col {...ColProps3}>
        <FormItem label="保险公司"  {...formItemLayout2}>
          {getFieldDecorator('baoxian1', {
          })(<Cascader placeholder="请选择" options={residences} />)}
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
          {/*<div className="flex-vertical-center">*/}
            {/*<Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" />*/}
            {/*<Button type="ghost" onClick={onAdd}>Create</Button>*/}
          {/*</div>*/}
        </div>
      </Col>
    </Row>
    </form>
  </div>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
