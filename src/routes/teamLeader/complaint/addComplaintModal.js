import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Form, Input, Select, DatePicker, Radio } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

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

const AddComplaintModal = ({...addComplaintModalProps, handleCancel, showSelectList, selectedUser,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  return (
    <Modal className={classnames(publicStyles.Modal,styles.AddComplaintModal)}
      {...addComplaintModalProps}
      footer={[
        <Button type="primary" key="submit">确定</Button>,
        <Button key="back" onClick={handleCancel}>取消</Button>
      ]}>
      <Row>
        <Col span={20}>
          <FormItem {...formItemLayout} label="客户">
            {getFieldDecorator('name',{
              initialValue : selectedUser.name
            })(
              <div>
                {
                  selectedUser.name && <span className='NameShow'>{selectedUser.name}</span>
                }
                <span className='NameChoose' onClick={showSelectList}>选择</span>
              </div>
            )}
          </FormItem>
        </Col>
        <Col span={20}>
          <FormItem {...formItemLayout} label="处理业务员">
            {getFieldDecorator('processor',{
              initialValue : selectedUser.processor
            })(
              <Select showSearch style={{ width: '50%' }} placeholder="请选择" >
                <Option value="业务员1">业务员1</Option>
                <Option value="业务员2">业务员2</Option>
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
  handleCancel : PropTypes.func,
  showSelectList : PropTypes.func
}

export default Form.create() (AddComplaintModal)
