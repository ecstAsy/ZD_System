import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {Button,Form } from 'antd';
import { Page, RemarkMadal } from 'components';
import UserInfo from './userInfo';
import CarInsurance from './carInsurance';
import FinalQuote from './finalQuote';
import TimeInfo from './timeInfo';
import SendInfo from './sendInfo';
import NoteModal from './noteModal';
import GiftModal from './giftModal';
import UnderWritingMadal from './underwritingModal';
import ChoosePurCarModal from './choosePurCarModel';
import DeductiblesModal from './deductiblesModal';
import InsureInfoModal from './insureInfoModal';

const Quote = ({
  dispatch, quote, loading,}) => {
  const {
    choseItem, currentItem, visibleRemark, giftModalVisible , deductiblesModalVisible, deductiblesData, okMianpeiData,
    underwritingModalVisible, choosePurCarModalVisible, remarkId, GiftData, noteModalVisible, insuranceData,
    strongInsuranceData , insureInfoModalVisible
  } = quote;

  const UserInfoProps={
    visibleRemark:visibleRemark,
    remarkId:remarkId,
    addRemarkFunc(id){
      dispatch({
        type: 'quote/showModalRemark',
        payload: {
         id:id?id:'',
        },
      })
    },

    openUnderwriting(data){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'underwriting'
        },
      })
    },

    choosePurCar(data){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'choosePurCar'
        },
      })
    },
  };

  const UnderwritingProps={
    item: {},
    visible: underwritingModalVisible,
    title:'承保信息',
    width:'90%',
    closable:false,
    onCancel(){
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'underwriting'
        },
      })
    }
  };

  const choosePurCarProps={
    visible: choosePurCarModalVisible,
    title:'选择新车购置价',
    width:'90%',
    closable:false,
    onOk(data){
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'choosePurCar',
          data:data,
        },
      })
    },

    onCancel(){
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'choosePurCar'
        },
      })
    }
  };

  const DeductiblesProps={
    visible: deductiblesModalVisible,
    title:'不计免赔险',
    width:'50%',
    deductiblesData,
    closable:false,
    onOk(data){
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'deductiblesSave',
          data:data,
        },
      })
    },

    onCancel(){
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'deductibles'
        },
      })
    },

    chosemianpei(id){
      dispatch({
        type: 'quote/chosemianpei',
        payload: {
          id:id,
        },
      })
    }
  };

  const CarInsuranceProps={
    insuranceData:insuranceData,
    strongInsuranceData,
    okMianpeiData,
    checkedInsuranceFunc(id){
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
    },

    deductiblesModal(data){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'deductibles'
        },
      })
    }
  };

  const finalProps = {
    sendNote(){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'noteAtion'
        },
      })
    },

    chooseGift (){
      dispatch({
        type: 'quote/showModal',
        payload: {
          modalType: 'giftAtion'
        },
      })
    }
  };

  const noteModalProps = {
    loading,
    item: {},
    visible: noteModalVisible,
    maskClosable: false,
    title:'短信通知客户',
    width:'45%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    choseItem:choseItem,
    currentItem:currentItem,
    handleCancel () {
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'noteAtion',
        },
      })
    },

    choseDesId(item){
      dispatch({
        type: 'quote/choseDesId',
        payload: item,
      })
    }
  };

  const giftModalProps = {
    item: {},
    GiftData,
    visible: giftModalVisible,
    maskClosable: false,
    title:'选择礼品',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleCost(id){
      dispatch({
        type: 'quote/GiftUpdata',
        payload: {
          modalType: 'cost',
          id:id
        },
      })
    },

    handleAdd(id){
      dispatch({
        type: 'quote/GiftUpdata',
        payload: {
          modalType: 'add',
          id:id
        },
      })
    },

    TagClose(id){
      dispatch({
        type: 'quote/GiftUpdata',
        payload: {
          modalType: 'close',
          id:id
        },
      })
    },

    handleCancel () {
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'giftAtion',
        },
      })
    },
  };

  const InsureInfoModalProps = {
    visible: insureInfoModalVisible,
    maskClosable: false,
    title:'投保单',
    width:'53%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    handleCancel () {
      dispatch({
        type: 'quote/hideModal',
        payload: {
          modalType: 'insureAtion',
        },
      })
    },
  };

  const RemarkMadalProps={
    visible: visibleRemark,
    title:remarkId==''?'新增备注':'修改备注',
    onOk(data){
      dispatch({
        type: 'quote/hideModalRemark',
        payload: {
          data:data,
        },
      })
    },
    onCancel(){
      dispatch({
        type: 'quote/hideModalRemark',
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
        {giftModalVisible && <GiftModal {...giftModalProps}/>}
        {underwritingModalVisible && <UnderWritingMadal {...UnderwritingProps} />}
        {choosePurCarModalVisible && <ChoosePurCarModal {...choosePurCarProps} />}
        {deductiblesModalVisible && <DeductiblesModal {...DeductiblesProps}/>}
        {insureInfoModalVisible && <InsureInfoModal {...InsureInfoModalProps}/>}
        {visibleRemark&&<RemarkMadal {...RemarkMadalProps}/>}
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
