import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Table,Select ,Icon,TimePicker,Modal} from 'antd'
import styles from './index.less'
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker
const FormItem = Form.Item
const UnderWritingMadal =({
  item = {},
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...UnderwritingProps
})=>{
  const columns = [
    {
      title: '保险公司',
      dataIndex: 'companyName',
      key: 'companyName',
      width:130
    },{
      title: '保单号',
      dataIndex: 'baodanNum',
      key: 'baodanNum',
      width:150
    },{
      title: '起保时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      render: (text, record) =><span>{record.beginTime}</span>,
      width:100
    }, {
      title: '终保时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text, record) =><span>{record.endTime}</span>,
      width:100
    },{
      title:'号牌号码',
      dataIndex: 'plate',
      key: 'plate',
      width:120
    }, {
      title: '号牌种类',
      dataIndex: 'plateType',
      key: 'plateType',

    }, {
      title: '车架号',
      dataIndex: 'chejiaNum',
      key: 'chejiaNum',
      width:150
    }, {
      title: '车辆种类',
      dataIndex: 'carType',
      key: 'carType',
      width:100
    }, {
      title: '使用性质',
      dataIndex: 'useType',
      key: 'useType',
      width:100
    }, {
      title: '险别',
      dataIndex: 'insureType',
      key: 'insureType',
    }, {
      title: '商业险种',
      key: 'insureDetail',
      render: (text, record) => {
        return <span onClick={()=>toQuote(record.id)}>查看险种</span>
      },
      width:120
    },
  ]
  const columns2 = [
    {
      title: '保险公司',
      dataIndex: 'companyName',
      key: 'companyName',
      width:130
    },{
      title: '保单号',
      dataIndex: 'baodanNum',
      key: 'baodanNum',
      width:150
    },{
      title: '起保时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      render: (text, record) =><span>{record.beginTime}</span>,
      width:100
    }, {
      title: '终保时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text, record) =><span>{record.endTime}</span>,
      width:100
    },{
      title:'号牌号码',
      dataIndex: 'plate',
      key: 'plate',
      width:120
    }, {
      title: '号牌种类',
      dataIndex: 'plateType',
      key: 'plateType',

    }, {
      title: '车架号',
      dataIndex: 'chejiaNum',
      key: 'chejiaNum',
      width:150
    }, {
      title: '出险时间',
      dataIndex: 'carType',
      key: 'carType',
      width:100
    }, {
      title: '报案时间',
      dataIndex: 'useType',
      key: 'useType',
      width:100
    }, {
      title: '结案时间',
      dataIndex: 'insureType',
      key: 'insureType',
    },  {
      title: '理赔类型',
      dataIndex: 'insureType',
      key: 'insureType',
    },{
      title: '赔款总金额',
      key: 'insureDetail',
      render: (text, record) => {
        return <span onClick={()=>toQuote(record.id)}>查看险种</span>
      },
      width:120
    },
  ]


  const UnderwData=[
    {id:1,companyName:'中国人民财产保险股份有限公司',baodanNum:'ADDD345655665HG1',beginTime:'201404201600',endTime:'201504201600',plate:'苏EH7F57',plateType:'小型汽车好牌',
      chejiaNum:'DDDFDF6586GHJK',carType:'六座以下客车',useType:'非营业个人',insureType:'商业险承保信息'}
  ]
  const UnderwData2=[]


  return(
    <Modal
      {...UnderwritingProps}
      footer={[
        <Button key="submit" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <div className="rowTitle"> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>历年承保信息</span></div>
      <Table columns={columns} dataSource={UnderwData} pagination={false} />
      <div className="rowTitle rowTitleTwo"> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>历年承保信息</span></div>
      <Table columns={columns} dataSource={UnderwData2} pagination={false} />

    </Modal>
  )
}
UnderWritingMadal.prototype = {


}
export default Form.create()(UnderWritingMadal)
