import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import styles from './index.less';
import List from './List';
import PolicyMoneyActionModal from './policyActionMoneyModal';
import PolicyActionTimeModal from './policyActionTimeModal';

const PolicyRegistration = ({
     location, dispatch, policyRegistration, loading,
   }) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const { list, pagination, PolicyActionMoneyModalVisible, PolicyActionTimeModalVisible, currentItem } = policyRegistration;
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
    loading: loading.effects['policyRegistration/query'],
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    handleListAction(payload){
      dispatch({
        type:'policyRegistration/showModal',
        payload
      })
    }
  };

  const policyActionMoneyModalProps = {
    visible : PolicyActionMoneyModalVisible,
    maskClosable: false,
    title:'登记金额',
    width:'40%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyRegistration/hideModal'
      })
    }
  };

  const policyActionTimeModalProps={
    visible : PolicyActionTimeModalVisible,
    maskClosable: false,
    width:'30%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyRegistration/hideModal'
      })
    }
  }
  return (
    <Page>
      <div className={classnames(styles.wrap)}>
        <List {...listProps}/>
      </div>
      {PolicyActionMoneyModalVisible && <PolicyMoneyActionModal {...policyActionMoneyModalProps}/>}
      {PolicyActionTimeModalVisible && <PolicyActionTimeModal {...policyActionTimeModalProps}/>}
    </Page>
  )
}

PolicyRegistration.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ policyRegistration, loading }) => ({ policyRegistration, loading }))(PolicyRegistration)
