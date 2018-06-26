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
  namespace: 'successPolicy',

  state: {
    currentItem: {},
    modalVisible: false,  //报价弹窗
    sendModalVisible : false ,//派送弹窗
    isMore:false,
    visibleRemark:false,  //新增备注
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/successPolicy') {
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

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
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
      if(payload.modalType=='quotation'){
        return { ...state, ...payload, modalVisible: true }
      }else if(payload.modalType=='addRemark'){
        return { ...state, ...payload, visibleRemark: true }
      }else {
        return { ...state, ...payload, sendModalVisible: true }
      }
    },
    isShowMoreFunc( state, { payload }){
      console.log(payload)
      return { ...state,  isMore: !payload }
    },
    hideModal (state,{payload}) {
      if(payload.modalType=='quotation'){
        return { ...state, modalVisible: false }
      }else if(payload.modalType=='addRemark'){
        return { ...state, ...payload, visibleRemark: false }
      }else{
        return { ...state, sendModalVisible: false }
      }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
