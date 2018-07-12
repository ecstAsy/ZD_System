import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Radio,Table,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './index.less'
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const ChoosePurCarModal =({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...choosePurCarProps
})=>{
  const columns = [
    {
      title: '选择',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Radio value={record.id}></Radio>,
    },
    {
      title: '厂牌型号',
      dataIndex: 'companyName',
      key: 'companyName',
      width:130
    },{
      title: '车型类型',
      dataIndex: 'baodanNum',
      key: 'baodanNum',
      width:150
    },{
      title: '生产厂商',
      dataIndex: 'beginTime',
      key: 'beginTime',
      render: (text, record) =><span>{record.beginTime}</span>,
      width:100
    }, {
      title: '座位',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text, record) =><span>{record.endTime}</span>,
      width:100
    },{
      title:'排量',
      dataIndex: 'plate',
      key: 'plate',
      width:120
    }, {
      title: '吨位',
      dataIndex: 'plateType',
      key: 'plateType',

    }, {
      title: '购置价（不含税）',
      dataIndex: 'chejiaNum',
      key: 'chejiaNum',
      width:150
    }, {
      title: '风险保费',
      dataIndex: 'carType',
      key: 'carType',
      width:100
    }, {
      title: '上市日期',
      dataIndex: 'useType',
      key: 'useType',
      width:100
    }, {
      title: '备注',
      dataIndex: 'insureType',
      key: 'insureType',
    },
  ]

  const UnderwData=[
    {id:1,companyName:'中国人民财产保险股份有限公司',baodanNum:'ADDD345655665HG1',beginTime:'201404201600',endTime:'201504201600',plate:'苏EH7F57',plateType:'小型汽车好牌',
      chejiaNum:'DDDFDF6586GHJK',carType:'六座以下客车',useType:'非营业个人',insureType:'商业险承保信息'},
    {id:2,companyName:'中国人民财产保险股份有限公司',baodanNum:'ADDD345655665HG1',beginTime:'201404201600',endTime:'201504201600',plate:'苏EH7F57',plateType:'小型汽车好牌',
      chejiaNum:'DDDFDF6586GHJK',carType:'六座以下客车',useType:'非营业个人',insureType:'商业险承保信息'}
  ]

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }
  const modalOpts = {
    ...choosePurCarProps,
    onOk: handleOk,
  }
  return(
    <Modal
      {...modalOpts}
    >
      {getFieldDecorator('carId', {

      })(<RadioGroup>
        <Table columns={columns} dataSource={UnderwData} pagination={false} />
      </RadioGroup>)}



    </Modal>
  )
}
ChoosePurCarModal.prototype = {


}
export default Form.create()(ChoosePurCarModal)
