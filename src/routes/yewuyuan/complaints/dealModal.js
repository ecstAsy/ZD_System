/**
 * Created by Administrator on 2018/8/1 0001.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Input, Select, Table } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: {
    span:3,
  },
  wrapperCol: {
    span: 21,
  },
  style:{
    marginBottom: 0,
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const DealModal = ({...dealModalProps, handleCancel, item, handleConfirm, viewList
})=>{
  const columns = [
    {
      title: '时间',
      dataIndex: 'handleTime',
    },{
      title: '描述',
      dataIndex: 'dis',
    },{
      title: '状态',
      dataIndex: 'complaintStatus',
      render:(text,list)=>
        <span style={{color:list.complaintStatus=='处理中'?'#F4A21A':list.complaintStatus=='处理失败'?'#EC412B':
          list.complaintStatus== '处理成功'?'#01CBBD':''}}>
          {list.complaintStatus}
        </span>
    },{
      title: '业务员',
      dataIndex: 'processor',
    }];

  return (
    <Modal className={classnames(publicStyles.Modal)}
           {...dealModalProps}
           footer={[
             <Button type="primary" key="submit" onClick={handleConfirm(item)}>确认</Button>,
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Row gutter={24}>
        <div className={classnames(publicStyles.biaoti)}>投诉描述：<span style={{color:'#000'}}>返现100</span></div>
        <div className={classnames(publicStyles.biaoti)}>处理记录：</div>
        <FormItem {...formItemLayout}>
          <Table className={classnames(styles.clomun,publicStyles.table)} columns={columns} dataSource={viewList} pagination={false}/>
        </FormItem>
        <div className={classnames(publicStyles.biaoti)}>本次处理：</div>
        <Col span={24}>
          <FormItem {...formItemLayout} label='状态'>
            <Select style={{width:'30%',marginBottom:'16px'}} placeholder='请选择'>
              <Option value='a'>处理中</Option>
              <Option value='b'>处理失败</Option>
              <Option value='c'>成功处理</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem {...formItemLayout} label='描述'>
            <TextArea autosize={{minRows:5,maxRows:5}}/>
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}
DealModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (DealModal)
