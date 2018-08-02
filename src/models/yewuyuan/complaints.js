/**
 * Created by Administrator on 2018/8/1 0001.
 */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as complaintsService from 'services/generalData';
import { pageModel } from '../common';

const { query, remove} = complaintsService;

export default modelExtend(pageModel, {
  namespace: 'complaints',
  state: {
    currentItem: {},
    viewList:[ {handleTime:'2018-7-17', dis:'111', complaintStatus:'处理中', processor:'业务员1',},
      {handleTime:'2018-7-18', dis:'111', complaintStatus:'处理失败', processor:'业务员2',},
      {handleTime:'2018-7-18', dis:'111', complaintStatus:'处理成功', processor:'业务员1',
      },],
    dealModalVisible : false ,//处理投诉
    viewComplaintModalVisible: false ,//查看投诉
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/complaints') {
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
      console.log(payload)
      if(payload.modalType === 'deal'){
        return { ...state, currentItem:payload.data, dealModalVisible: true }
      }else if (payload.modalType === 'view'){
        return {...state, currentItem:payload.data, viewComplaintModalVisible: true }
      }
    },

    hideModal (state,{payload}) {
      if(payload.modalType === 'deal'){
        return { ...state, dealModalVisible: false }
      }else if (payload.modalType === 'view'){
        return { ...state, viewComplaintModalVisible: false}
      }
    },
  },
})
