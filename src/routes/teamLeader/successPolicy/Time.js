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


const Time = () => {

  return (
    <div>
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>时间信息</span></div>
      <div>
        <div className="useInfoRow">
          <div>交强险：</div>
          <div className="addresses">2018-6-26 00:00:00<span style={{color:'#8f9090',margin:'5px'}}>至</span>2019-6-26 00:00:00</div>
      </div>
     <div className="useInfoRow">
          <div>车船税：</div>
       <div className="addresses">2018-6-26 00:00:00<span style={{color:'#8f9090',margin:'5px'}}>至</span>2019-6-26 00:00:00</div>
        </div>
      </div>
    </div>
  )
}



export default connect(({  }) => ({  }))(Time)
