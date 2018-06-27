/**
 * Created by Administrator on 2018/6/26 0026.
 */
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './offer.less'
import { Row, Col, Form, Divider } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 25,
  },
  wrapperCol: {
    span: 15,
  },
}
const ColProps = {
  xs: 1,
  sm: 2,
  style: {
    marginBottom: 1,
    marginRight:1
  },
}


const FinalOffer = () => {

  return (
    <Form layout="horizontal">
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>保单派送信息</span></div>
      <div>
        <div className="useInfoRow">
          <p>派送时间：</p> <p>2018-06-26</p><p>收件人：</p><p>刘媛媛</p>
        </div>
        <div className="useInfoRow">
          <p>联系方式：</p> <p>13587589556</p><p>收款方式：</p><p>外出刷卡</p>
        </div>
        <div className="useInfoRow">
          <div>派送地址：</div>
          <div className="addresses">江苏省常熟市新北区孟河农副产品综合市场</div>
        </div>
        <div className="useInfoRow">
          <div>备注：</div>
          <div className="addresses">这里是备注备注备注备注备注备注</div>
        </div>

      </div>
    </Form>
  )
}



export default connect(({  }) => ({  }))(FinalOffer)
