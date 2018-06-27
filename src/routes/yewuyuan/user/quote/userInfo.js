import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './offer.less'
const { TextArea } = Input;
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span:8,
  },
  wrapperCol: {
    span: 16,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'15px'
  }
};
const ColProps = {
  xs: 24,
  sm: 8,
  style: {

  },
};
const UserInfo = ({
  visibleRemark,
  addRemark,
  RemarkCancel,
  saveRemark,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
})=>{
  const handleCancel=()=>{
    RemarkCancel()
  }
  const handleOk=()=>{
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
      console.log(data)
      saveRemark(data)
    })

  }
  const remarks=[
    {id:1,date:'20180311',des:'备注1'},
    {id:2,date:'20180517',des:'备注2'},
    {id:3,date:'20180613',des:'备注3'},
  ]

  console.log(visibleRemark)
  return (
    <div className="useinfoBox">
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>客户信息</span></div>
      <Row gutter={24}>
        <Col {...ColProps}>
          <FormItem label="姓名" {...formItemLayout}>
            <div>阿道夫</div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="联系电话" {...formItemLayout}>
            <div>18662511029</div>
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
            <div>BOHU767VHIVG564<span>承保信息</span></div>
          </FormItem>
        </Col>
        <Col {...ColProps}>
          <FormItem label="核定座位" {...formItemLayout}>
            <div>5</div>
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
                    <p><span><Icon type="edit" />修改</span></p>
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
      <Modal
        visible={visibleRemark}
        title='新增备注'
        onCancel={handleCancel}
        onOk={handleOk}
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
    </div>
  )
}
export default Form.create()(UserInfo)
