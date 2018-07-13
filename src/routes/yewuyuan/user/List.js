import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import { dateConversion, timeConversion } from 'utils/index'
const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, toQuoteFunc, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const toQuote=(id)=>{
    toQuoteFunc(id)
  };

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
    }, {
      title: '上年保险公司',
      dataIndex: 'preInsuranceCompany',
      key: 'preInsuranceCompany',
      width: 250,
    },{
      title: '初登日期',
      dataIndex: 'firstRegisterDate',
      key: 'firstRegisterDate',
      render:(text, record)=><span>{dateConversion(record.firstRegisterDate)}</span>
    }, {
      title: '保险到期日',
      dataIndex: 'insuranceDueDate',
      key: 'insuranceDueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.insuranceDueDate - b.insuranceDueDate,
      render:(text, record)=><span>{dateConversion(record.insuranceDueDate)}</span>
    }, {
      title: '名单发放日',
      dataIndex: 'handleDate',
      key: 'handleDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.handleDate - b.handleDate,
      render:(text, record)=><span>{dateConversion(record.handleDate)}</span>
    }, {
      title: '预约时间',
      dataIndex: 'yuyueTime',
      key: 'yuyueTime',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.yuyueTime - b.yuyueTime,
      render:(text, record)=><span>{timeConversion(record.yuyueTime)}</span>
    }, {
      title: '最后操作时间',
      dataIndex: 'lastOptTime',
      key: 'lastOptTime',
      render:(text, record)=><span>{timeConversion(record.lastOptTime)}</span>
    }, {
      title: '名单类型',
      dataIndex: 'listType',
      key: 'listType',
    }, {
      title: '状态',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <span onClick={()=>toQuote(record.id)}>处理中</span>
      },
    },
  ];

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  };

  const CommonBody = (props) => {
    return <tbody {...props} />
  };

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table)}
      scroll={{ y: 500 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
};

List.propTypes = {
  toQuote: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List
