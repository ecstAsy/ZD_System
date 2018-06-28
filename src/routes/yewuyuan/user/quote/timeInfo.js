import React from 'react';
import Title from './title';
import classnames from 'classnames';
import styles from './index.less';
import PropTypes from 'prop-types';
import { Form, Row, Col, DatePicker, Button } from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
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
  sm: 16,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const TimeInfo = ({form: {
  getFieldDecorator,
  getFieldsValue,
  setFieldsValue,
}})=>{
  return (
     <div className={classnames(styles.Quote,styles.TimeInfo)}>
       <Title title={`时间信息`}/>
       <Row gutter={24}>
       <Col {...ColProps}>
         <FormItem label="交强险" {...formItemLayout}>
           {getFieldDecorator('compulsory', {
           })(<div><DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" /><span className="cutTxt">至</span><DatePicker />
             <Button className="timeBtn" >同下</Button></div>)}
         </FormItem>
       </Col>
       </Row>
       <Row gutter={24}>
         <Col {...ColProps}>
           <FormItem label="商业险" {...formItemLayout}>
             {getFieldDecorator('commercial', {
             })(<div><DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" /><span className="cutTxt">至</span><DatePicker />
               <Button className="timeBtn" >同上</Button></div>)}
           </FormItem>
         </Col>
       </Row>

     </div>
  )
}
export default Form.create()(TimeInfo)
