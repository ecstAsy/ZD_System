/**
 * Created by Administrator on 2018/7/19 0019.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Checkbox, Modal, Button} from 'antd';
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
  failureData, chosefailure, handleCancel,
  ...FailureProps
})=>{
  const handleSubmit =() =>{
    let fields = getFieldsValue();
  };
  return(
    <Modal className={classnames(publicStyles.Modal)}
      {...FailureProps}
           footer={[
             <Button  type="primary" onClick={handleSubmit}>保存</Button>,
             <Button onClick={handleCancel}>取消</Button>,
           ]}
    >
      <Row gutter={24} style={{paddingLeft:'20%'}}>
        {
          failureData.map((i,key)=>{
            return (
              <Col {...ColProps} key={key}>
                <Checkbox checked={i.checked} value={i.id} onClick={()=>chosefailure(i.id)}>{i.name}</Checkbox>
              </Col>
            )
          })
        }
      </Row>
    </Modal>
  )
};
FailureModal.prototype = {
  chosefailure: PropTypes.func,

}
export default Form.create()(FailureModal)
