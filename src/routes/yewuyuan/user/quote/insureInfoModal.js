import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import classnames from 'classnames';
import publicStyles from '../../../publicStyle.less';
import { PolicyTable } from 'components';

const InsureInfoModal = ({...InsureInfoModalProps,handleCancel})=>{
  return (
    <Modal className={classnames(publicStyles.Modal)}
      {...InsureInfoModalProps}
      footer={[
        <Button  type="primary">保存</Button>,
        <Button onClick={handleCancel}>取消</Button>
      ]}>
      <PolicyTable/>
    </Modal>
  )
}
InsureInfoModal.propTypes = {
  handleCancel:PropTypes.func
}
export default InsureInfoModal
