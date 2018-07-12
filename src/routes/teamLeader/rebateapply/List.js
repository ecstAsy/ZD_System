import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

const List = ({...listProps})=>{
  const columns = [
    {
      title: '申请人',
      dataIndex: 'salesman',
      key: 'salesman',
    },{
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '车牌',
      dataIndex: 'carPlate',
      key: 'carPlate',
    },{
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },{
      title: '商业险金额',
      dataIndex: 'commercialNum',
      key: 'commercialNum',
    },{
      title: '返现比例',
      dataIndex: 'rebateRatio',
      key: 'rebateRatio',
    },{
      title: '超出金额',
      dataIndex: 'overTopNum',
      key: 'overTopNum',
    },{
      title: '最高返现比例',
      dataIndex: 'heightRatio',
      key: 'heightRatio',
    },{
      title: '申请种类',
      dataIndex: 'rebateType',
      key: 'rebateType',
    },{
      title: '状态',
      dataIndex: 'rebateStatus',
      key: 'rebateStatus',
      render:(text,list)=>
        <span style={{color:list.rebateStatus==='驳回'?'#EC412B':list.rebateStatus==='同意'?'#01CBBD':'#F4A21A'}}>{list.rebateStatus}</span>
    },{
      title: '备注',
      dataIndex: 'rebateRemark',
      key: 'rebateRemark',
    },
  ]
  return (
    <Table
      {...listProps}
      className={classnames(styles.table,publicStyles.table)}
      columns={columns}
      simple
      rowKey={record => record.id}
    />
  )
}
export default List
