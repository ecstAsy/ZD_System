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
    marginBottom: 10,
  },
};

const DeductiblesModal =({
  item = {},
  deductiblesData,
  chosemianpei,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...DeductiblesProps
})=>{
  return(
    <Modal
      {...DeductiblesProps}
    >
        <Row gutter={24} style={{paddingLeft:'20%'}}>
          {
            deductiblesData.map((i,key)=>{
              return (
                <Col {...ColProps} key={key}>
                  <Checkbox checked={i.checked} value={i.id} onClick={()=>chosemianpei(i.id)}>{i.name}</Checkbox>
                </Col>
                )
            })
          }
        </Row>
    </Modal>
  )
};
DeductiblesModal.prototype = {


}
export default Form.create()(DeductiblesModal)
