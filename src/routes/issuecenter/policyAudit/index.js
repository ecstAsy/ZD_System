import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import Filter from './Filter'
import queryString from 'query-string';
import classnames from 'classnames';
import styles from './index.less';
import List from './List';
import InsuranceSlipModal from './insuranceSlipModal'

const PolicyAudit = ({
                   location, dispatch, policyAudit, loading,
                 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination, InsuranceSlipModalVisible, currentItem} = policyAudit;

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


  const listProps = {
    dataSource:list,
    loading:loading.effects['policyAudit/query'],
    pagination,
    onChange(page){
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    handleListAction(payload){
      dispatch({
        type:'policyAudit/showModal',
        payload
      })
    }
  };

  const insuranceSlipModalProps = {
    visible : InsuranceSlipModalVisible,
    maskClosable: false,
    title:'投保单',
    width:'55%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyAudit/hideModal'
      })
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <div className={classnames(styles.totalPrice)}>
        除税保费合计：<span className='allNum'>3628.50</span>万元<span className='listNum'>（商业险: <span className='comNum'>2528.00</span>万元   交强险:<span className='cosNum'>1000.50</span>万元）</span>
      </div>
      <List {...listProps}/>
      {InsuranceSlipModalVisible  && <InsuranceSlipModal {...insuranceSlipModalProps}/>}
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