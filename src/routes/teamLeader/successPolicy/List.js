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
  onDeleteItem, seeQuotation, isMotion, location, ...tableProps,seeSendation
}) => {
  location.query = queryString.parse(location.search);

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
  };

  const handleSendType = (record)=>{
    seeSendation(record)
  };

  const columns = [
    {
      title: '车牌',
      dataIndex: 'plate',
      key: 'plate',
      render: (text, record) =><span>{record.province+record.plate}</span>,
    },
     {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '业务员',
      dataIndex: 'salesman',
      key: 'salesman',
    }, {
      title: '出单类型',
      dataIndex: 'SingleType',
      key: 'SingleType',
    },{
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return <span style={{background:record.state=='审核通过'?'#0dcbe4':record.state=='审核中'?'#58b6ff':record.state=='审核失败'?'#ff5640':'#f6be1a'}}>{record.state}</span>
      },
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
    }, {
      title: '保单金额',
      dataIndex: 'policyPrice',
      key: 'policyPrice',
    }, {
      title: '提交时间',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
    }, {
      title: '缴费时间',
      dataIndex: 'PaymentDate',
      key: 'PaymentDate',
    }, {
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },
    {
      title: '派单状态',
      dataIndex: 'singleState',
      key: 'singleState',
      render: (text, record) => {
        return <span  style={{color:record.singleState=='已分配'?'#7da906':record.singleState=='未分配'?'#f6be1a':record.singleState=='已派送'?'#0dcbe4':record.singleState=='派送中'?'#56b4fc':'#ff5640'}}
                   onClick={handleSendType} >{record.singleState}</span>
      },
    }, {
      title: '派单类型',
      dataIndex: 'piesType',
      key: 'piesType',
      render: (text, record) => {
        return <span>{record.piesType}</span>
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '查看报价' }, { key: '2', name: '更改所属' }]} />
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
  handleSendType: PropTypes.func,
  handleMenuClick: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  seeSendation : PropTypes.func
};

export default List
