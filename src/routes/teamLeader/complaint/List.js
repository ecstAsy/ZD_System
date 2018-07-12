import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

const List = ({ location, ...listProps, handleStatus }) => {
  location.query = queryString.parse(location.search);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '手机号',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },{
      title: '车牌',
      dataIndex: 'carPlate',
      key: 'carPlate'
    },{
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime'
    },{
      title: '处理日期',
      dataIndex: 'handleTime',
      key: 'handleTime',
    },{
      title: '处理人',
      dataIndex: 'processor',
      key: 'processor',
    },{
      title: '状态',
      dataIndex: 'complaintStatus',
      key: 'complaintStatus',
      render:(text,list)=>
        <span style={{color:list.complaintStatus=='返现驳回'?'#EC412B':list.complaintStatus=='未处理'?'#F4A21A':
              list.complaintStatus== '返现通过'?'#01CBBD':''}}>
          {list.complaintStatus}
        </span>
    },{
      title: '类别',
      dataIndex: 'cpType',
      key: 'cpType'
    },{
      title: '操作',
      dataIndex: 'sendType',
      key: 'sendType',
      render: (text, list) =>
        <span onClick={()=>handleStatus(list)} style={{width: '100%',color:list.complaintStatus!=''?'#0082FE':'#F4A21A',
                textAlign:list.complaintStatus=='未处理'?'right':'center'}}>
          {list.complaintStatus=='返现驳回'?'查看':list.complaintStatus=='未处理'?'分配':list.complaintStatus=='返现通过'?'查看':'审核'}
        </span>
    }
  ];

  const CommonBody = (props) => {
    return <tbody {...props}/>
  };

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

List.propTypes = {
  location: PropTypes.object
}

export default List
