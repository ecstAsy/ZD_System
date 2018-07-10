import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
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
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },{
      title: '团队',
      dataIndex: 'team',
      key: 'team',
    },{
      title: '业务员',
      dataIndex: 'processor',
      key: 'processor',
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
      dataIndex: 'status',
      key: 'status',
      render:(text,list)=><span style={{color:list.status==='退保'?'#ec412b':list.status==='待审核'?'#f4a21a':'#0dcbe4'}}>{list.status}</span>
    },{
      title: '登记状态',
      dataIndex: 'register',
      key: 'register',
      render:(text,list)=><span>{list.register}</span>
    },{
      title:'操作',
      dataIndex:'action',
      key:'action',
      render:(text,list)=><span onClick={()=>handleListAction(list)} style={{color:list.status==='待审核'&&list.register==='-'?'#0082fe':'#f4a21a'}}>{list.status==='待审核'
        ?'审核':list.status==='审核通过'&&list.register==='-'?'登记':''}</span>
    }
  ]
  return (
    <Table
      {...listProps}
       className={classnames(styles.table)}
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
