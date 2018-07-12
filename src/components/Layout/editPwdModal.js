import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Icon ,Row, Col,} from 'antd'
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
  xs: 18,
}
const ColProps2 = {
  xs: 6,
  style:{lineHeight:'36px',color:'#a6a6a6'}
}
const EditPwdModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...editPwdModalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
      onOk(data)
    })
  }

  const modalOpts = {
    ...editPwdModalProps,
    onOk: handleOk,
  }
  const  compareToFirstPassword=(rule, value, callback)=>{
    const data = {
      ...getFieldsValue(),
    };
    if (value && value !== data['newPwd']) {
      callback('确认密码不一致');
    } else {
      callback();
    }
  }

  return (
    <Modal {...modalOpts}>
        <div>
          <Form layout="horizontal">
            <Row gutter={24}>
              <Col {...ColProps}>
                <FormItem label="旧密码" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('oldPwd', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        pattern: /^[a-zA-Z0-9]{6,15}$/,
                        message: '密码6-15位',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps2}>
                密码6-15位
              </Col>
            </Row>
            <Row gutter={24}>
              <Col {...ColProps}>
                <FormItem label="新密码" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('newPwd', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        pattern: /^[a-zA-Z0-9]{6,15}$/,
                        message: '密码6-15位',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps2}>
                密码6-15位
              </Col>
            </Row>
            <Row gutter={24}>
              <Col {...ColProps}>
                <FormItem label="新密码确认" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('confirmPwd', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入确认密码',
                      },
                      {
                        validator:compareToFirstPassword,
                      }
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps2}>
              </Col>
            </Row>
          </Form>
        </div>
    </Modal>
  )
}

EditPwdModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(EditPwdModal)
