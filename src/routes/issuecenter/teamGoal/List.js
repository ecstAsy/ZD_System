/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select ,Icon, TimePicker} from 'antd';
import styles from './index.less';

const Option = Select.Option;
const { Search } = Input;
const { MonthPicker } = DatePicker;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 19,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14',
  }
};
const formItemQuyu={
  labelCol: {
    span:8,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14',
  }
};
const ColProps = {
  xs: 24,
  sm: 6,
  style: {
    marginBottom: 0,
    lineHeight: '30px'
  }
};

const List = ({ teamData, isEdit, handleCancelFunc, saveFunc,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue },
}) => {
  const save=()=>{
    let fields = getFieldsValue();
    fields.month = fields.month && fields.month.format('YYYYMM');
    saveFunc(fields)
  };

  return (
    <div>
      <div className="listBox">
      <Row className='monthPicker'>
        <Col {...ColProps}>
          <FormItem label="月份"  {...formItemLayout}>
            {getFieldDecorator('month')(<MonthPicker format='YYYY-MM' style={{ width: '90%' }} />)}
          </FormItem>
        </Col>
      </Row>
      <Row className='teamMember top'>
        {
          teamData.map((item,key)=>{
            return(
              <Col {...ColProps}>
                <FormItem label={item.quyuName}  {...formItemLayout}>
                  <span>150</span>
                </FormItem>
              </Col>
            )
          })
        }
      </Row>
      {
        teamData.map((item,key)=>{
          return(
            <Row key={key} className='team'>
              <div className="quyuName">{item.quyuName}</div>
              <Row className='teamMember'>
              {item.teamData.map((i,key2)=>{
                return(
                    <Col {...ColProps} key={key2}>
                      <FormItem label={i.name}  {...formItemQuyu}>
                        {!isEdit?<span>{i.num}</span>: getFieldDecorator(`num[${i.name}]`, { initialValue: i.num , rules: [
                            {
                              required: true,
                              message:`${i.name}不能为空`
                            },
                          ],},
                        )(<Input style={{width:'50%'}} />)}
                      </FormItem>
                    </Col>
                )
              })}
              </Row>
            </Row>
          )
        })
      }
      </div>
      <Row className='buttonBox'>
        {
          isEdit?
            <div className="anniu">
              <Button type="primary" onClick={save}>保存</Button>
              <Button onClick={handleCancelFunc}>取消</Button></div>:
            null
        }
      </Row>
    </div>
  )
};

List.propTypes = {

};

export default Form.create()(List)
