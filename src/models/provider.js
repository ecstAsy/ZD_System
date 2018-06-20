import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import * as providersService from 'services/providers'
import { pageModel } from './common'

const { query, remove } = providersService

export default modelExtend(pageModel, {
  namespace: 'provider',

  state: {
    currentItem: {},
    selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/provider') {
          const payload = queryString.parse(location.search) || { currentPage: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {pageSize: 10, currentPage: 1} }, { call, put }) {
      const data = yield call(query, payload)
      /**
       * 处理异构数据
       */
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call }) {
      yield call(remove, { id: payload })
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

  },
})
