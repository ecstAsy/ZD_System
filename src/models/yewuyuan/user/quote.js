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
    noteModalVisible: false,//发送短信弹窗
    giftModalVisible:false,//赠送礼品弹窗
    visibleRemark:false,  //备注弹窗
    underwritingModalVisible:false,//承保信息
    choosePurCarModalVisible:false, //选择新车购置价
    deductiblesModalVisible:false,//不计免赔险
    insureInfoModalVisible:true,
    remarkId:'',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    GiftData :[
      {id:1,title:'旅行尊享券',Num:2},
      {id:2,title:'旅行专享券',Num:1},
      {id:3,title:'保养券',Num:0},
      {id:4,title:'单面喷漆卡',Num:0},
      {id:5,title:'床上四件套',Num:0},
      {id:6,title:'车载床垫',Num:0},
      {id:7,title:'车载净化器',Num:0},
      {id:8,title:'车载充电器',Num:0},
      {id:9,title:'车载手机支架吸盘式',Num:0},
      {id:10,title:'记录仪',Num:0},
      {id:11,title:'延保卡',Num:0},
      {id:12,title:'优典券',Num:0},
    ],
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
    ],
    deductiblesData:[
      {id:'25001',name:'此损险不计免赔'},
      {id:'25002',name:'第三责任险不计免赔'},
      {id:'25003',name:'座位险不计免赔'},
      {id:'25004',name:'全车盗抢险不计免赔'},
      {id:'25005',name:'附加险不计免赔特约条款'},
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
      return { ...state, ...payload,}
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
      return { ...state, ...payload, }
    },

    showModal (state, { payload }) {
      if(payload.modalType=='noteAtion'){
        return { ...state, noteModalVisible: true }
      }else if(payload.modalType=='giftAtion'){
        return { ...state, giftModalVisible: true }
      }else if(payload.modalType=='underwriting'){
        return { ...state, underwritingModalVisible: true }
      }else if(payload.modalType=='choosePurCar'){
        return { ...state, choosePurCarModalVisible: true }
      }else if(payload.modalType=='deductibles'){
        return { ...state, deductiblesModalVisible: true }
      }
    },

    hideModal (state,{ payload }) {
      if(payload.modalType==='noteAtion'){
        return { ...state, noteModalVisible: false }
      }else if(payload.modalType==='giftAtion'){
        return { ...state, giftModalVisible: false }
      }else if(payload.modalType==='underwriting'){
        return { ...state, underwritingModalVisible: false }
      }else if(payload.modalType==='choosePurCar'){
        return { ...state, choosePurCarModalVisible: false }
      }else if(payload.modalType==='deductibles'){
        return { ...state, deductiblesModalVisible: false }
      }else if(payload.modalType==='insureAtion') {
        return { ...state, insureInfoModalVisible: false }
      }
    },

    showModalRemark(state, { payload }) {
      return { ...state, ...payload, visibleRemark: true,remarkId:payload.id}
    },

    hideModalRemark(state, { payload }) {
      return { ...state, ...payload, visibleRemark: false }
    },

    choseDesId(state, { payload }){
      return{ ...state,currentItem:payload }
    },
    GiftUpdata(state,{payload}){
      if(payload.modalType=='cost'){
        state.GiftData.map(item=>{
          if(item.id == payload.id){
            item.Num>0 && item.Num--
          }
        })
        return{ ...state }
      }else if(payload.modalType=='add'){
        state.GiftData.map(item=>{
          item.id==payload.id ? item.Num++ : ''
        })
        return{ ...state }
      }else if(payload.modalType=='close'){
        state.GiftData.map(item=>{
          item.id==payload.id ? item.Num = 0 : ''
        })
        return{ ...state }
      }
    }
  },
})
