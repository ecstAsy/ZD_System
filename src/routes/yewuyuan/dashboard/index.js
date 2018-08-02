import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { color } from 'utils';
import { Page } from 'components';
import styles from './index.less';
import Pie from './pie';

const Dashboard =({ dashboard, loading }) =>{
  const {sales} = dashboard;

  const data=[
    {title:'预约',data:[ {value:5, name:'已跟踪'},
      {value:10, name:'未跟踪'},]},
    {title:'首播',data:[ {value:20, name:'已处理'},
      {value:10, name:'未处理'},]},
    {title:'投诉',data:[ {value:25, name:'需处理'},
      {value:5, name:'未处理'},]},
    {title:'今日派单',data:[ {value:15, name:'成功'},
      {value:2, name:'失败'},]}
  ];

  return (
    <Page  inner loading={loading.models.dashboard && sales.length === 0} className={styles.dashboard}>
      <Row gutter={24}>
          {data.map((item,key)=>{
              return(
                <Col lg={12} md={24} className='dash'  key={key}>
                  <Pie title={item.title} data={item.data}/>
                </Col>
              )
          })}
      </Row>
    </Page>
  )
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
