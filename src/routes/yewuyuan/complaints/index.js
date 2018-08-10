/**
 * Created by Administrator on 2018/8/1 0001.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import Filter from './Filter';
import List from './List';
import DealModal from './dealModal';
import ViewComplaintModal from './viewComplaintModal';

const Complaints = ({location, dispatch, complaints, loading})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, viewList, pagination, currentItem, dealModalVisible, viewComplaintModalVisible} = complaints;

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
    location,
    FilterSearch (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    }
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['complaint/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    handleStatus (list) {
      dispatch({
        type: 'complaints/showModal',
        payload: {
          modalType: list.complaintsStatus === ''?'deal':list.complaintsStatus === '未处理'?'deal':list.complaintsStatus === '成功处理'?'view':list.complaintsStatus === '失败处理'?'view':'',
          data: list,
        },
      })
    }
  };

  const dealModalProps = {
    item: currentItem,
    visible: dealModalVisible,
    maskClosable: false,
    title:'投诉处理',
    width:'45%',
    closable:false,
    viewList,
    wrapClassName: 'vertical-center-modal',
    handleConfirm(payload){

    },
    handleCancel(){
      dispatch({
        type: 'complaints/hideModal',
        payload: {
          modalType: 'deal'
        },
      })
    }
  };

  const viewComplaintModalProps = {
    visible : viewComplaintModalVisible,
    maskClosable: false,
    title:'查看投诉',
    width:'45%',
    closable:false,
    item: currentItem,
    viewList,
    wrapClassName: 'vertical-center-modal',
    handleConfirm(payload){

    },
    handleReject(payload){

    },
    handleCancel(){
      dispatch({
        type:'complaints/hideModal',
        payload: {
          modalType: 'view'
        },
      })
    }
  };

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <List {...listProps}/>
      { dealModalVisible && <DealModal {...dealModalProps}/> }
      { viewComplaintModalVisible && <ViewComplaintModal {...viewComplaintModalProps}/>}
    </Page>
  )
}

Complaints.propTypes = {
  complaints: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ complaints, loading }) => ({ complaints, loading }))(Complaints)
