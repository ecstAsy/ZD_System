import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Checkbox ,Table,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './index.less'
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {

  },
};




const DeductiblesModal =({
  item = {},
  onOk,
  deductiblesData,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...DeductiblesProps
})=>{



  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      console.log(data)
      onOk(data)
    })
  }
  const modalOpts = {
    ...DeductiblesProps,
    onOk: handleOk,
  }
  console.log(deductiblesData)
  return(
    <Modal
      {...modalOpts}
    >
      {getFieldDecorator('carId',)(
        <CheckboxGroup style={{width:'100%'}}>
        <Row gutter={24} style={{paddingLeft:'20%'}}>
          {
            deductiblesData.map((i,key)=>{
              return (
                <Col {...ColProps} key={key}>
                  <Checkbox value={i.id}>{i.name}</Checkbox>
                </Col>
                )

            })
          }
        </Row>

      </CheckboxGroup>)}



    </Modal>
  )
}
DeductiblesModal.prototype = {


}
export default Form.create()(DeductiblesModal)
