import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'

const Detail = ({ purchaseDetail }) => {
  purchaseDetail = purchaseDetail.data
  return (
    <div>
      <Row style={{ marginTop: '5px' }}>
        <Col span={2}>供应商名称：</Col>
        <Col span={14}>
          {purchaseDetail.name}
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={2}>联系人：</Col>
        <Col span={14}>
          {purchaseDetail.linkMan}
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={2}>电话：</Col>
        <Col span={14}>
          {purchaseDetail.phone}
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={2}>地址：</Col>
        <Col span={14}>
          {purchaseDetail.address}
        </Col>
      </Row>
    </div>
  )
}

Detail.propTypes = {
  purchaseDetail: PropTypes.object,
}

export default connect(({ purchaseDetail }) => ({ purchaseDetail }))(Detail)
