import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Form, Input, Select, DatePicker, Radio } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
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

const AddComplaintModal = ({...addComplaintModalProps, handleCancel,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  return (
    <Modal className={classnames(styles.AuditModal,styles.AddComplaintModal)}
      {...addComplaintModalProps}
      footer={[
        <Button type="primary" key="submit">确定</Button>,
        <Button key="back" onClick={handleCancel}>取消</Button>
      ]}>
      <Row>
        <Col span={20}>
          <FormItem {...formItemLayout} label="客户">
            {getFieldDecorator('user')(
              <span className='NameChoose'>选择</span>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="处理业务员">
            {getFieldDecorator('action')(
              <Select showSearch style={{ width: '50%' }} placeholder="请选择" >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="处理截至日期">
            {getFieldDecorator('finalTime')(
              <DatePicker style={{ width: '50%' }}/>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('decoration')(
              <TextArea rows={3}/>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="礼品投诉">
            {getFieldDecorator('compaintType',{
              initialValue: 'a'
            })(
              <RadioGroup>
                <Radio value={'a'}>是</Radio>
                <Radio value={'b'}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}

AddComplaintModal.propTypes = {
  handleCancel : PropTypes.func
}

export default Form.create() (AddComplaintModal)
