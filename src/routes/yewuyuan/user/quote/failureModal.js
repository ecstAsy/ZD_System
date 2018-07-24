/**
 * Created by Administrator on 2018/7/19 0019.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Checkbox, Modal, Button, Radio} from 'antd';
import classnames from 'classnames';
import publicStyles from '../../../publicStyle.less';
import styles from './index.less';

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 10,
  },
};

const FailureModal =({
  failureData, chosefailure, handleCancel, ...FailureProps,

})=>{

  const handleSubmit =() =>{
    let fields = getFieldsValue();
  };
  return(
    <Modal className={classnames(publicStyles.Modal,styles.radio)}
      {...FailureProps}
           footer={[
             <Button  type="primary" onClick={handleSubmit}>保存</Button>,
             <Button onClick={handleCancel}>取消</Button>,
           ]}
    >
      <Row gutter={24} style={{paddingLeft:'20%'}}>
        <Radio.Group >
          {
            failureData.map((item,i)=>{
              return (
                <Col {...ColProps}>
                <Radio value={`${item.name}`} key={i} onClick={()=>chosefailure(i.id)}>{item.name}</Radio>
                </Col>
              )
            })
          }
        </Radio.Group>
      </Row>
    </Modal>
  )
};
FailureModal.prototype = {
  chosefailure: PropTypes.func,

}
export default Form.create()(FailureModal)
