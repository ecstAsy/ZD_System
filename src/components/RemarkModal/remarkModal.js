import React from 'react'
import { Form, Input, Modal} from 'antd'
const { TextArea } = Input;
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
