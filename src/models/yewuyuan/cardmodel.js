import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../common'

import * as cardmodelService from '../services/cardmodel'

export default modelExtend(pageModel, {
  namespace: 'cardmodel',

  state: {
    currentItem: {},
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/cardmodel') {
          const payload = queryString.parse(location.search) || { currentPage: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
      dispatch({ type: 'queryCardkinds' })
    },
  },

  effects: {
    * query ({ payload = { pageSize: 10, currentPage: 1 } }, { call, put }) {
      const data = yield call(cardmodelService.query, payload)
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

    * queryCardkinds ({ payload }, { call, put, select }) {
      const { data } = yield call(cardmodelService.queryCardkind)
      const cardkinds = data.map((value) => {
        return {
          label: value.kindName + '（' + value.kindType + '）',
          value: value.id,
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          cardkinds,
        },
      })
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(cardmodelService.create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put }) {
      const data = yield call(cardmodelService.update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * delete ({ payload }, { call }) {
      yield call(cardmodelService.remove, { id: payload })
    },
  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    updateState (state, { payload }) {
      return { ...state, ...payload }
    },

    openAddPanel (state) {
      return { ...state, addCardPanel: true }
    },

    closeAddPanel (state) {
      return { ...state, addCardPanel: false }
    },

    addCardkind (state, { payload }) {
      const item = state.currentItem
      const cardKindList = item.cardKindList || []
      cardKindList.push(payload)
      return { ...state, addCardPanel: false, currentItem: { ...item, cardKindList } }
    },

    subtractCardkind (state, { payload }) {
      const item = state.currentItem
      item.cardKindList.splice(payload, 1)
      return { ...state, addCardPanel: false, currentItem: { ...item } }
    },
  },
})
