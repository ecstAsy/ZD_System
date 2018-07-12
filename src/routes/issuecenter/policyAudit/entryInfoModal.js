import React from 'react';
import PropTypes from 'prop-types';
import { Title } from 'components';
import {  Modal, Button, Form, Row, Col, Input, Select, Upload } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const Option = Select.Option;
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

const EntryInfoModal = ({...entryInfoModalProps, handleCancel, currentItem,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{

  const handleConfirm = ()=>{
    let fields = getFieldsValue();
    fields.costNum = formatFloat(formatFloat(currentItem.commercialNum-fields.commercialNum,2)+
      formatFloat(currentItem.compulsoryNum-fields.compulsoryNum,2)+
      formatFloat(currentItem.vehicleVesselTax-fields.vehicleVesselTax,2),2)
    console.log(fields)
  };

  const formatFloat =  (f, digit)=> {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  };
  const fileList = [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }];

  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...fileList],
  };
  return (
    <Modal className={classnames(publicStyles.Modal,styles.PolicyActionModal)}
           {...entryInfoModalProps}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm}>确定</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Title title={`信息`}/>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='投保机构'>
            {getFieldDecorator('insuranceCompany')(
              <Select style={{width:'100%'}} placeholder='请选择'>
                <Option value='a'>太保</Option>
                <Option value=''>太平保</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='商业险'>
            {getFieldDecorator('commercialNum')(
              <Input addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.commercialNum}</span>
          <span className='title'>差额：</span><span style={{color:getFieldsValue().commercialNum&&formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2)<-30||getFieldsValue().commercialNum&&formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2)>30
            ?'#EC412B':'#333'}}
                                                  className='detail'>{getFieldsValue().commercialNum ? formatFloat(currentItem.commercialNum-getFieldsValue().commercialNum,2):0}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='交强险'>
            {getFieldDecorator('compulsoryNum')(
              <Input  addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.compulsoryNum}</span>
          <span className='title'>差额：</span><span className='detail' style={{color:getFieldsValue().compulsoryNum&&formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2)<-30||getFieldsValue().compulsoryNum&&formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2)>30
            ?'#EC412B':'#333'}}
        >{getFieldsValue().compulsoryNum ? formatFloat(currentItem.compulsoryNum-getFieldsValue().compulsoryNum,2):0}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='车船税'>
            {getFieldDecorator('vehicleVesselTax')(
              <Input addonAfter='元' />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>当前金额：</span><span className='detail'>{currentItem.vehicleVesselTax}</span>
          <span className='title'>差额：</span><span className='detail' style={{color:getFieldsValue().vehicleVesselTax&&formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2)<-30||getFieldsValue().vehicleVesselTax&&formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2)>30
            ?'#EC412B':'#333'}}
        >{getFieldsValue().vehicleVesselTax ? formatFloat(currentItem.vehicleVesselTax-getFieldsValue().vehicleVesselTax,2):0}</span>
        </Col>
      </Row>
      <Title title={`付款`}/>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem {...formItemLayout} label='支付码'>
            {getFieldDecorator('vehicleVesselTax')(
              <Input/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <span className='title'>收款二维码：</span>
          <Upload {...props}>
            <Button className='upload'> 上传文件 </Button>
          </Upload>
        </Col>
      </Row>
      <Title title={`附件`}/>
      <Row gutter={24}>
        <Col span={12}>
          <span className='title'>投保单1：</span>
          <Upload {...props}>
            <Button className='upload'> 上传文件 </Button>
          </Upload>
        </Col>
        <Col span={12}>
          <span className='title'>投保单2：</span>
          <Upload {...props}>
            <Button className='upload'> 上传文件 </Button>
          </Upload>
        </Col>
      </Row>
    </Modal>
  )
}
EntryInfoModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (EntryInfoModal)
