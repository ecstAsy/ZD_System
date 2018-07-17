/**
 * Created by Administrator on 2018/7/2 0002.
 */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { config } from 'utils';
import { create, remove, update } from 'services/yewuyuan/user';
import * as usersService from 'services/yewuyuan/users';
import { pageModel } from '../common';

const { query } = usersService;
const { prefix } = config;

export default modelExtend(pageModel, {
  namespace: 'parameter',

  state: {
    currentItem: {},
    remarkId:'',
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    ListData : [{name:'周丹:',num:'10'},{name:'周0丹:',num:'10'},
      {name:'周1丹:',num:'10'},{name:'周2丹:',num:'10'},{name:'周3丹:',num:'10'},
      {name:'周4丹:',num:'10'}],
    mouthDate : [{id:1,date:'2018-05'},{id:2,date:'2018-06'},{id:3,date:'2018-07'},
      {id:4,date:'2018-08'},{id:5,date:'2018-09'}],
    isEdit:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/parameter') {
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
    isEditFunc( state ){
      return { ...state,  isEdit: ! state.isEdit }
    },
    handleCancelFunc( state ){
      return { ...state,  handleCancel: ! state.isEdit }
    },
    choseDesId(state, { payload }){
      return{
        ...state,currentItem:payload
      }
    },
  },
})
