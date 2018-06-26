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
    <Form layout="horizontal">

      <Row>
        <Col offset={1}>
          <FormItem {...formItemLayout}>
            <div style={{width:'548px',height:'38px',marginBottom:'20px',fontcolor:'#D5DCE1'}}
                 className={styles.offerBoxb}>
              <div className={classnames(styles.leftB,styles.ulList2)}>
                  <div>车船税:</div>
                  <div>商业险:</div>
              </div>
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}



export default connect(({  }) => ({  }))(Time)
