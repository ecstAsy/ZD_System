import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Form ,Button, Input } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

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
  sm: 11,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const NoteModal = ({
   loading,...noteModalProps,choseItem, currentItem, choseDesId, handleCancel,
   form:{
     getFieldDecorator,
     getFieldsValue,
     setFieldsValue,
   }})=>{
  const Note = [{id:1,title:'模板一',detail:'是计算机计算机数据是'},
                {id:2,title:'模板二',detail:'短信模板'}];

  return (
    <Modal {...noteModalProps} className={classnames(styles.NoteModal)}
           footer={[
             <Button  type="primary" loading={loading}>发送</Button>,
             <Button  onClick={handleCancel}>取消</Button>
           ]}>
      <Form>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="发送至其他号码" {...formItemLayout}>
              {getFieldDecorator('ortherPhone', {
              })(<Input/>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="业务员" {...formItemLayout}>
              {getFieldDecorator('action', {
                initialValue:'刘媛媛'
              })(<Input/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
           <FormItem>
             {getFieldDecorator('note',{})(
                 <div className="templateBox">
                   <div className="templateItem">
                     {
                       Note.map((item,i)=>{
                         return (
                           <span className={currentItem.id===item.id?'active':''}  key={i} onClick={()=>choseDesId(item)}>{item.title}</span>
                         )
                       })
                     }
                   </div>
                   <div className="templateContent">{currentItem.detail}</div>
                 </div>
               )}
           </FormItem>
        </Row>
      </Form>
    </Modal>
  )
}

NoteModal.propType = {
  choseDesId : PropTypes.func
}

export default Form.create() (NoteModal)
