import React from 'react';
import PropTypes from 'prop-types';
import { config } from 'utils';
import classnames from 'classnames';
import CarInsurance from './carInsurance';
import FinalOffer from './finalOffer';
import ExpressInformation from './expressInformation';
import Time from './Time';
import { Form, Input, InputNumber, Radio, Modal, Cascader,Button } from 'antd';
import styles from './offer.less';
import UserInfo from './userInfo';

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
  onCancel,
  addRemarkFunc,
  RemarkCancel,
  visibleRemark,
  remarkId,
  saveRemarkFunc,
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
      };
      onOk(data)
    })
  };

  const CancelRemark=()=>{
    RemarkCancel()
  };

  const saveRemark=(data)=>{
    saveRemarkFunc(data)
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  const RemarkOpts={
    visibleRemark,
    RemarkCancel:CancelRemark,
    saveRemark:saveRemark,
    addRemark(id){
      addRemarkFunc(id)
    },
    remarkId:remarkId,
  };

  return (
    <Modal {...modalOpts}   footer={[
      <Button key="submit" type="primary"  onClick={onCancel}>
        关闭
      </Button>,
    ]}>
        <div className={styles.offerBoxb} >
            <div className={styles.leftB}>
              <UserInfo {...RemarkOpts} />
              <ExpressInformation />
              <FinalOffer />
            </div>
            <div  className={styles.rightB}>
              <CarInsurance />
              <Time />
            </div>
        </div>
    </Modal>
  )
};

Offermodal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel:PropTypes.func,
}

export default Form.create()(Offermodal)
