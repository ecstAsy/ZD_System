import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import { Page } from 'components';
import queryString from 'query-string';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const User = ({
  location, dispatch, user, loading, history
}) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, isMore
  } = user;

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
    loading: loading.effects['user/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'user/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    toQuoteFunc(id){
      history.push('user/quote');
    }
  };

  const filterProps = {
    isMore,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    isShowMoreFunc(payload){
      dispatch({ type: 'user/isShowMoreFunc', payload })
    },
    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  };

  const onAdd=()=>{
    history.push('user/add');
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Row style={{ marginBottom: 10, textAlign: 'right', fontSize: 13 }}>
        <Col>
          {`选择 ${selectedRowKeys.length} 项`}
          <Button type="primary" style={{ marginLeft: 8 }} onClick={onAdd}>新增</Button>
          <Button style={{ marginLeft: 8,border:'1px #ffaf38 solid',color:'#ffaf38',background:'#fff8e3' }}>跟踪</Button>
        </Col>
      </Row>
      <List {...listProps} />
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
