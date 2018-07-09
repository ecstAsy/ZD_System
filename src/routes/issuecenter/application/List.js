import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const List = ({...listProps,
  })=>{
  const columns = [
    {
      title: '车牌',
      dataIndex: 'carPlate',
      key: 'carPlate',
    },{
      title: '申请日期',
      dataIndex: 'applyTime',
      key: 'applyTime',
    },
    {
      title: '团队',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: '业务员',
      dataIndex: 'processor',
      key: 'processor',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text,list)=><span style={{color:list.status==='驳回'?'#ec412b':list.status==='未处理'?'#f4a21a':'#0dcbe4'}}>{list.status}</span>
    },
    {
      title: '是否存在',
      dataIndex: 'existence',
      key: 'existence',
    },
    {
      title:'操作',
      dataIndex:'action',
      key:'action',
      render:(text,list)=><span style={{color:list.status==='未处理'&&list.existence==='不存在'
          ?'#ec412b':'#0082FE'}}>{list.status==='未处理'&&list.existence==='不存在'
        ?'驳回':list.status==='未处理'&&list.existence==='存在'?'同意':''}</span>
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

}

export default List
