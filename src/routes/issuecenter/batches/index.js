import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import Filter from './Filter';


const Batches = ({
     location, dispatch, batches, loading,
   }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
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
      <Filter {...filterProps}/>
      sss
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
