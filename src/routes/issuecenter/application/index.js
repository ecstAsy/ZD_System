import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import List from './List';



const Application = ({
     location, dispatch, application, loading,
 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination } = application;
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
    pagination,
    loading: loading.effects['application/query'],
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  };

  return (
    <Page inner>

      <List {...listProps}/>
    </Page>
  )
}

Application.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ application, loading }) => ({ application, loading }))(Application)
