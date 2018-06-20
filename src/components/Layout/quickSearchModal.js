import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Icon ,Row, Col,Button} from 'antd'
import styles from './model.less'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  xs: 18,
}
const ColProps2 = {
  xs: 6,
  style:{lineHeight:'36px',color:'#a6a6a6'}
}
const QuickSearchModal = ({
  item = {},
  onCancel,
  ...QuickSearchModalProps
}) => {
  const handleCancel = () => {
    onCancel()
  }
  const modalOpts = {
    ...QuickSearchModalProps,
    onCancel: handleCancel,
  }


  return (
    <Modal {...modalOpts}>
      <div>
        <table className={styles.tableSearch}>
          <thead>
            <tr><th>姓名</th><th>车牌</th><th>名单状态</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>刘元云</td>
              <td>苏EH7F57</td>
              <td>预约跟踪</td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:'center',marginTop:'30px',borderTop:'1px #ddd solid',paddingTop:'30px'}}>
          <Button  style={{width:'120px',height:'40px',fontSize:'16px',background:'#fafafa'}} onClick={handleCancel}>关闭</Button>
        </div>
      </div>
    </Modal>
  )
}

QuickSearchModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default  QuickSearchModal
