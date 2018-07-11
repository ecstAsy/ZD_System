import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';


const PolicyAudit = ({
                   location, dispatch, policyAudit, loading,
                 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination } = policyAudit;

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
      aaa
    </Page>
  )
}
PolicyAudit.propTypes = {
  policyAudit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ policyAudit, loading }) => ({ policyAudit, loading }))(PolicyAudit)
