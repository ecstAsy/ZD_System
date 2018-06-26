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
  onDeleteItem, onEditItem,toQuoteFunc, isMotion,location, ...tableProps
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
  const toQuote=(id)=>{
    toQuoteFunc(id)
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
    }, {
      title: '上年保险公司',
      dataIndex: 'preInsuranceCompany',
      key: 'preInsuranceCompany',
      width: 250,
    },{
      title: '初登日期',
      dataIndex: 'firstRegisterDate',
      key: 'firstRegisterDate',
    }, {
      title: '保险到期日',
      dataIndex: 'insuranceDueDate',
      key: 'insuranceDueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.insuranceDueDate - b.insuranceDueDate,
    }, {
      title: '名单发放日',
      dataIndex: 'handleDate',
      key: 'handleDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.handleDate - b.handleDate,
    }, {
      title: '预约时间',
      dataIndex: 'yuyueDate',
      key: 'yuyueDate',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.yuyueDate - b.yuyueDate,
    }, {
      title: '最后操作时间',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
    }, {
      title: '名单类型',
      dataIndex: 'isRenewal',
      key: 'isRenewal',
    }, {
      title: '状态',
      key: 'operation',
      width: 100,
      render: (text, record) => {
       // return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return <span onClick={()=>toQuote(record.id)}>处理中</span>
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
