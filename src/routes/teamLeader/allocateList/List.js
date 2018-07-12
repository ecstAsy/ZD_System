import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Form, Input } from 'antd';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import publicStyles from '../../publicStyle.less';

const FormItem = Form.Item;
const List = ({...listProps,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
  })=>{
  const columns = [
    {
      title: '业务员',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '首播未处理',
      dataIndex: 'firstCallWilldo',
      key: 'firstCallWilldo',
    },
    {
      title: '首播已处理',
      dataIndex: 'firstCallDone',
      key: 'firstCallDone',
    },
    {
      title: '预约未处理',
      dataIndex: 'reserveWilldo',
      key: 'reserveWilldo',
    },
    {
      title: '预约已处理',
      dataIndex: 'reserveDone',
      key: 'reserveDone',
    },
    {
      title: '今日跟踪',
      dataIndex: 'todayTrack',
      key: 'todayTrack',
    },
    {
      title: '今日分配',
      dataIndex: 'todayAllocate',
      key: 'todayAllocate',
    },
    {
      title: '数量',
      dataIndex: 'allocateNum',
      key: 'allocateNum',
      render:(text,list)=><FormItem>
          {getFieldDecorator(`${list.name}`)(
            <Input />
          )}
        </FormItem>
    },
  ]
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

}

export default Form.create() (List)
