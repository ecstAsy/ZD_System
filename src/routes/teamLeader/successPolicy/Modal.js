import React from 'react';
import PropTypes from 'prop-types';
import { config } from 'utils';
import CarInsurance from './carInsurance';              // 车险选项
import FinalOffer from './finalOffer';                  // 保单派送信息
import ExpressInformation from './expressInformation';  // 最终报价
import Time from './Time';                              // 时间信息
import {Modal, Button } from 'antd';
import styles from './offer.less';
import UserInfo from './userInfo';                      // 客户信息
import {RemarkMadal} from 'components';

const Offermodal = ({item = {}, onCancel, addRemarkFunc, RemarkCancel, visibleRemark, remarkId, saveRemarkFunc, ...modalProps
}) => {
  const modalOpts = {
    ...modalProps
  };

  const RemarkOpts={
    visibleRemark,
    addRemark(id){
      addRemarkFunc(id)
    },
    remarkId:remarkId
  };

  const RemarkMadalProps={
    visible: visibleRemark,
    title:remarkId==''?'新增备注':'修改备注',
    onOk(data){
      saveRemarkFunc(data)
    },
    onCancel(){
      RemarkCancel()
    }
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
            <div className={styles.rightB}>
              <CarInsurance />
              <Time />
            </div>
          {visibleRemark&&<RemarkMadal {...RemarkMadalProps}/>}
        </div>
    </Modal>
  )
};

Offermodal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel:PropTypes.func
}
export default Offermodal
