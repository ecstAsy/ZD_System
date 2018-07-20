import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import queryString from 'query-string';
import Filter from './Filter';
import List from './List';
import AuditModal from './auditModal';
import AllotModal from './allotModal';
import AddComplaintModal from './addComplaintModal';
import ViewComplaintModal from './viewComplaintModal';
import SelectListModal from './selectListModal';

const Complaint = ({location, dispatch, complaint,   loading,})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, selectList, viewList, selectedUser, pagination, currentItem, auditModalVisible, allotModalVisible, viewComplaintModalVisible, addComplaintModalVisible, selectListModalVisible } = complaint;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };

  const onAddComplaint = ()=>{
    dispatch({
      type: 'complaint/showModal',
      payload: {
        modalType: 'add'
      },
    })
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
          type: 'complaint/showModal',
          payload: {
            modalType: list.complaintStatus === ''?'audit':list.complaintStatus === '未处理'?'allot':list.complaintStatus === '返现驳回'?'view':list.complaintStatus === '返现通过'?'view':'',
            data: list,
          },
        })
    }
  };

  const auditModalProps = {
    item: currentItem,
    visible: auditModalVisible,
    maskClosable: false,
    title:'投诉审核',
    width:'45%',
    closable:false,
    viewList,
    wrapClassName: 'vertical-center-modal',
    handleConfirm(payload){


    },
    handleReject(payload){


    },
    handleCancel(){
      dispatch({
        type: 'complaint/hideModal',
        payload: {
          modalType: 'audit'
        },
      })
    }
  };

  const viewComplaintModalProps = {
    visible : viewComplaintModalVisible,
    maskClosable: false,
    title:'处理投诉',
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
        type:'complaint/hideModal',
        payload: {
          modalType: 'view'
        },
      })
    },
  };

  const allotModalProps = {
    item: currentItem,
    visible: allotModalVisible,
    maskClosable: false,
    title:'分配投诉',
    width:'30%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleConfirm(payload){


    },
    handleReject(payload){


    },
    handleCancel(){
      dispatch({
        type: 'complaint/hideModal',
        payload: {
          modalType: 'allot'
        },
      })
    }
  };

  const addComplaintModalProps = {
    visible: addComplaintModalVisible,
    maskClosable: false,
    title:'新增投诉',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    selectedUser,
    handleCancel(){
      dispatch({
        type: 'complaint/hideModal',
        payload: {
          modalType: 'add'
        }
      })
    },
    showSelectList(){
      dispatch({
        type: 'complaint/showModal',
        payload: {
          modalType: 'select'
        }
      })
    }
  };

  const selectListModalProps = {
    visible: selectListModalVisible,
    maskClosable: false,
    title:'新增投诉',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    selectList,
    handleCancel(){
      dispatch({
        type: 'complaint/hideModal',
        payload: {
          modalType: 'select'
        },
      })
    },
    handleConfirm(payload){
      dispatch({
        type:'complaint/changeState',
        payload
      })
    },
    FilterSearch (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    }
  }

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <Row style={{ marginBottom: 10, textAlign: 'right', fontSize: 13 }}>
        <Col>
          <Button type="primary" style={{ width:80 }} onClick={onAddComplaint}>新增</Button>
        </Col>
      </Row>
      <List {...listProps}/>
      { auditModalVisible && <AuditModal {...auditModalProps}/> }
      { allotModalVisible && <AllotModal {...allotModalProps}/> }
      { addComplaintModalVisible && <AddComplaintModal {...addComplaintModalProps}/> }
      { selectListModalVisible && <SelectListModal {...selectListModalProps}/> }
      { viewComplaintModalVisible && <ViewComplaintModal {...viewComplaintModalProps}/>}
    </Page>
  )
}
Complaint.propTypes = {
  complaint: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ complaint, loading }) => ({ complaint, loading }))(Complaint)
