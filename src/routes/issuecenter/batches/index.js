import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import Filter from './Filter';
import List from './List';
import RegisterModal from './registerModal';
import AuditModal from './auditModal';


const Batches = ({
     location, dispatch, batches, loading,
   }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination, RegisterModalVisible, AuditModalVisible, currentItem } = batches;

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
    handleListAction(payload){
      dispatch({
        type:'batches/showModal',
        payload
      })
    }
  };

  const registerModalProps = {
    visible : RegisterModalVisible,
    maskClosable: false,
    title:'批单登记',
    width:'30%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'batches/hideModal'
      })
    },
  };

  const auditModalProps = {
    visible : AuditModalVisible,
    maskClosable: false,
    title:'批单审核',
    width:'45%',
    closable:false,
    currentItem,
    wrapClassName: 'vertical-center-modal',
    handleCancel(){
      dispatch({
        type:'batches/hideModal'
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

      <List {...listProps}/>
      <Filter {...filterProps}/>
      {RegisterModalVisible && <RegisterModal {...registerModalProps}/>}
      {AuditModalVisible  && <AuditModal {...auditModalProps}/>}
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
