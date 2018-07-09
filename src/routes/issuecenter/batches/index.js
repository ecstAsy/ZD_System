import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import List from './List';


const Batches = ({
     location, dispatch, batches, loading,
   }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination } = batches;

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
    loading: loading.effects['batches/query'],
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }


  return (
    <Page inner>

      <List {...listProps}/>
    </Page>
  )
}
Batches.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ batches, loading }) => ({ batches, loading }))(Batches)
