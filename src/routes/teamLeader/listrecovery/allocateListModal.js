/**
 * 重新分配
 */
import React from 'react';
import PropTypes from 'prop-types';
import {  Modal, Button, Form, Row, Col, Table, Input } from 'antd';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';
import classnames from 'classnames';

const FormItem = Form.Item;

const AllocateListModal = ({...allocateListModalProps, handleCancel, list, pagination,
     form: { getFieldDecorator, getFieldsValue, setFieldsValue }
 })=>{
  const columns = [
    {
      title: '业务员',
      dataIndex: 'salesMan',
      key: 'salesMan',
    },{
      title: '首播未处理',
      dataIndex: 'firstCallWilldo',
      key: 'firstCallWilldo',
    },
    {
      title: '首播已处理',
      dataIndex: 'firstCallDone',
      key: 'firstCallDone',
    },
    {
      title: '预约未处理',
      dataIndex: 'reserveWilldo',
      key: 'reserveWilldo',
    },
    {
      title: '预约已处理',
      dataIndex: 'reserveDone',
      key: 'reserveDone',
    },
    {
      title: '今日跟踪',
      dataIndex: 'todayTrack',
      key: 'todayTrack',
    },
    {
      title: '今日分配',
      dataIndex: 'todayAllocate',
      key: 'todayAllocate',
    },
    {
      title: '数量',
      dataIndex: 'allocateNum',
      key: 'allocateNum',
      render:(text,list)=><FormItem>
        {getFieldDecorator(`${list.salesMan}`)(
          <Input style={{width:'100%'}}/>
        )}
      </FormItem>
    },
  ]
  return(
    <Modal className={classnames(styles.AllocateListModal,publicStyles.Modal)}
      {...allocateListModalProps}
      footer={[
        <Button type="primary" key="submit">确定</Button>,
        <Button key="back" onClick={handleCancel}>关闭</Button>
      ]}>
      <div><span className='title'>回收数量：</span><span className='detail'>2500</span></div>
      <Table
        dataSource={list}
        className={classnames(publicStyles.table,styles.table)}
        columns={columns}
        simple
        pagination={pagination}
        rowKey={record => record.id}
      />
    </Modal>
  )
}
AllocateListModal.propTypes = {
  handleCancel:PropTypes.func
}
export default Form.create() (AllocateListModal)
