import React from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Cascader } from 'antd';
import Title from './title';
import classnames from 'classnames';
import styles from './index.less';
import { FilterItem } from 'components';
import PropTypes from 'prop-types';
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
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const ColProps2 = {
  xs: 24,
  sm: 14,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const SendInfo = ({form: {
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

  const fields = getFieldsValue();
  const onChange = ()=>{

  }
   return(
     <div className={classnames(styles.Quote)}>
       <Title title={`保单派送信息`}/>
       <Row gutter={24}>
         <Col {...ColProps}>
           <FormItem label="业务员" {...formItemLayout}>
             {getFieldDecorator('salesman', {
               initialValue:'刘媛媛'
             })(<Input/>)}
           </FormItem>
         </Col>
         <Col {...ColProps}>
           <FormItem {...formItemLayout} label="派送时间" >
             {getFieldDecorator('sendTime',{})(
               <DatePicker placeholder="请选择"/> )}
           </FormItem>
         </Col>
         <Col {...ColProps}>
           <FormItem label="收件人" {...formItemLayout}>
             {getFieldDecorator('receiver', {
               initialValue:'刘媛媛'
             })(<Input/>)}
           </FormItem>
         </Col>
       </Row>
       <Row gutter={24}>
         <Col {...ColProps}>
           <FormItem label="联系方式" {...formItemLayout}>
             {getFieldDecorator('phoneNum', {
               initialValue:'15252667887'
             })(<Input/>)}
           </FormItem>
         </Col>
         <Col {...ColProps}>
           <FormItem {...formItemLayout} label="收款方式" >
             {getFieldDecorator('payWay',{})(
               <Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                 <Option value="china">China</Option>
                 <Option value="use">U.S.A</Option>
               </Select> )}
           </FormItem>
         </Col>
       </Row>
       <Row gutter={24}>
         <Col {...ColProps2}>
         <FormItem {...formItemLayout2} label="派件地址" >
           {getFieldDecorator('address',{})(
             <Cascader options={options}  placeholder="请选择" />
             )}
         </FormItem>
         </Col>
       </Row>
       <Row gutter={24}>
         <Col {...ColProps2}>
           <FormItem label="备注"  {...formItemLayout2}>
             {getFieldDecorator('moreInfo', {
             })(<TextArea rows={4} />)}
           </FormItem>
         </Col>
       </Row>
     </div>
   )
}
SendInfo.propTypes = {
  form: PropTypes.object,
}
export default Form.create()(SendInfo)
