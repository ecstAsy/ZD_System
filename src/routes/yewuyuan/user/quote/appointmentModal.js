/**
 * Created by Administrator on 2018/7/19 0019.
 */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Checkbox, Row, Col, Form, DatePicker, Button, Radio, } from 'antd';
import classnames from 'classnames';
import publicStyles from '../../../publicStyle.less';
import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:6,
  },
  wrapperCol: {
    span: 18,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14'
  }
}
const ColProps = {
  xs: 26,
  sm: 6,
  style: {
    marginBottom: 10,
  },
};
const AppointmentModal = ({...appointmentProps, appointmentData, choseappointment, handleCancel,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{
  const handleSubmit = ()=>{
    let fields = getFieldsValue();
  };

  const disabledDate=(current)=> {
    let curDate = Date.now();
    let seven = 7 * 24 * 3600 * 1000;
    let sevendate = curDate + seven;
    return current && current < Date.now() - 8.64e7 || current > sevendate;
  };

  return (
    <Modal className={classnames(publicStyles.Modal)}
           {...appointmentProps}
           footer={[
             <Button  type="primary" onClick={handleSubmit}>保存</Button>,
             <Button onClick={handleCancel}>取消</Button>,
           ]}
          >
      <Row>
        <Col span={20}>
          <FormItem {...formItemLayout} label="预约时间：">
            {getFieldDecorator('finalTime')(
              <DatePicker
                showTime={true}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间"
                disabledDate={disabledDate}
                style={{ width: '60%' }}/>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="预约级别：">
            <Radio.Group>
              {
                appointmentData.map((item,i)=>{
                  return (
                    <Col {...ColProps}>
                      <Radio value={`${item.name}`} key={i} onClick={()=>choseappointment(i.id)}>{item.name}</Radio>
                    </Col>
                  )
                })
              }
            </Radio.Group>
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}

AppointmentModal.propTypes = {
  handleCancel : PropTypes.func,
  showSelectList : PropTypes.func,
  choseappointment: PropTypes.func,
}

export default Form.create() (AppointmentModal)
