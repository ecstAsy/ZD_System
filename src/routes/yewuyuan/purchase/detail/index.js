import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, List, Card, Button, Icon } from 'antd'
import { connect } from 'dva'

const Detail = ({ purchaseDetail }) => {
  purchaseDetail = purchaseDetail.data
  const disModel = () => {

  }
  return (
    <div>
      <Row style={{ marginTop: '20px' }} gutter={16}>
        <Col span={4}>名称：{purchaseDetail.name}</Col>
        <Col span={3}>联系人：{purchaseDetail.linkMan}</Col>
        <Col span={3}>电话：{purchaseDetail.phone}</Col>
        <Col span={6}>创建时间：{purchaseDetail.createTime ? (purchaseDetail.createTime.substring(0, 4) + '-' + purchaseDetail.createTime.substring(4, 6) + '-' + purchaseDetail.createTime.substring(6, 8) + ' ' + purchaseDetail.createTime.substring(8, 10) + ':' + purchaseDetail.createTime.substring(10, 12)) : '--'}</Col>
      </Row>
      <Row style={{ marginTop: '20px' }} gutter={16}>
        <Col span={24}>
          <List
            header="已分配的卡券包"
            footer={<Button onClick={disModel} type="primary">新分配卡券包模板</Button>}
            grid={{ gutter: 16, column: 3 }}
            dataSource={
              // [{
              //   cardmodelName: '超级大礼包',
              //   batchs: [{
              //     createTime: '2018-01-10',
              //     num: 100,
              //   },
              //   {
              //     createTime: '2018-01-11',
              //     num: 100,
              //   }],
              // }]
              purchaseDetail.cardmodelList
            }
            renderItem={item => (
              <List.Item>
                <Card title={item.cardmodelName}>
                  <Row gutter={16}>
                    <Col span={24} style={{ marginBottom: '10px' }}>
                      <Row>
                        {item.batchs && item.batchs.map((value, key) => <Col key={key} span={12}>{value.createTime}：{value.num}份 <a>导出</a></Col>)}
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Button>生成卡券包批次</Button>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  )
}

Detail.propTypes = {
  purchaseDetail: PropTypes.object,
}

export default connect(({ purchaseDetail }) => ({ purchaseDetail }))(Detail)
