
/* global window */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as applicationsService from 'services/generalData';
import { pageModel } from '../common';

const { query } = applicationsService;

export default modelExtend(pageModel, {
  namespace: 'policyRegistration',

  state: {
    currentItem:'',
    PolicyActionMoneyModalVisible:false,
    PolicyActionTimeModalVisible:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/policyRegistration') {
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
      if(payload.policyAction==='修改登记金额'){
        return { ...state,  PolicyActionMoneyModalVisible: true, currentItem:payload }
      }else if(payload.policyAction==='修改缴费日期'||payload.policyAction==='登记缴费日期'){
        return { ...state,  PolicyActionTimeModalVisible: true, currentItem:payload }
      }
    },

    hideModal (state,{payload}) {
      return { ...state, PolicyActionMoneyModalVisible: false, PolicyActionTimeModalVisible:false }
    },

  },
})
