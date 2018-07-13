import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import Filter from './Filter';
import queryString from 'query-string';
import classnames from 'classnames';
import styles from './index.less';
import List from './List';
import InsuranceSlipModal from './insuranceSlipModal';
import EntryInfoModal from './entryInfoModal';
import ViewPolicyModal from './viewPolicyModal';


const PolicyAudit = ({
   location, dispatch, policyAudit, loading,
 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination, EntryInfoModalVisible,InsuranceSlipModalVisible, currentItem, ViewPolicyModalVisible} = policyAudit;

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
    FilterSearch (value) {
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
        type:'policyAudit/hideModal',
        payload:{
          modalType:'policy'
        }
      })
    },
    handleConfirm(){
      dispatch({
        type:'policyAudit/showModal',
        payload:{
          auditStatus:'审核'
        }
      })
    }
  };

  const entryInfoModalProps = {
    visible : EntryInfoModalVisible,
    maskClosable: false,
    width:'42%',
    closable:false,
    title:'审核',
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyAudit/hideModal',
        payload:{
          modalType:'audit'
        }
      })
    }
  };

  const viewPolicyModalProps = {
    visible : ViewPolicyModalVisible,
    maskClosable: false,
    width:'55%',
    closable:false,
    title:'投保单',
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'policyAudit/hideModal',
        payload:{
          modalType:'view'
        }
      })
    }
  };

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <div className={classnames(styles.totalPrice)}>
        除税保费合计：<span className='allNum'>3628.50</span>万元<span className='listNum'>（商业险: <span className='comNum'>2528.00</span>万元   交强险:<span className='cosNum'>1000.50</span>万元）</span>
      </div>
      <List {...listProps}/>
      {InsuranceSlipModalVisible  && <InsuranceSlipModal {...insuranceSlipModalProps}/>}
      {EntryInfoModalVisible && <EntryInfoModal {...entryInfoModalProps}/>}
      {ViewPolicyModalVisible && <ViewPolicyModal {...viewPolicyModalProps}/>}
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
