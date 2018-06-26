import React from 'react'
import PropTypes from 'prop-types'
import { config } from 'utils'
import classnames from 'classnames'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import styles from './offer.less'
import CarInsurance from './carInsurance'
import FinalOffer from './finalOffer'
import ExpressInformation from './expressInformation'
import Time from './Time'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Offermodal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ');
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
        <div className={styles.offerBoxb} >
          <div className={styles.leftB}>
            <div className={styles.logo}>
              <table className={styles.ulForm}>
                <img alt="logo" src={config.logo3} />
                客户信息</table>
            </div>
            <div className={styles.logo}>
              <table className={styles.ulForm}>
                <img alt="logo" src={config.logo3} />
                最终报价</table>
              <FinalOffer />
            </div>
            <div className={styles.logo}>
              <table className={styles.ulForm}>
                <img alt="logo" src={config.logo3} />
                保单派送信息</table>
              <ExpressInformation />
            </div>
          </div>
          <div  className={styles.rightB}>
            <div className={styles.logo}>
              <table className={styles.ulForm}>
                <img alt="logo" src={config.logo3} />
                车险选项</table>
              <CarInsurance />
            </div>
            <div className={styles.logo}>
            <table className={styles.ulForm}>
              <img alt="logo" src={config.logo3} />
              时间信息</table>
            <Time />
          </div>
          </div>
        </div>
    </Modal>
  )
}

Offermodal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(Offermodal)
