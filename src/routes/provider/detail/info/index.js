import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'

const Detail = ({ providerDetail }) => {
  const formatTime = (time) => {
    return time && (time.length === 4) && (time.substring(0, 2) + ":" + time.substring(2))
  }
  return (
    <Row>
      <Col span={10}>
        <Row style={{ marginTop: '20px' }}>
          <Col span={4}>名称：</Col>
          <Col span={20}>{providerDetail.name}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>LOGO图片：</Col>
          <Col span={20}><img width={100} src={providerDetail.logoImg} alt="avatar" /></Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>联系人：</Col>
          <Col span={20}>{providerDetail.linkMan}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>联系电话1：</Col>
          <Col span={20}>{providerDetail.phone1}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>联系电话2：</Col>
          <Col span={20}>{providerDetail.phone2}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>营业时间：</Col>
          <Col span={20}>{formatTime(providerDetail.beginTime) + ' ~ ' + formatTime(providerDetail.endTime)}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>详细地址：</Col>
          <Col span={20}>{providerDetail.address}</Col>
        </Row>
        <Row style={{ marginTop: '42px' }}>
          <Col span={4}>门店描述：</Col>
          <Col span={20}>{providerDetail.descr}</Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row style={{ marginTop: '20px' }}>
          <Col span={4}>门店图片：</Col>
          <Col span={20}>
            <Row>
              <Col span={8}><img width={100} src={providerDetail.img1} alt="avatar" /></Col>
              <Col span={8}><img width={100} src={providerDetail.img2} alt="avatar" /></Col>
              <Col span={8}><img width={100} src={providerDetail.img3} alt="avatar" /></Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={8}><img width={100} src={providerDetail.img4} alt="avatar" /></Col>
              <Col span={8}><img width={100} src={providerDetail.img5} alt="avatar" /></Col>
              <Col span={8}><img width={100} src={providerDetail.img6} alt="avatar" /></Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={4}>所在位置：</Col>
          <Col span={20}>
            <Map center="苏州" zoom="11" >
              {
                providerDetail.longitude && providerDetail.latitude && <Marker position={{ lng: providerDetail.longitude, lat: providerDetail.latitude }} />
              }
              <NavigationControl />
            </Map>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Detail.propTypes = {
  providerDetail: PropTypes.object,
}

export default connect(({ providerDetail, loading }) => ({ providerDetail: providerDetail.data, loading: loading.models.providerDetail }))(Detail)
