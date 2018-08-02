/**
 * Created by Administrator on 2018/8/1 0001.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Table } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 21,
  },
  style:{
    marginBottom: 0,
    marginLeft:'36px',
    borderRadius:'20px',
    fontSize:'14px'
  }
};

const ViewComplaintModal = ({...viewComplaintModalProps, handleCancel, viewList
})=>{
  const columns = [
    {
      title: '时间',
      dataIndex: 'handleTime',
      key:'handleTime',
    },{
      title: '描述',
      dataIndex: 'dis',
      key:'dis',
    },{
      title: '状态',
      dataIndex: 'complaintStatus',
      key:'complaintStatus',
      render:(text,list)=>
        <span style={{color:list.complaintStatus=='处理中'?'#F4A21A':list.complaintStatus=='处理失败'?'#EC412B':
          list.complaintStatus== '处理成功'?'#01CBBD':''}}>
          {list.complaintStatus}
        </span>
    },{
      title: '业务员',
      dataIndex: 'processor',
      key:'processor',
    }];

  return (
    <Modal className={classnames(publicStyles.Modal)}
           {...viewComplaintModalProps}
           footer={[
             <Button key="back" onClick={handleCancel}>关闭</Button>
           ]}>
      <Row gutter={24}>
        <div className={classnames(publicStyles.biaoti)}>投诉描述：<span style={{color:'#000'}}>返现100</span></div>
        <div className={classnames(publicStyles.biaoti)}>处理记录：</div>
        <FormItem {...formItemLayout}>
          <Table className={classnames(styles.clomun,publicStyles.table)} columns={columns} dataSource={viewList} pagination={false}/>
        </FormItem>
      </Row>
    </Modal>
  )
}

ViewComplaintModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (ViewComplaintModal)
