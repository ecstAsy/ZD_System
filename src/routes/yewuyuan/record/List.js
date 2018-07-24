/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
import { DropOption } from 'components';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styles from './List.less';

const List = ({
  location, ...tableProps,
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '车牌',
      dataIndex: 'province',
      key: 'province',
      render: (text, record) =><span>{record.province+record.plateNumber}</span>,
    },{
      title: '拨打时间',
      dataIndex: 'recordDate',
      key: 'recordDate',
      defaultSortOrder: 'descend',
    },{
      title: '通话时长(秒)',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
    },{
      title: '通话记录',
      key: 'operation',
      width: 100,
      render: (text, record) =>
        <div>
          <a href="javascript:;">播放</a>
        </div>
      },
  ];

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table,styles.motion)}
      scroll={{ y: 500 }}
      columns={columns}
      simple
      rowKey={record => record.id}
    />
  )
};

List.propTypes = {
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
