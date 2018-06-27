/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import 'moment/src/locale/zh-cn';
import { FilterItem } from 'components'
import classnames from 'classnames'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select ,Icon,TimePicker} from 'antd'

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
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
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
    const { beginDate ,yuyueTime,editTime} = fields;
    console.log(fields);
    if (beginDate.length) {
      fields.beginDate = [beginDate[0].format('YYYYMMDD'), beginDate[1].format('YYYYMMDD')]
    }
    if(yuyueTime){
      fields.yuyueTime = yuyueTime.format('YYYYMMDDHHmmss');
    }
    if(editTime){
      fields.editTime = editTime.format('YYYYMMDDHHmmss');
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
  return (
  <div className={styles.searchBox}>
    <div onClick={()=>isShowMore(isMore)} className={styles.moreChose}>
      {isMore?(<span>收起<Icon type="up" /></span>):(<span>更多筛选<Icon type="down" /></span>)}
    </div>
    <form layout="horizontal">
    <Row gutter={24}>
      <Col {...ColProps}>
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator('usename', {
          })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="手机号"  {...formItemLayout}>
          {getFieldDecorator('phone',{
            rules: [
              {
                pattern: /^1[34578]\d{9}$/,
                message: '请输入正确格式的手机号!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Col>
      <Col {...ColProps}>
        <FormItem label="车牌"  {...formItemLayout}>
          {getFieldDecorator('chepai', {
          })(<Input />)}
        </FormItem>
      </Col>
    </Row>
    <Row gutter={24} style={{display:isMore?'block':'none'}}>
      <Col {...ColProps}>
        <FormItem label="上年保险公司"  {...formItemLayout}>
          {getFieldDecorator('company', {
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
          })(<RangePicker  style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="保险到期日"  {...formItemLayout2}>
          {getFieldDecorator('endDate', { initialValue: initialCreateTime
          })(<RangePicker style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="名单发放日"  {...formItemLayout2}>
          {getFieldDecorator('endDate', {
          })(<RangePicker style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="预约时间"  {...formItemLayout2}>
          {getFieldDecorator('yuyueTime')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="最后操作时间"  {...formItemLayout2}>
          {getFieldDecorator('editTime')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '90%' }} />)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="名单类型"  {...formItemLayout2}>
          {getFieldDecorator('jibie', {
          })(<Select
            showSearch
            style={{ width: '70%' }}
            placeholder="请选择"
            dropdownStyle={{lineHeight:'25px'}}
          >
            <Option value="china">A</Option>
            <Option value="use">B</Option>
          </Select>)}
        </FormItem>
      </Col>
      <Col {...ColProps2}>
        <FormItem label="名单处理状态"  {...formItemLayout2}>
          {getFieldDecorator('jibie', {
          })(<Select
            showSearch
            style={{ width: '70%' }}
            placeholder="请选择"
            dropdownStyle={{lineHeight:'25px'}}
          >
            <Option value="china">A</Option>
            <Option value="use">B</Option>
          </Select>)}
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
