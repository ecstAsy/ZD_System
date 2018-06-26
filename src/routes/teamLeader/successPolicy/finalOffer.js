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

      <Row>
        <Col span={1}>
            <FormItem{...formItemLayout}>
              <div style={{width:'548px',height:'150px'}}
                   className={styles.offerBoxb}>
                <div className={classnames(styles.leftB,styles.ulList2)}>
                  <Col offset={2}>
                    <div>派送时间：</div>
                    <div>联系方式：</div>
                    <div>派送地址：</div>
                    <div>备注：</div>
                  </Col>
                </div>
                <div  className={classnames(styles.rightB,styles.ulList2)}>
                  <div>收件人：</div>
                  <div>收款方式：</div>
                </div>
              </div>
            </FormItem>
          </Col>
      </Row>


    </Form>
  )
}



export default connect(({  }) => ({  }))(FinalOffer)
