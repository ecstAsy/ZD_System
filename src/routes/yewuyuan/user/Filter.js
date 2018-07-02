/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { FilterItem } from 'components'
import classnames from 'classnames'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select ,Icon, TimePicker} from 'antd'

import styles from './List.less'

const Option = Select.Option;
const { Search } = Input;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

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
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  }
};
const ColPropsLong = {
  xs: 24,
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const formItemLayoutLong = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
  }
};

const Filter = ({
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
  const { name, phone } = filter;

  const handleFields = (fields) => {
    const { InitialDate} = fields;
    if (InitialDate && InitialDate.length && InitialDate.length > 1) {
      fields.InitialDate = [InitialDate[0].format('YYYYMMDD'), InitialDate[1].format('YYYYMMDD')]
    }
    fields.yuyueTime = fields.yuyueTime && fields.yuyueTime.format('YYYYMMDDHHmmss');
    fields.editTime = fields.editTime && fields.editTime.format('YYYYMMDDHHmmss');
    return fields;
  };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    onFilterChange(fields)
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if (fields[item] instanceof Array) {
        fields[item] = []
      } else {
        fields[item] = undefined
      }
    }
    setFieldsValue(fields);
    handleSubmit()
  };

  //搜索条件日期组件参数整合
  let InitialDate = [];
  if (filter.InitialDate && filter.InitialDate[0]) {
    InitialDate[0] = moment(filter.InitialDate[0])
  }
  if (filter.InitialDate && filter.InitialDate[1]) {
    InitialDate[1] = moment(filter.InitialDate[1])
  }

  return (
    <div className={styles.searchBox}>
      <div onClick={()=>isShowMoreFunc(isMore)} className={styles.moreChose}>
        {isMore?(<span>收起<Icon type="up" /></span>):(<span>更多筛选<Icon type="down" /></span>)}
      </div>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem label="姓名" {...formItemLayout}>
            {getFieldDecorator('name',{ initialValue: name })(<Input />)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="手机号" {...formItemLayout}>
            {getFieldDecorator('phone',{ initialValue: phone })(<Input />)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="车牌"  {...formItemLayout}>
            {getFieldDecorator('plate', {
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24} style={{display:isMore?'block':'none'}}>
        <Col {...ColProps}>
          <FormItem label="上年保险公司"  {...formItemLayout}>
            {getFieldDecorator('preInsuranceCompany')(<Select
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
            {getFieldDecorator('insuranceCompany')(<Select
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
            {getFieldDecorator('yuyueLevel')(<Select
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
        <Col {...ColPropsLong}>
          <FormItem label="初登日期"  {...formItemLayoutLong}>
            {getFieldDecorator('InitialDate',{ initialValue: InitialDate })(<RangePicker  style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColPropsLong}>
          <FormItem label="保险到期日"  {...formItemLayoutLong}>
            {getFieldDecorator('insuranceEndDate')(<RangePicker style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColPropsLong}>
          <FormItem label="名单发放日"  {...formItemLayoutLong}>
            {getFieldDecorator('listDate')(<RangePicker style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColPropsLong}>
          <FormItem label="预约时间"  {...formItemLayoutLong}>
            {getFieldDecorator('yuyueTime')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColPropsLong}>
          <FormItem label="最后操作时间"  {...formItemLayoutLong}>
            {getFieldDecorator('lastOptTime')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColPropsLong}>
          <FormItem label="名单类型"  {...formItemLayoutLong}>
            {getFieldDecorator('listType')(<Select
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
        <Col {...ColPropsLong}>
          <FormItem label="名单处理状态"  {...formItemLayoutLong}>
            {getFieldDecorator('processingState')(<Select
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
          <div className="serachBtnBox">
            <div>
              <Button type="primary" className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </div>
          </div>
        </Col>
      </Row>
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
};

export default Form.create()(Filter)
