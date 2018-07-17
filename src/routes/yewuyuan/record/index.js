/**
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import List from './List';
import Filter from './Filter';

const Record = ({
  location, dispatch, record, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const { list, pagination } = record;

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
    loading: loading.effects['record/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  };

  const filterProps = {
    filter: {
        ...query,
    },
    onFilterChange (value) {
    handleRefresh({
        ...value,
      page: 1,
    })
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
};

Record.propTypes = {
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(Record)
