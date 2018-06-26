/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from 'services/yewuyuan/application'
import * as applicationsService from 'services/yewuyuan/applications'
import { pageModel } from '../../common'

const { query } = applicationsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'quote',

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
        if (location.pathname === '/purchase') {
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
      let innerData = data.data
      data.data = innerData.data
      data.total = innerData.totalRows
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call }) {
      yield call(remove, { id: payload })
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(purchasesService.remove, payload)
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

    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
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

  },
})
