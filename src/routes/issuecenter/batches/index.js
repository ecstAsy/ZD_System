import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';



const Barches = ({
     location, dispatch, barches, loading,
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



  return (
    <Page inner>

      sss
    </Page>
  )
}
Barches.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ barches, loading }) => ({ barches, loading }))(Barches)
