import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './offer.less'
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker
const FormItem = Form.Item
const RemarkMadal =({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...RemarkMadalProps
})=>{

  const handleOk=()=>{
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }
  const RemarkOpts={
      ...RemarkMadalProps,
    onOk: handleOk,

  }

  return(
    <Modal
      {...RemarkOpts}
    >
      <FormItem>
        {getFieldDecorator('remark', {
          rules: [
            {
              required: true,
              message: '备注信息不能为空!',
            },
          ],
        })( <TextArea className="textarerRemark" placeholder="请输入备注内容"  />)}
      </FormItem>
    </Modal>
  )
}
export default Form.create()(RemarkMadal)
