import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
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
    fontSize:'14px'
  }
};
const formItemLayout2 = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 19,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const formItemLayout3 = {
  labelCol: {
    span:4,
  },
  wrapperCol: {
    span: 20,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};
const ColProps = {
  xs: 24,
  sm: 7,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const ColProps2={
  xs: 24,
  sm: 14,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};
const  ColProps3={
  xs: 24,
  sm: 17,
  style: {
    marginBottom: 10,
    marginRight:10
  },
};

const Filter = ({ filter, dispatch, SaveUserInfo, history,
    form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  const handleFields = (fields) => {
    fields.carCheckTime = fields.carCheckTime && fields.carCheckTime.format('YYYYMMDD');
    fields.firstLoginTime = fields.firstLoginTime && fields.firstLoginTime.format('YYYYMMDDHH');
    return fields
  };
  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    SaveUserInfo(fields)
  };
  const handleCancel = () =>{
    history.push('/user')
  };
  return (
    <div>
      <Form>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="客户姓名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                rules:[
                  { required: true, message: 'userName is required!' },
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="车牌型号"  {...formItemLayout}>
              {getFieldDecorator('plateType')(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="发动机号"  {...formItemLayout}>
              {getFieldDecorator('engineType')(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="核定座位"  {...formItemLayout}>
              {getFieldDecorator('engineType')(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="车牌号码"  {...formItemLayout}>
              {getFieldDecorator('plateNum',{
                rules:[
                  { required: true, message: 'plateNum is required!' },
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="车架号码"  {...formItemLayout}>
              {getFieldDecorator('frameNum')(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="车检有效期" >
              {getFieldDecorator('carCheckTime')(
                <DatePicker placeholder="请选择"/> )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="联系电话"  {...formItemLayout}>
              {getFieldDecorator('userPhone',{
                rules: [
                  { required: true, message: 'userPhone is required!' }
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="其他联系方式"  {...formItemLayout}>
              {getFieldDecorator('otherContactWay', {
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="上年投保公司"  {...formItemLayout}>
              {getFieldDecorator('pastCompany', {
              })(<Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="使用性质"  {...formItemLayout}>
              {getFieldDecorator('useType', {
              })(<Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="车辆种类"  {...formItemLayout}>
              {getFieldDecorator('carType', {
              })(<Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem label="身份证号码"  {...formItemLayout}>
              {getFieldDecorator('IDNumber',{
                rules: [
                  { required: true, message: 'IDNumber is required!' },
                  {pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,message: '请输入正确格式的身份证号码!',},
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps2}>
            <FormItem label="联系地址" {...formItemLayout2}>
              {getFieldDecorator('userAddress',{})(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="初次登陆日期" >
              {getFieldDecorator('firstLoginTime',{})(
                <DatePicker placeholder="请选择"/> )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="保险到期日" >
              {getFieldDecorator('expirationTime',{})(
                <DatePicker placeholder="请选择"/> )}
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="新车购置价"  {...formItemLayout}>
              {getFieldDecorator('carPrice', {
              })(<Input addonAfter="万"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps}>
            <FormItem {...formItemLayout} label="市场" >
              {getFieldDecorator('userArea',{
                rules:[
                  { required: true, message: 'userArea is required!' }
                ]
              })(
                <Select showSearch style={{ width: '100%' }} placeholder="请选择" dropdownStyle={{lineHeight:'25px'}} >
                  <Option value="china">China</Option>
                  <Option value="use">U.S.A</Option>
                </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps3}>
            <FormItem label="备注"  {...formItemLayout3}>
              {getFieldDecorator('moreInfo', {
              })(<TextArea autosize={{ minRows: 4, maxRows: 4 }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={2}>
            <Button size="large" type="primary" onClick={handleSubmit}>
              保存
            </Button>
          </Col>
          <Col span={2}>
            <Button size="large"  onClick={handleCancel}>
             取消
            </Button>
          </Col>
        </Row>
      </Form>
    </div>

  )

}
Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  history: PropTypes.object,
  SaveUserInfo:PropTypes.func,
}
export default Form.create()(Filter)
