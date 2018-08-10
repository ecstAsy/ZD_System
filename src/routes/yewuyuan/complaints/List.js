/**
 * Created by Administrator on 2018/8/1 0001.
 */
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
      title: '处理状态',
      dataIndex: 'complaintsStatus',
      key: 'complaintsStatus',
      render:(text,list)=>
        <span style={{color:list.complaintsStatus=='失败处理'?'#EC412B':list.complaintsStatus=='未处理'?'#F4A21A':
          list.complaintsStatus== '成功处理'?'#01CBBD':'#EC412B'}}>
          {list.complaintsStatus}
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
        <span onClick={()=>handleStatus(list)} style={{width: '100%',color:list.complaintsStatus!=''?'#0082FE':'#0082FE',
         }}>
          {list.complaintsStatus=='成功处理'?'查看':list.complaintsStatus=='未处理'?'处理':list.complaintsStatus=='失败处理'?'查看':'处理'}
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
