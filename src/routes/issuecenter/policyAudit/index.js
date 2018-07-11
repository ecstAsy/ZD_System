import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import Filter from './Filter'
import queryString from 'query-string';
import InsuranceApplicationModal from './insuranceApplicationModal'

const PolicyAudit = ({
                   location, dispatch, policyAudit, loading,
                 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination, InsuranceApplicationModalVisible, } = policyAudit;

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

  const InsuranceApplicationModalProps = {
    visible: InsuranceApplicationModalVisible,
    maskClosable: false,
    title:'投保单',
    width:'55%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleCancel () {
      dispatch({
        type: 'policyAudit/hideModal',
        payload: {
          modalType: 'insureAppAtion',
        },
      })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps}/>
      {InsuranceApplicationModalVisible && <InsuranceApplicationModal {...InsuranceApplicationModalProps}/>}
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
