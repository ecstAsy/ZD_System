/**
 * Created by Administrator on 2018/7/9 0009.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'moment/src/locale/zh-cn';
import { Form, Button, Row, Col, DatePicker, Input,  Select } from 'antd';
import styles from '../../publicStyle.less';


const Option = Select.Option;
const { Search } = Input;
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
  }
};
const  ColPropsLong={
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 10,
    marginRight:10
  }
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
    fontSize:'14px'
  }
};

const Filter = ({ FilterSearch, filter,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue },
}) => {
  const { carPlate, applyStatus, team, salesman, applyTime }=filter;

  const handleFields = (fields) => {
    if (fields.applyTime && fields.applyTime instanceof Array  && fields.applyTime.length > 1) {
      fields.applyTime = [fields.applyTime[0].format('YYYYMMDD'), fields.applyTime[1].format('YYYYMMDD')]
    }
    return fields
  };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    FilterSearch(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      fields[item] = fields[item] instanceof Array ? [] : undefined;
    }
    setFieldsValue(fields);
    handleSubmit();
  };


  return (
    <div className={styles.searchBox}>
      <form layout="horizontal">
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="车牌" {...formItemLayout}>
              {getFieldDecorator('carPlate', { initialValue: carPlate })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="状态"  {...formItemLayout}>
              {getFieldDecorator('applyStatus', { initialValue: applyStatus})(<Select
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
              {getFieldDecorator('team', {initialValue: team})(<Select
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
              {getFieldDecorator('salesman', {initialValue: salesman})(
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  <Option value="china">China</Option>
                  <Option value="use">U.S.A</Option>
                </Select>)}
            </FormItem>
          </Col>
          <Col {...ColPropsLong}>
            <FormItem label="申请日期"  {...formItemLayoutLong}>
              {getFieldDecorator('applyTime', {initialValue: applyTime})(<RangePicker  style={{ width: '90%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col >
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' ,}}>
              <div>
                <Button type="primary" onClick={handleSubmit}>查询</Button>
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
  form: PropTypes.object,
  filter: PropTypes.object,
  FilterSearch: PropTypes.func,
}

export default Form.create()(Filter)
