import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm ,Modal,Form} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import classnames from 'classnames';
import styles from './index.less';
import UserInfo from './userInfo'
import TimeInfo from './timeInfo';
import SendInfo from './sendInfo';
const Quote = ({
   location, dispatch, quote, loading,
                     }) => {
   location.query = queryString.parse(location.search)
  const { query, pathname } = location;
  const {
    list, pagination, currentItem,visibleRemark,remarkId, modalVisible, modalType, isMotion, selectedRowKeys,
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
  console.log(visibleRemark)
  return (
      <Page inner>
        <Form >
          <UserInfo {...UserInfoProps}/>
          <TimeInfo/>
          <SendInfo />
        </Form>
      </Page>


  )
}

Quote.propTypes = {
  quote: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default  connect(({ quote, loading }) => ({ quote, loading })) (Quote)
