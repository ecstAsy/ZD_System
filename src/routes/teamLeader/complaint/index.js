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
import AddComplaintModal from './addComplaintModal';
import SelectListModal from './selectListModal';

const Complaint = ({location, dispatch, complaint,   loading,})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, selectList, selectedUser, pagination, currentItem, auditModalVisible, addComplaintModalVisible, selectListModalVisible } = complaint;

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
      list.status == '' &&
        dispatch({
          type: 'complaint/showModal',
          payload: {
            modalType: 'audit',
            data: list,
          },
        })
    }
  };

  const auditModal = {
    item: currentItem,
    visible: auditModalVisible,
    maskClosable: false,
    title:'投诉审核',
    width:'40%',
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
          modalType: 'audit'
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
      { auditModalVisible && <AuditModal {...auditModal}/> }
      { addComplaintModalVisible && <AddComplaintModal {...addComplaintModalProps}/> }
      { selectListModalVisible && <SelectListModal {...selectListModalProps}/> }
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
