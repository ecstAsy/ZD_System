/**
 * Created by Administrator on 2018/7/2 0002.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input } from 'antd';
import { DropOption } from 'components';
import { Link } from 'react-router-dom';
import styles from './List.less';

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
    fontSize:'15',
  }
};

const List = ({...listProps, ListData, isEdit,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue }
}) => {
  return (
    <Row>
      <Row style={{marginBottom:15,marginTop:15}}>
        {
          ListData.map((list,i)=>{
            return (
              <Col span={6}>
                <div>
                  {
                    !isEdit? <div className="useInfoRow"><p>{list.name}</p><p>
                      {list.num}</p></div>:
                      <FormItem  {...formItemLayout} label={list.name} >
                        {getFieldDecorator(`${list.name}`,{
                          initialValue:`${list.num}`
                        })(<Input />)}
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

List.propTypes = {
  location: PropTypes.object,
}

export default Form.create() (List)

