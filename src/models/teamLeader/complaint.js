import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/teamLeader/complaint'
import * as complaintsService from 'services/teamLeader/complaint'
import { pageModel } from '../common'

const { query } = complaintsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'complaint',
  state: {
    currentItem: {},
    auditModalVisible : false ,//审核弹窗
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/complaint') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
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
      console.log(data)
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
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showModal (state, { payload }) {
      console.log(payload)
      if(payload.modalType=='audit'){
        return { ...state, currentItem:payload.data, auditModalVisible: true }
      }
    },
    hideModal (state,{payload}) {
      if(payload.modalType=='audit'){
        return { ...state, auditModalVisible: false }
      }
    }
  },
})
