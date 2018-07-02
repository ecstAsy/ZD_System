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
const Complaint = ({location, dispatch, complaint, loading,})=>{
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;;
  const { list, pagination, currentItem, auditModalVisible } = complaint;

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
    width:'30%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleConfirm(){

    },
    handleReject(){

    },
    handleCancel(){
      dispatch({
        type: 'complaint/hideModal',
        payload: {
          modalType: 'audit'
        },
      })
    }
  }

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <Row style={{ marginBottom: 10, textAlign: 'right', fontSize: 13 }}>
        <Col>
          <Button type="primary" style={{ width:80 }}>新增</Button>
        </Col>
      </Row>
      <List {...listProps}/>
      {auditModalVisible && <AuditModal {...auditModal}/>}
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
