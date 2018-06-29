import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './index.less'
import record from '../../../models/yewuyuan/record'

const { confirm } = Modal

const List = ({ location, ...tableProps,handleStatus,isMotion }) => {
  location.query = queryString.parse(location.search);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },
    {
      title: '车牌',
      dataIndex: 'province',
      key: 'province',
      render: (text, record) =><span>{record.province+record.userPlate}</span>,
    },
    , {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '处理日期',
      dataIndex: 'handleTime',
      key: 'handleTime',
    },
    {
      title: '处理人',
      dataIndex: 'processor',
      key: 'processor',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text,list)=><span style={{color:list.status=='返现驳回'?'#EC412B':list.status=='未处理'?'#F4A21A':list.status==
        '返现通过'?'#01CBBD':''}}>{list.status}</span>
    }, {
      title: '类别',
      dataIndex: 'cpType',
      key: 'cpType'
    }, {
      title: '操作',
      dataIndex: 'sendType',
      key: 'sendType',
      render: (text, list) => <span onClick={()=>handleStatus(list)} style={{width: '100%',color:list.status!=''?'#0082FE':'#F4A21A',
                textAlign:list.status=='未处理'?'right':'center'}}>
        {list.status=='返现驳回'?'查看':list.status=='未处理'?'分配':list.status=='返现通过'?'查看':'审核'}</span>
    }
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
      className={classnames(styles.table, { [styles.motion]: !isMotion })}
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
  location: PropTypes.object,
  seeSendation : PropTypes.func,
  isMotion : PropTypes.bool
}

export default List
