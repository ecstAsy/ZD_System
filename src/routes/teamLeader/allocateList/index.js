import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import { Row, Col, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import List from './List';


const AllocateList = ({location, dispatch, allocate, loading})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination, currentItem } = allocate;
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };
  const listProps = {
    dataSource: list,
    loading: loading.effects['allocate/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }
  return (
    <Page>
      <div className={classnames(styles.selectBox,styles.bg)}>
        <Row gutter={24}>
          <Col span={20}>
            <span className='title'>名单总数：</span><span className='detail'>12789</span>
          </Col>
          <Col span={20}>
            <span className='title'>筛选条件：</span>
            <span className='detail'>无</span>
            <span className='select'>选择</span>
          </Col>
        </Row>
      </div>
      <div className={classnames(styles.bg,styles.selectContent)}>
        <Row gutter={24}>
          <Col span={20}>
            <span className='title'>名单总数：</span><span className='detail'>12789</span>
          </Col>
        </Row>
        <List {...listProps}/>
      </div>
    </Page>
  )
}
export default connect(({ allocate, loading }) => ({ allocate, loading }))(AllocateList)
