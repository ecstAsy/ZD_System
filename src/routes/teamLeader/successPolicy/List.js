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
  onDeleteItem, seeQuotation, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      seeQuotation(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要更改吗?',
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
      dataIndex: 'zhuangtai',
      key: 'zhuangtai',
      render: (text, record) => {
        return <span style={{background:record.zhuangtai=='审核通过'?'#0dcbe4':record.zhuangtai=='审核中'?'#58b6ff':record.zhuangtai=='审核失败'?'#ff5640':'#f6be1a'}}>{record.zhuangtai}</span>
      },
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
      dataIndex: 'sendType',
      key: 'sendType',
      render: (text, record) => {
        return <span style={{color:record.sendType=='已分配'?'#7da906':record.sendType=='未分配'?'#f6be1a':record.sendType=='已派送'?'#0dcbe4':record.sendType=='派送中'?'#56b4fc':'#ff5640'}}>{record.sendType}</span>
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
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '查看报价' }, { key: '2', name: '更改所属' }]} />
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
