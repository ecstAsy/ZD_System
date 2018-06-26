/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/teamLeader/successPolicy'
import * as successPolicysService from 'services/teamLeader/successPolicys'
import { pageModel } from '../common'

const { query } = successPolicysService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'userInfo',

  state: {
    visibleRemark:false,  //新增备注
  },

  subscriptions: {

  },

  effects: {



  },

  reducers: {

    showModal (state, { payload }) {
      if(payload.modalType=='quotation'){
        return { ...state, ...payload, modalVisible: true }
      }else if(payload.modalType=='addRemark'){
        return { ...state, ...payload, visibleRemark: true }
      }

    },

    hideModal (state,{payload}) {
      if(payload.modalType=='quotation'){
        return { ...state, modalVisible: false }
      }

    },


  },
})
