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
      title: '车牌',
      dataIndex: 'province',
      key: 'province',
      render: (text, record) =><span>{record.province+record.plateNumber}</span>,
    },
     {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '业务员',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '出单类型',
      dataIndex: 'preInsuranceCompany',
      key: 'preInsuranceCompany',
    },{
      title: '状态',
      dataIndex: 'firstRegisterDate',
      key: 'firstRegisterDate',
    }, {
      title: '支付方式',
      dataIndex: 'insuranceDueDate',
      key: 'insuranceDueDate',
    }, {
      title: '保单金额',
      dataIndex: 'handleDate',
      key: 'handleDate',
    }, {
      title: '提交时间',
      dataIndex: 'yuyueDate',
      key: 'yuyueDate',
    }, {
      title: '缴费时间',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
    }, {
      title: '保险公司',
      dataIndex: 'isRenewal',
      key: 'isRenewal',
    },
    {
      title: '派单状态',
      dataIndex: 'isRenewal',
      key: 'isRenewal2',
      render: (text, record) => {
        return <span>2</span>
      },
    }, {
      title: '派单类型',
      dataIndex: 'isRenewal',
      key: 'isRenewal3',
      render: (text, record) => {
        return <span>2</span>
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
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
