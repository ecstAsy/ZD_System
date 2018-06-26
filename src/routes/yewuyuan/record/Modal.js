/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
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
    }
    data.address = data.address.join(' ')
    onOk(data)
  })
  }

  const modalOpts = {
      ...modalProps,
    onOk: handleOk,
}

  return (
    <Modal {...modalOpts}>
<Form layout="horizontal">

    {/*<FormItem label="Link" hasFeedback {...formItemLayout}>*/}

{/*</FormItem>*/}

  </Form>
  </Modal>
)
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)