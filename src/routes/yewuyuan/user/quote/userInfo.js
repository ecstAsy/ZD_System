import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './offer.less'
const Option = Select.Option;
const { RangePicker } = DatePicker
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span:8,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    borderRadius:'20px',
    fontSize:'14px',
    marginBottom:'10px'
  }
};
const ColProps = {
  xs: 24,
  sm: 8,
};
const UserInfo = ({
  addRemarkFunc,
  openUnderwriting,
  choosePurCar,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...UserInfoProps
})=>{
    const addRemark = ()=>{
      addRemarkFunc()
    };
    const remarks=[
      {id:1,date:'20180311',des:'备注1'},
      {id:2,date:'20180517',des:'备注2'},
      {id:3,date:'20180613',des:'备注3'},
    ];
   const editRemark=(id)=>{
     addRemarkFunc(id)
   };

  return (
    <div className="useinfoBox">
      <div className='header'> <img src="/ghef_03.png"/><span>客户信息</span></div>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem label="姓名" {...formItemLayout}>
            <div>阿道夫</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="联系电话" {...formItemLayout}>
            <div>18662511029
              <Icon style={{fontSize:'18px'}} className="chengbao" type="phone"/>
              <span style={{color:'#939BA4'}} > 无效名单？</span>
            </div>

          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="车牌" {...formItemLayout}>
            <div>苏EH7F57</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="厂牌型号" {...formItemLayout}>
            <div>别克威朗HGT578656</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="发动机号" {...formItemLayout}>
            <div>15646+55</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="车架号" {...formItemLayout}>
            <div>BOHU767VHIVG564<span onClick={()=>openUnderwriting()} className="chengbao">承保信息</span></div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="核定座位" {...formItemLayout}>
            <div>5</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="初登日期" {...formItemLayout}>
            {getFieldDecorator('beginDate')(<DatePicker  style={{ width: '70%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="保险到期日" {...formItemLayout}>
            {getFieldDecorator('endDate')(<DatePicker  style={{ width: '70%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="年检有效期" {...formItemLayout}>
            {getFieldDecorator('useDate')(<DatePicker  style={{ width: '70%' }} />)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="上年投保公司" {...formItemLayout}>
            {getFieldDecorator('company')(<Select
              showSearch
              style={{ width: '70%' }}
              placeholder="请选择"
            >
              <Option value="china">A</Option>
              <Option value="use">B</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="使用性质" {...formItemLayout}>
            {getFieldDecorator('xingzhi')(<Select
              showSearch
              style={{ width: '70%' }}
              placeholder="请选择"
            >
              <Option value="china">A</Option>
              <Option value="use">B</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="车辆种类" {...formItemLayout}>
            {getFieldDecorator('xingzhi')(<Select
              showSearch
              style={{ width: '70%' }}
              placeholder="请选择"
            >
              <Option value="china">A</Option>
              <Option value="use">B</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="新车购置价" {...formItemLayout}>
            {getFieldDecorator('carPrice')(<Input style={{ width: '70%' }} />)}
            <span className="chengbao" onClick={choosePurCar}>查找</span>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="其他联系方式" {...formItemLayout}>
            {getFieldDecorator('telOther')(<Input style={{ width: '70%' }} />)}
            <Icon style={{fontSize:'18px'}}  className="chengbao" type="phone" />
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="历史拨打记录" {...formItemLayout}>
            {getFieldDecorator('historyTel')(<Select
              showSearch
              style={{ width: '70%' }}
              placeholder="请选择"
            >
              <Option value="china">A</Option>
              <Option value="use">B</Option>
            </Select>)}
          </FormItem>
        </Col>
      </Row>
      <div className="useInfoRow">
        <div>备注：</div>
        <div className='remarks'>
          <div className='line'>
            {remarks.map((item,key)=>{
              return(
                <div className='mokuai' key={key}>
                  <span className="oridel"></span>
                  <p className="date">{item.date}</p>
                  <div className="remarkShow">
                    这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注
                    <p><span onClick={()=>editRemark(item.id)}><Icon type="edit" />修改</span></p>
                  </div>
                </div>
              )
            })}
            <div className='mokuai' style={{borderTop:'none'}}>
              <span className="oridel" style={{marginTop:'-5px'}}></span>
              <p className="date addRemark" onClick={addRemark}>新增</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form.create()(UserInfo)
