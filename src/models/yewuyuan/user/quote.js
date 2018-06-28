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
    noteModalVisible: false,
    visibleRemark:false,
    remarkId:'',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    insuranceData:[
      {id:25001,checked:false,name:'车辆损失险',coverage:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25002,checked:false,name:'第三者责任险',ex:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25003,checked:false,name:'驾驶员座位险',coverage:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25004,checked:false,name:'乘客座位险/座',coverage:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25005,checked:false,name:'玻璃单独破碎险',ex:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25006,checked:false,name:'全车盗抢险',coverage:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25007,checked:false,name:'自燃损失险',coverage:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25008,checked:false,name:'车身划痕险',ex:'',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25009,checked:false,name:'涉水险',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25010,checked:false,name:'无法找到第三方特约险',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
      {id:25011,checked:false,name:'不计免赔险',discount_cost:'',discount_costAblead:true,coverageAblead:true,},
    ],
    choseinsuranceData:[],  //已选的商业险
    strongInsuranceData:[
      {id:25012,checked:false,name:'车船税',travelTax:'',discount_costAblead:true,coverageAblead:true,},
    ]

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
    checkedInsuranceFunc(state, { payload }){
      let id = payload.id;
      let insuranceData = state.insuranceData;
      let choseinsuranceData = [];
      for(let item of insuranceData){
          if(item.id==id){
            item.checked=!item.checked;
            if(id==25002||id==25003||id==25004||id==25005||id==25008){
                item.coverageAblead=!item.coverageAblead;
            }
          }
      }
      for(let item of insuranceData){
          if(item.checked){
            choseinsuranceData.push(item.name);
          }
      }
      return { ...state, ...payload, insuranceData: insuranceData ,choseinsuranceData:choseinsuranceData,}
    },

    checkedStrongInsurFunc(state, { payload }){
      let id = payload.id;
      let strongInsuranceData = state.strongInsuranceData;
      for(let item of strongInsuranceData){
        if(item.id==id){
          item.checked=!item.checked;
          item.coverageAblead=!item.coverageAblead;
        }
      }
      return { ...state, ...payload, strongInsuranceData: strongInsuranceData}
    },

    showModal (state, { payload }) {
      if(payload.modalType=='noteAtion'){
        return { ...state, noteModalVisible: true }
      }
    },
    showModalRemark(state, { payload }) {
      console.log(payload.id)
      return { ...state, ...payload, visibleRemark: true,remarkId:payload.id}
    },
    hideModalRemark(state, { payload }) {
      return { ...state, ...payload, visibleRemark: false }
    },

    hideModal (state) {
      if(payload.modalType=='noteAtion'){
        return { ...state, noteModalVisible: false }
      }
    },

  },
})
