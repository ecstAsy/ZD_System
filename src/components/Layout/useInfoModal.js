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
  xs: 24,
  sm: 12,
}
const UseInfoModal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps,
  openEditPwdModalFunc,
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
    ...modalProps,
    onOk: handleOk,
  };
  const  openEditPwdModal = e =>{
    openEditPwdModalFunc()
  }

  return (
    <Modal {...modalOpts}>
      <div>
        <div>
          <img src="/ghef_03.png"/>
          <span className={styles.title}>账号信息</span>
          <span className={styles.editPwd} onClick={openEditPwdModal}><Icon type="edit" style={{ fontSize: 16, color: '#0082fe' }} />修改密码</span>
        </div>
        <div>
            <p className={styles.name}>张某某</p>
            <p className={styles.zu}>中德呼叫一组</p>
        </div>
        <div className={styles.rowTwo2}>
          <img src="/ghef_03.png"/>
          <span className={styles.title}>基本资料</span>
        </div>
        <div>
          <Form layout="horizontal">
            <Row gutter={24}>
              <Col {...ColProps}>
                <FormItem label="手机号" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('phone', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        pattern: /^1[34578]\d{9}$/,
                        message: '请输入正确格式的手机号!',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps}>
                <FormItem label="单日跟踪上限" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('count', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col {...ColProps}>
                <FormItem label="作息编号" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('num', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps}>
                <FormItem label="本月绩效额度" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('edu', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

UseInfoModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(UseInfoModal)
