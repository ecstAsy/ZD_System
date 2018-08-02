/**
 * Created by Administrator on 2018/6/25 0025.
 * 名单查询
 */
import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Row, Col, Button} from 'antd';
import {Page} from 'components';
import queryString from 'query-string';
import List from './List';
import Filter from './Filter';
import styles from './List.less';

const User = ({
  location, dispatch, user, loading, history
}) => {
  location.query = queryString.parse(location.search);
  const {query, pathname} = location;
  const {
    list, pagination, selectedRowKeys, isMore
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
      dispatch({type: 'user/isShowMoreFunc', payload})
    },
    switchIsMotion () {
      dispatch({type: 'user/switchIsMotion'})
    }
  };

  const onAdd = ()=> {
    history.push('user/add');
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Row className='addBox'>
        <Col>
          {`选择 ${selectedRowKeys.length} 项`}
          <Button type="primary" className='addBtn' onClick={onAdd}>新增</Button>
          <Button className='gengzongBtn'>跟踪</Button>
        </Col>
      </Row>
      <List {...listProps} />
    </Page>
  )
};

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};
export default connect(({user, loading}) => ({user, loading}))(User)
