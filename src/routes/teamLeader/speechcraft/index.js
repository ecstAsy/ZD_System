import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import { Row, Col, Button, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Page } from 'components';
import SpeechCraftList from './speechCraftList';
import AddSpeechCraftList from './addSpeechCraftList';
import EditSpeechCraftModal from './editSpeechCraftModal';



const SpeechCraft = ({location, dispatch, speechcraft, loading})=>{
   location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { speechCraftData, editSpeechCraftModalVisible, currentItem } = speechcraft;
  const EditSpeechCraft = (payload)=>{
    dispatch({
      type:'speechcraft/showModal',
      payload
    })
  };
  const EditSpeechCraftModalProps = {
    visible : editSpeechCraftModalVisible,
    maskClosable: false,
    title:'话术编辑',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    currentItem,
    handleCancel(){
      dispatch({
        type:'speechcraft/hideModal'
      })
    },
    handleSubmit(){

    }
  };
  const addSpeechCraftListProps = {
    EditSpeechCraft,
  }
  const speechCraftListProps = {
    EditSpeechCraft,
  }

  return (
    <Page>
      <div className={classnames(styles.SpeechCraftListBox)}>
        {
          speechCraftData.map((item,i)=>{
            return (
                <SpeechCraftList key={item.id} item={item} {...speechCraftListProps}/>
            )
          })
        }
        <AddSpeechCraftList {...addSpeechCraftListProps}/>
      </div>
      { editSpeechCraftModalVisible &&  <EditSpeechCraftModal {...EditSpeechCraftModalProps}/>}
      {/*{  }*/}
    </Page>
  )
}
SpeechCraft.propTypes = {
  speechcraft: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};
export default connect(({ speechcraft, loading }) => ({ speechcraft, loading }))(SpeechCraft)
