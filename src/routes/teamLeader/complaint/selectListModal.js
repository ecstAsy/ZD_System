import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Form, Input, Table, message } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import listStyles from './selectList.less';
import SelectFilter from './selectFilter';
import { Radio } from 'antd/lib/index';

const FormItem = Form.Item
const RadioGroup = Radio.Group;


const SelectListModal = ({...selectListModalProps, handleCancel, handleConfirm, FilterSearch, selectList,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue }
})=>{

  const selectFilterProps = {
    FilterSearch
  };

  const confirmSelect  = ()=>{
    let fields = getFieldsValue();
    fields.user && handleConfirm(fields.user);
    fields.user && handleCancel();
    !fields.user && message.error('请选择客户信息！');
  };

  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Radio value={record}></Radio>,
    },{
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: '车牌',
      dataIndex: 'userPlate',
      key: 'userPlate'
    },{
      title: '电话',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },{
      title: '业务员',
      dataIndex: 'salseMan',
      key: 'salseMan',
    }
  ]
  return (
    <Modal className={classnames(styles.SelectListModal,styles.AuditModal)}
      {...selectListModalProps}
      footer={[
        <Button type="primary" key="submit" onClick={confirmSelect}>确定</Button>,
        <Button key="back" onClick={handleCancel}>取消</Button>
      ]}>
      <SelectFilter {...selectFilterProps}/>
      {getFieldDecorator('user', {
      })(<RadioGroup>
        <Table className={classnames(listStyles.table)} columns={columns} dataSource={selectList} pagination={false} />
      </RadioGroup>)}

    </Modal>
  )
}

SelectListModal.propTypes = {
  handleCancel : PropTypes.func,
  handleConfirm: PropTypes.func,
  FilterSearch : PropTypes.func
}

export default Form.create() (SelectListModal)
