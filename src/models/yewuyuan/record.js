/**
 * Created by Administrator on 2018/6/25 0025.
 */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { config } from 'utils';
import * as recordsService from 'services/yewuyuan/records';
import { pageModel } from '../common';

const { query } = recordsService;
const { prefix } = config;

export default modelExtend(pageModel, {
  namespace: 'record',
  state: {
    currentItem: {},
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
