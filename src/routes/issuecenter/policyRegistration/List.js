import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

const List = ({...listProps, handleListAction,
  })=>{
  const columns = [
    {
      title: '车牌',
      dataIndex: 'carPlate',
      key: 'carPlate',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '保险公司',
      dataIndex: 'insuranceCompany',
      key: 'insuranceCompany',
    },{
      title: '团队',
      dataIndex: 'team',
      key: 'team',
    },{
      title: '业务员',
      dataIndex: 'salesman',
      key: 'salesman',
    },{
      title: '内部车',
      dataIndex: 'internalCar',
      key: 'internalCar',
    },{
      title: '缴费日期',
      dataIndex: 'paymentTime',
      key: 'paymentTime',
    },{
      title: '商业险金额',
      dataIndex: 'commercialNum',
      key: 'commercialNum',
    },{
      title: '交强险金额',
      dataIndex: 'compulsoryNum',
      key: 'compulsoryNum'
    },{
      title: '车船税',
      dataIndex: 'vehicleVesselTax',
      key: 'vehicleVesselTax'
    },{
      title: '登记人',
      dataIndex: 'registrant',
      key: 'registrant'
    },{
      title:'操作',
      dataIndex:'policyAction',
      key:'policyAction',
      render:(text,list)=><span onClick={()=>handleListAction(list)}>{list.policyAction}</span>
    }
  ]
  return (
    <Table
      {...listProps}
      className={classnames(publicStyles.table,styles.List)}
      columns={columns}
      simple
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  handleListAction:PropTypes.func
}

export default List
