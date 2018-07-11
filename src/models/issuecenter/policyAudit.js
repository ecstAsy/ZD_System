/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/generalData'
import * as applicationsService from 'services/generalData'
import { pageModel } from '../common'

const { query } = applicationsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'policyAudit',

  state: {
    currentItem:'',
    RegisterModalVisible:false,
    AuditModalVisible:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/policyAudit') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {

    showModal (state, { payload }) {
      if(payload.status==='待审核'){
        return { ...state,  AuditModalVisible: true ,currentItem:payload }
      }else if (payload.status==='审核通过'){
        return { ...state,  RegisterModalVisible: true ,currentItem:payload}
      }
    },

    hideModal (state,{payload}) {
      return { ...state, RegisterModalVisible: false,AuditModalVisible:false }
    },

  },
})
