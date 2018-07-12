import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

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
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },{
      title: '团队',
      dataIndex: 'team',
      key: 'team',
    },{
      title: '业务员',
      dataIndex: 'salesman',
      key: 'salesman',
    },{
      title: '批改日期',
      dataIndex: 'batchTime',
      key: 'batchTime',
    },{
      title: '金额',
      dataIndex: 'insuranceNum',
      key: 'insuranceNum',
    },{
      title: '最终金额',
      dataIndex: 'finalNum',
      key: 'finalNum',
      render:(text,list)=><span>-</span>
    },{
      title: '差额',
      dataIndex: 'costNum',
      key: 'costNum',
      render:(text,list)=><span>{`-${list.costNum}`}</span>
    },{
      title: '状态',
      dataIndex: 'policyStatus',
      key: 'policyStatus',
      render:(text,list)=><span style={{color:list.policyStatus==='退保'?'#ec412b':list.policyStatus==='待审核'?'#f4a21a':'#0dcbe4'}}>{list.policyStatus}</span>
    },{
      title: '登记状态',
      dataIndex: 'registerStatus',
      key: 'registerStatus',
      render:(text,list)=><span>{list.registerStatus}</span>
    },{
      title:'操作',
      dataIndex:'action',
      key:'action',
      render:(text,list)=><span onClick={()=>handleListAction(list)} style={{color:list.policyStatus==='待审核'?'#f4a21a':'#0082fe'}}>{
        list.policyStatus==='待审核'?'审核':list.policyStatus==='审核通过'&&list.registerStatus==='-'?'登记':''}</span>
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
