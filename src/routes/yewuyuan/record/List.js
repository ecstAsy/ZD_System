/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

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
      dataIndex: 'insuranceDueDate',
      key: 'insuranceDueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.insuranceDueDate - b.insuranceDueDate,
  }, {
    title: '通话时长(秒)',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
  },  {
    title: '通话记录',
      key: 'operation',
      width: 100,
      render: (text, record) =>   <div>
        <a href="javascript:;">播放</a>
      </div>
  },
]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
  {...tableProps}
  className={classnames(styles.table, { [styles.motion]: isMotion })}

  scroll={{ y: 500 }}
  columns={columns}
  simple
  rowKey={record => record.id}
  components={{
    body: { wrapper: isMotion ? AnimateBody : CommonBody },
  }}
/>
)
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List