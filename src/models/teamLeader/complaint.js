import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { config } from 'utils';
import { create, remove, update } from 'services/generalData';
import * as complaintsService from 'services/generalData';
import { pageModel } from '../common';

const { query } = complaintsService;

export default modelExtend(pageModel, {
  namespace: 'complaint',
  state: {
    currentItem: {},
    selectList:[{id:1,userName:'用户',userPlate:'苏E00000',userPhone:'15698766789',salseMan:'业务员1'},
      {id:2,userName:'用户',userPlate:'苏E11111',userPhone:'15698766789',salseMan:'业务员2'}],
    auditModalVisible : false ,//审核弹窗
    allotModalVisible:false,
    addComplaintModalVisible : false , //新增投诉弹窗,
    selectListModalVisible : false,
    selectedUser : ''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/complaint') {
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

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id);
      const newUser = { ...payload, id };
      const data = yield call(update, newUser);
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
      if(payload.modalType === 'audit'){
        return { ...state, currentItem:payload.data, auditModalVisible: true }
      }else if(payload.modalType === 'allot'){
        return { ...state, currentItem:payload.data, allotModalVisible: true }
      }else if(payload.modalType === 'add'){
        return { ...state, addComplaintModalVisible: true }
      }else if (payload.modalType === 'select'){
        return { ...state, selectListModalVisible: true ,addComplaintModalVisible:false}
      }
    },

    hideModal (state,{payload}) {
      if(payload.modalType === 'audit'){
        return { ...state, auditModalVisible: false }
      }else if(payload.modalType === 'allot'){
        return { ...state, allotModalVisible: false }
      }else if(payload.modalType === 'add'){
        return { ...state, addComplaintModalVisible:false }
      }else if (payload.modalType === 'select'){
        return { ...state, selectListModalVisible: false ,addComplaintModalVisible:true}
      }
    },

    changeState(state,{payload}) {
      return {...state, selectedUser: payload}
    }
  },
})
