import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as allocatesService from 'services/generalData';
import { pageModel } from '../common';

const { query } = allocatesService;

export default modelExtend(pageModel, {
  namespace: 'allocate',
  state: {
    currentItem: {},
    FilterModalVisible : false ,//筛选条件弹窗,
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
        if (location.pathname === '/allocate') {
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
        return { ...state,  FilterModalVisible: true }
    },

    hideModal (state,{payload}) {
        return { ...state, FilterModalVisible: false }
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
