import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm,Form } from 'antd';
import { Page } from 'components';
import queryString from 'query-string';
import classnames from 'classnames';
import styles from './index.less';
import UserInfo from './userInfo'
import CarInsurance from './carInsurance';
import FinalQuote from './finalQuote';
import TimeInfo from './timeInfo';
import SendInfo from './sendInfo';
import NoteModal from './noteModal';

const Quote = ({
   location, dispatch, quote, loading,
                     }) => {
   location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const {
    list, pagination, currentItem,visibleRemark,remarkId, modalVisible, modalType, isMotion, selectedRowKeys,noteModalVisible,insuranceData,strongInsuranceData,choseinsuranceData
  } = quote;
  const UserInfoProps={
    visibleRemark:visibleRemark,
    remarkId:remarkId,
    addRemarkFunc(id){
      console.log(id)
      dispatch({
        type: 'quote/showModalRemark',
        payload: {
         id:id?id:'',
        },
      })
    },
    RemarkCancel(){
      dispatch({
        type: 'quote/hideModalRemark',
      })
    },
    saveRemark(data){
      console.log(data)
      dispatch({
        type: 'quote/hideModalRemark',
        payload: {
          data:data,
        },
      })
    }
  }

  const CarInsuranceProps={
    insuranceData:insuranceData,
    choseinsuranceData,
    strongInsuranceData,
    checkedInsuranceFunc(id){
        console.log(id)
      dispatch({
        type: 'quote/checkedInsuranceFunc',
        payload: {
          id:id,
        },
      })
    },
    checkedStrongInsurFunc(id){
      dispatch({
        type: 'quote/checkedStrongInsurFunc',
        payload: {
          id:id,
        },
      })
    }
  }

  const finalProps = {
    sendNote(){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'noteAtion'
        },
      })
    }
  };
  const noteModalProps = {
    item: {},
    visible: noteModalVisible,
    maskClosable: false,
    title:'短信通知客户',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    cancelText:'关闭',
    onCancel () {
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'noteAtion',
        },
      })
    },
  };
  return (
      <Page>
        <Form >
          <UserInfo {...UserInfoProps}/>
          <CarInsurance {...CarInsuranceProps}/>
          <FinalQuote {...finalProps}/>
          <TimeInfo/>
          <SendInfo />
        </Form>
        {noteModalVisible && <NoteModal {...noteModalProps} />}
        <div className="buttonBox">
          <Button type="primary">保存</Button>
          <Button type="primary">跟踪提交</Button>
          <Button type="primary">成功提交</Button>
          <Button type="primary">失败提交</Button>
          <Button type="primary">其他业务</Button>
        </div>
      </Page>


  )
}

Quote.propTypes = {
  quote: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ quote, loading }) => ({ quote, loading }))(Quote)
