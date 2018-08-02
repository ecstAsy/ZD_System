
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as applicationsService from 'services/generalData';
import { pageModel } from '../common';

/**
 * 把B作为一个叫做A的表格
 * A是一个object
 * 使用规则：const {a}=A or A.a
 * @ import * as A from 'B' ;
 * */

const { query } = applicationsService;

export default modelExtend(pageModel, {
  namespace: 'batches',
  state: {
    currentItem:'',
    RegisterModalVisible:false,
    AuditModalVisible:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/batches') {
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
      if(payload.policyStatus==='待审核'){
        return { ...state,  AuditModalVisible: true ,currentItem:payload }
      }else if (payload.policyStatus==='审核通过'){
        return { ...state,  RegisterModalVisible: true ,currentItem:payload}
      }
    },

    hideModal (state,{payload}) {
      return { ...state, RegisterModalVisible: false,AuditModalVisible:false }
    }
  }
})
