import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { config } from 'utils';
import { create, remove, update } from 'services/generalData';
import * as allocatesService from 'services/generalData';
import { pageModel } from '../common';

const { query } = allocatesService;

export default modelExtend(pageModel, {
  namespace: 'listrecovery',
  state: {
    FilterModalVisible : false ,//筛选条件弹窗,
    allocateListModalVisible:false,//名单分配弹窗,
    salesMan:[
      {id:1,name:'张田'},{id:2,name:'康耀丽'},{id:3,name:'安丽杰'},{id:4,name:'许立梅'},{id:5,name:'周丹'},
      {id:6,name:'柴璐婵'},{id:7,name:'肖俊'},{id:8,name:'蒯红霞'},{id:9,name:'董倩倩'},{id:10,name:'宋慧琳'},
      {id:11,name:'崔绍'},{id:12,name:'安琪'},{id:13,name:'王艳'},{id:14,name:'王晓丽'},{id:15,name:'于春銮'},
      {id:16,name:'徐雪婷'}
    ],
    FilterValues:[
      {id:'firstRegisterTime',title:'初登日期',firstRegisterTime:''},
      {id:'driverTime',title:'年龄',driverTime:''},
      {id:'carType',title:'厂牌型号',carType:''},
      {id:'carUsePeople',title:'车辆所属',carUsePeople:''},
      {id:'insuranceExpireTime',title:'保险到期日',insuranceExpireTime:''},
      {id:'changeNameCar',title:'过户车',changeNameCar:''},
      {id:'lastYearInsuranceCompany',title:'上年保险公司',lastYearInsuranceCompany:''},
      {id:'renewalInsurance',title:'续保',renewalInsurance:''},
      {id:'carSalary',title:'车价',carSalary:''},
      {id:'onWorkRenewal',title:'在职续保',onWorkRenewal:''},
      {id:'area',title:'市场',area:''},
      {id:'highEndCar',title:'高端车',highEndCar:''},
      {id:'carPlate',title:'车牌',carPlate:''},
      {id:'washList',title:'清洗名单',washList:''},
    ]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/listrecovery') {
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
      if(payload.modalType==='filter'){
        return { ...state,  FilterModalVisible: true }
      }else if (payload.modalType==='allocate'){
        return { ...state,  allocateListModalVisible: true }
      }

    },

    hideModal (state,{payload}) {
      if(payload.modalType==='filter'){
        return { ...state,  FilterModalVisible: false }
      }else if (payload.modalType==='allocate'){
        return { ...state,  allocateListModalVisible: false }
      }
    },

    updataFilterValues (state,{ payload }){
      state.FilterValues.map(list=>{
        let name = list.id;
        if(payload.modalType==='add'){
          if(payload.data[name]){
            list.name = payload.data[name]
          }
        }else{
          if(payload.id === list.id){
            list.name = ''
          }
        }
      })
      return {...state,FilterModalVisible: false}
    }
  },
})
