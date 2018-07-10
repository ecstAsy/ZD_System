import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import { config } from 'utils';
import { create, remove, update } from 'services/teamLeader/complaint';
import * as complaintsService from 'services/teamLeader/complaint';
import { pageModel } from '../common';

const { query } = complaintsService;

export default modelExtend(pageModel, {
  namespace: 'speechcraft',
  state: {
    currentItem: {},
    editSpeechCraftModalVisible:false,
    speechCraftData:[
      {id:1,name:'车漆延保卡',detail:'11111111111111111111111'},
      {id:2,name:'无锡',detail:'无锡无锡无锡无锡无锡无锡无锡无锡无锡'},
      {id:3,name:'南京',detail:'南京南京南京南京南京南京南京南京南京'},
      {id:4,name:'单面喷漆卡',detail:'单面喷漆卡单面喷漆卡单面喷漆卡单面喷漆卡单面喷漆卡'},
      {id:5,name:'保养卡',detail:'保养卡保养卡保养卡保养卡保养卡保养卡保养卡保养卡保养卡'},
      {id:6,name:'蜂鸟养车',detail:'蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车'},
      {id:7,name:'充电转换器',detail:'充电转换器充电转换器充电转换器充电转换器充电转换器充电转换器'},
      {id:8,name:'四件套',detail:'四件套四件套四件套四件套四件套四件套四件套四件套四件套四件套四件套'},
      {id:9,name:'车载空气净化器',detail:'车载空气净化器车载空气净化器车载空气净化器车载空气净化器'},
      {id:10,name:'人情保',detail:'人情保人情保人情保人情保人情保人情保人情保人情保人情保人情保人情保'},
      {id:11,name:'畅客',detail:'畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客'},
      {id:12,name:'成本核单话术',detail:'成本核单话 术成本核单话 术成本核单话 术成本核单话 术成本核单话 术'},

    ]
  },

  subscriptions: {

  },

  effects: {


  },

  reducers: {
    showModal (state, { payload }) {
      if(payload){
        return { ...state,  editSpeechCraftModalVisible: true, currentItem : payload }
      }else{
        return { ...state,  editSpeechCraftModalVisible: true }
      }

    },

    hideModal (state,{payload}) {
      return { ...state, editSpeechCraftModalVisible: false }
    },

  },
})
