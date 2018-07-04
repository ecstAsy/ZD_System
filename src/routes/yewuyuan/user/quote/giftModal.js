import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Form , Input, Tag } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:12,
  },
  wrapperCol: {
    span: 12,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
}
const GiftModal = ({...giftModalProps, handleCancel, handleCost, handleAdd, TagClose, GiftData,
     form:{ getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{

  const handleSubmit = ()=>{
    let fields = getFieldsValue();
  };

  return (
    <Modal {...giftModalProps} className={classnames(styles.NoteModal,styles.GiftModal)}
           footer={[
             <Button  type="primary" onClick={handleSubmit}>保存</Button>,
             <Button onClick={handleCancel}>取消</Button>,
           ]}>
      <div className="checkedGift">
        <span>已选：</span>
        {
          GiftData.map((item,i)=>{
            if(item.Num!=0){
              if(item.Num!=1){
                return ( <Tag className='tag' onClose={()=>TagClose(item.id)} closable>{`${item.title} * ${item.Num}`}</Tag> )
              }else{
                return ( <Tag className='tag' onClose={()=>TagClose(item.id)} closable>{`${item.title}`}</Tag> )
              }
            }
          })
        }
      </div>
      <div className="giftContent">
        <div className="giftContentHeader">
          <Row>
            <Col span={12}>
              <span>礼品名称</span>
              <span>数量</span>
            </Col>
            <Col span={12}>
              <span>礼品名称</span>
              <span>数量</span>
            </Col>
          </Row>
        </div>
        <div className="giftItem">
          <Row>
            {
              GiftData.map((gift,i)=>{
                return (
                  <Col span={12} key={i}>
                    <FormItem>
                      {getFieldDecorator(`${gift.title}`, {
                      })(<div className="gift">
                        <span className="giftTitle">{gift.title}</span>
                        <div className="giftNum">
                          <Button className={gift.Num>1?'cost active' : 'cost'} onClick={()=>handleCost(gift.id)}>-</Button><Input value={`${gift.Num}`} className='input'/><Button className='add active' onClick={()=>handleAdd(gift.id)}>+</Button>
                        </div>
                      </div>)}
                    </FormItem>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
    </Modal>
  )
}

GiftModal.propTypes = {
  handleCancel : PropTypes.func,
}

export default Form.create() (GiftModal)

