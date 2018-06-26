import React from 'react';
import { Form, Row, Col,Input } from 'antd';
import Title from './title';
import classnames from 'classnames';
import styles from './index.less';
import { FilterItem } from 'components';
import PropTypes from 'prop-types'
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
const SendInfo = ({form: {
  getFieldDecorator,
  getFieldsValue,
  setFieldsValue,
}})=>{
  const fields = getFieldsValue();
   return(
     <div className={classnames(styles.SendInfo,styles.Quote)}>
       <Title title={`保单派送信息`}/>
       <Row gutter={24}>
         <Col {...ColProps}>
           <FormItem label="业务员" {...formItemLayout}>
             {getFieldDecorator('salesman', {})(<Input/>)}
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
