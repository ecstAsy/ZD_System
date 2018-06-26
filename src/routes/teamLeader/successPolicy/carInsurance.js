/**
 * Created by Administrator on 2018/6/25 0025.
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
  xs: 100,
  sm: 200,
  style: {
    marginBottom: 1,
    marginRight:1
  },
}


const CarInsurance = () => {

  return (
    <Form layout="horizontal">
      <div className={styles.header}> <img src="/ghef_03.png"/><span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>车险选项</span></div>
      <Col offset={1}>
      <Row style={{ marginTop: '3px' }}>
          <FormItem {...formItemLayout}>
            <div style={{width:'548px',height:'12px'}}
                 className={styles.offerBoxb}>
              <div className={classnames(styles.leftB,styles.ulList2)}>
                <div>投保公司：</div>

              </div>
              <div  className={classnames(styles.rightB,styles.ulList2)}>
                <div>区域：</div>
              </div>
            </div>
          </FormItem>

        <Divider dashed />
      </Row>

      <Row>
        <Col span={2}>
        <Col offset={1}>
          <FormItem label="商业险" {...formItemLayout}>
            <div style={{width:'548px',height:'120px',backgroundColor:'#F5FBFF'}}
                 className={styles.offerBoxb}>
              <div className={classnames(styles.leftB,styles.ulList2,styles.header)}>
                <Col offset={2} >
                  <div>商业险折扣：</div>
                  <div>车辆损失险：</div>
                  <div>不计免赔险：</div>
                </Col>
              </div>
              <div  className={classnames(styles.rightB,styles.ulList2)}>
                <div>风险保费：</div>
                <div>第三者责任险：</div>
              </div>
            </div>
          </FormItem>

          <FormItem label="交强险" {...formItemLayout}>
            <div style={{width:'548px',height:'38px',marginBottom:'20px',backgroundColor:'#F5FBFF'}}
                 className={styles.offerBoxb}>
              <div className={classnames(styles.leftB,styles.ulList2)}>
                <Col offset={1}>
                  <div>车船税：</div>
                </Col>
          </div>
              </div>
            </FormItem>
        </Col>
          </Col>
      </Row>
        </Col>

   </Form>
  )
}



export default connect(({  }) => ({  }))(CarInsurance)
