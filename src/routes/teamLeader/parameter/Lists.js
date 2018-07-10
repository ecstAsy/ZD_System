/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input } from 'antd'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import styles from './List.less'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:10,
  },
  wrapperCol: {
    span: 14,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'15'
  }
};
const Lists = ({...listProps, ListData, isEdit,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue }
}) => {
  return (
    <Row>
      <Row style={{marginBottom:20,marginTop:15}}>
        {
          ListData.map((lists,i)=>{
            return(
              <Col span={6}>
                <div>
                  {
                    !isEdit? <div className="useInfoRow"><p>{lists.name}</p><p>{lists.num}</p></div>:
                      <FormItem {...formItemLayout} label={lists.name}>
                        {getFieldDecorator('num',{
                          initialValue:lists.num
                        })(
                          <Input />
                        )}
                      </FormItem>
                  }
                </div>
              </Col>
            )
          })
        }
      </Row>
    </Row>
  )
}

Lists.propTypes = {
  location: PropTypes.object,
}

export default Form.create()(Lists)
