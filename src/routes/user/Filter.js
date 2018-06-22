/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select } from 'antd'
import city from '../../utils/city'
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
  }
}
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
}
const  ColProps2={
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
}
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
  }
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    console.log(fields)
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
  <div style={{padding:'20px',border:'1px #ddd solid',marginBottom:'35px'}}>
    <Row gutter={24}>
      <Col {...ColProps}>
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator('usename', {
          })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="手机号"  {...formItemLayout}>
          {getFieldDecorator('phone', {
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
        <FormItem label="上年保险公司"  {...formItemLayout}>
          {getFieldDecorator('company', {
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
        <FormItem label="投保保险公司"  {...formItemLayout}>
          {getFieldDecorator('company2', {
          })(<Select
            showSearch
            style={{ width: '100%' }}
            placeholder="请选择"
            dropdownStyle={{lineHeight:'25px'}}
          >
            <Option value="china">人保</Option>
            <Option value="use">太保</Option>
          </Select>)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="预约级别"  {...formItemLayout}>
          {getFieldDecorator('jibie', {
          })(<Select
            showSearch
            style={{ width: '100%' }}
            placeholder="请选择"
            dropdownStyle={{lineHeight:'25px'}}
          >
            <Option value="china">A</Option>
            <Option value="use">B</Option>
          </Select>)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="初登日期"  {...formItemLayout2}>
          {getFieldDecorator('beginDate', {
          })(<RangePicker />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="保险到期日"  {...formItemLayout2}>
          {getFieldDecorator('endDate', {
          })(<RangePicker />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="名单发放日"  {...formItemLayout2}>
          {getFieldDecorator('endDate', {
          })(<RangePicker />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="名单发放日"  {...formItemLayout2}>
          {getFieldDecorator('endDate', {
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
          {/*<div className="flex-vertical-center">*/}
            {/*<Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" />*/}
            {/*<Button type="ghost" onClick={onAdd}>Create</Button>*/}
          {/*</div>*/}
        </div>
      </Col>
    </Row>
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
