import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';
import Title from './title';
import { FilterItem } from 'components';
import { Form, Button, Row, Col, DatePicker, Input,  Select ,Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
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
const formItemLayout2 = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 19,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const formItemLayout3 = {
  labelCol: {
    span:4,
  },
  wrapperCol: {
    span: 20,
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
  sm: 14,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const  ColProps3={
  xs: 24,
  sm: 17,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const SendInfo = ()=>{
  return (
    <div className={classnames(styles.SendInfo,styles.Quote)}>
      <Title title='保单派送信息'/>
    </div>
  )

}
SendInfo.propTypes = {

}
export default SendInfo
