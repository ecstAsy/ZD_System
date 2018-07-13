/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import 'moment/src/locale/zh-cn';
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'
import styles from './List.less'

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
};

const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};

const  ColPropses={
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};

const formItemLayouts = {
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
};

const TwoColProps = {
    ...ColProps,
    xl: 96,
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
  const handleFields = (fields) => {
    const { recordDate } = fields
    if (recordDate.length) {
      fields.recordDate = [recordDate[0].format('YYYY-MM-DD'), recordDate[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields)
    onFilterChange(fields)
  };

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
  };

  const { name } = filter
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
          {getFieldDecorator('name', {
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
      <Col {...ColPropses}>
        <FormItem label="拨打时间"  {...formItemLayouts}>
          {getFieldDecorator('recordDate', {initialValue: initialCreateTime
          })(<RangePicker style={{ width: '90%' }} />)}
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
  </div>
)
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
