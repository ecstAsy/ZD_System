import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Button,Radio, Modal, Cascader,Icon ,Row, Col,} from 'antd'
import styles from './model.less'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  xs: 24,
  sm: 12,
}
const SpeechcraftModal = ({
  choseItem,
  currentItem,
  choseDesId,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...speechcraftModalProps
}) => {
  const handleOk = () => {
    onOk()
  }
  const choseDesIdFunc = (item) => {
    choseDesId(item)
  }

  const modalOpts = {
    ...speechcraftModalProps,
    onOk: handleOk,
    choseDesId:choseDesIdFunc,

}
  console.log(choseItem)
  return (
    <Modal {...modalOpts}>
      <div className={styles.choseItem}>
        {
           choseItem.map((item,key)=>{
            return <span className={currentItem.id==item.id?styles.active:null} key={key} onClick={()=>choseDesIdFunc(item)}>{item.title}</span>
          })
        }
      </div>
      <div className={styles.desTxtBox}>
        {currentItem.detail}
      </div>
      <div style={{textAlign:'center',marginTop:'30px'}}>
        <Button type="primary" style={{width:'120px',height:'40px',fontSize:'16px'}} onClick={handleOk}>确定</Button>
      </div>
    </Modal>
  )
}

SpeechcraftModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(SpeechcraftModal)
