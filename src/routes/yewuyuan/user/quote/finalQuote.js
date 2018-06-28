import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Row, Col, Radio, Input } from 'antd';
import Title from './title';
import styles from './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
const FinalQuote  = ({
  sendNote,
  chooseGift,
  form:{
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  }})=>{
  const titleProps = {
    title:`最终报价`,
    sendNote
  }
  return (
    <div className={classnames(styles.Quote,styles.FinalQuote)}>
      <Title {...titleProps}/>
       <Row gutter={24}>
         <Col {...ColProps}>
           <FormItem label="客户类型" {...formItemLayout}>
             {getFieldDecorator('userType', {
               initialValue:'a'
             })(<RadioGroup>
               <Radio value="a">A</Radio>
               <Radio value="b">B</Radio>
             </RadioGroup>)}
           </FormItem>
         </Col>
         <Col {...ColProps}>
           <FormItem label="赠送礼品" {...formItemLayout}>
             {getFieldDecorator('giveGoods', {
               initialValue:'a'
             })(<span className='checkGoods' onClick={chooseGift}>选择礼品</span>)}
           </FormItem>
         </Col>
       </Row>
       <p className='cutLine'></p>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem  {...formItemLayout} label="商业险金额">
            <span>0.00</span>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="交强险金额" >
            <span>0.00</span>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem  {...formItemLayout} label="车船税">
            <span>0.00</span>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem  {...formItemLayout} label="开单保费">
            <span>0.00</span>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem {...formItemLayout} label="优惠额度" >
            {getFieldDecorator('preferential',{
              initialValue:'0.00'
            })(
              <Input/> )}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem  {...formItemLayout} label="实收金额">
            <span>0.00</span>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}
FinalQuote.prototype = {
  sendNote:PropTypes.func,
  chooseGift:PropTypes.func,
  form: PropTypes.object
}
export default Form.create()(FinalQuote)
