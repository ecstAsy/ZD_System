import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, DatePicker, Select, Input, Radio } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span:7,
  },
  wrapperCol: {
    span: 17,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14',
    color:'#333'
  }
}

const FilterModal = ({...filterProps, handleCancel,
     form: { getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{
  return (
    <Modal className={classnames(styles.FilterModal)}
      {...filterProps}
    footer={[
      <Button type="primary" key="submit">确定</Button>,
      <Button key="back" onClick={handleCancel}>关闭</Button>
    ]}>
       <Row>
         <Col span={12}>
           <FormItem {...formItemLayout} label='初登日期'>
             {getFieldDecorator('firstRegisterTime') (
               <RangePicker />
               )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='车龄'>
             {getFieldDecorator('driverTime') (
               <Select showSearch style={{ width: '80%' }} placeholder="请选择" >
                 <Option value="a">1年</Option>
                 <Option value="b">2年</Option>
                 <Option value="c">3-6年</Option>
                 <Option value="d">6年以上</Option>
               </Select>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='厂牌型号'>
             {getFieldDecorator('carType') (
               <Input style={{ width: '70%' }} />
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='车辆所属'>
             {getFieldDecorator('carUsePeople') (
               <RadioGroup>
                 <Radio value="a">个人</Radio>
                 <Radio value="b">单位</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='保险到期日'>
             {getFieldDecorator('insuranceExpireTime') (
               <RangePicker />
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='过户车'>
             {getFieldDecorator('changeNameCar') (
               <RadioGroup>
                 <Radio value="a">是</Radio>
                 <Radio value="b">否</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='上年保险公司'>
             {getFieldDecorator('lastYearInsuranceCompany') (
               <Select showSearch style={{ width: '70%' }} placeholder="请选择" >
                 <Option value="a">平安</Option>
                 <Option value="b">太保</Option>
               </Select>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='续保'>
             {getFieldDecorator('renewalInsurance') (
               <RadioGroup>
                 <Radio value="a">非续保</Radio>
                 <Radio value="b">续保</Radio>
                 <Radio value="c">次续保</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='车价'>
             {getFieldDecorator('carSalary') (
               <div>
                 <Input style={{ width: 65, textAlign: 'center' }} />
                 <Input style={{ width: 30, border: 'none', pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                 <Input style={{ width: 65, textAlign: 'center' }} />
               </div>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='在职续保'>
             {getFieldDecorator('onWorkRenewal') (
               <RadioGroup>
                 <Radio value="a">是</Radio>
                 <Radio value="b">否</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='市场'>
             {getFieldDecorator('area') (
               <Select showSearch style={{ width: '70%' }} placeholder="请选择" >
                 <Option value="a">苏州</Option>
                 <Option value="b">无锡</Option>
               </Select>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='高端车'>
             {getFieldDecorator('highEndCar') (
               <RadioGroup>
                 <Radio value="a">是</Radio>
                 <Radio value="b">否</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='车牌号'>
             {getFieldDecorator('carPlate') (
               <Input style={{ width: '70%' }} />
             )}
           </FormItem>
         </Col>
         <Col span={12}>
           <FormItem {...formItemLayout} label='清洗名单'>
             {getFieldDecorator('washList') (
               <RadioGroup>
                 <Radio value="a">是</Radio>
                 <Radio value="b">否</Radio>
               </RadioGroup>
             )}
           </FormItem>
         </Col>
       </Row>
    </Modal>
  )
}

FilterModal.propTypes = {
  handleCancel : PropTypes.func
}

export default Form.create() (FilterModal)
