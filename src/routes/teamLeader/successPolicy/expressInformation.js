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


const ExpressInformation = () => {

  return (
    <Form layout="horizontal">
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>最终报价</span></div>
      <Row>
        <Col span={1}>
          <FormItem{...formItemLayout}>
            <div style={{width:'548px',height:'150px'}}
                 className={styles.offerBoxb}>
              <div className={classnames(styles.leftB,styles.ulList2)}>
                <Col offset={2} >
                  <div>商业险金额：</div>
                  <div>车船税：</div>
                  <div>优惠额度：</div>
                  <div>赠送礼品：</div>
                </Col>
              </div>
              <div  className={classnames(styles.rightB,styles.ulList2)}>
                <div>交强险金额：</div>
                <div>开单保费：</div>
                <div>实收金额：</div>
              </div>
            </div>
          </FormItem>
        </Col>
      </Row>


    </Form>
  )
}



export default connect(({  }) => ({  }))(ExpressInformation)
