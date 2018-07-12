/**
 * Created by Administrator on 2018/6/25 0025.
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/yewuyuan/record'
import * as recordsService from 'services/yewuyuan/records'
import { pageModel } from '../common'

const { query } = recordsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'record',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/record') {
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
    return { ...state, ...payload, modalVisible: true }
  },

  hideModal (state) {
    return { ...state, modalVisible: false }
  },

  switchIsMotion (state) {
    window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
    return { ...state, isMotion: !state.isMotion }
  },

},
})
