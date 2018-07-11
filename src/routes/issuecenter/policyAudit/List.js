import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
import publicStyles from '../../publicStyle.less';
import styles from './index.less';

const List = ({...listProps, handleListAction,
              })=>{
  const columns = [
    {
      title: '车牌',
      dataIndex: 'carPlate',
      key: 'carPlate',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text,list)=><span className={list.status==='审核通过'?'status doneAudit':
        list.status==='审核失效'?'status outtimeAudit':'status willAudit'}>{list.status}</span>
    },{
      title: '业务员',
      dataIndex: 'salesman',
      key: 'salesman',
    },{
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },{
      title: '支付方式',
      dataIndex: 'payWay',
      key: 'payWay',
    },{
      title: '客户类型',
      dataIndex: 'customerType',
      key: 'customerType',
    },{
      title: '提交时间',
      dataIndex: 'submissionTime',
      key: 'insuranceNumsubmissionTime',
    },{
      title: '派送日期',
      dataIndex: 'sendTime',
      key: 'sendTime'
    },{
      title: '保单金额',
      dataIndex: 'insuranceNum',
      key: 'insuranceNum'
    },{
      title: '金额登记',
      dataIndex: 'registrationAmountStatus',
      key: 'registrationAmountStatus'
    },{
    title: '现场',
    dataIndex: 'policyScene',
      key: 'policyScene'
    },{
      title: '团队',
      dataIndex: 'team',
      key: 'team'
    },{
      title:'操作',
      dataIndex:'action',
      key:'action',
      render:(text,list)=><span onClick={()=>handleListAction(list)} style={{color:list.status==='待审核'?'#f4a21a':'#0082fe'}}>{
        list.status==='待审核'?'审核':'查看'
      }</span>
    }
  ]
  return (
    <Table
      {...listProps}
      className={classnames(publicStyles.table,styles.table)}
      columns={columns}
      simple
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  handleListAction:PropTypes.func
}

export default List
