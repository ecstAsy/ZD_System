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
    nowId:'', //当前被移动的元素ID
    newId:'',
    speechCraftData:[
      {id:0,name:'车漆延保卡',detail:'11111111111111111111111'},
      {id:1,name:'无锡',detail:'无锡无锡无锡无锡无锡无锡无锡无锡无锡'},
      {id:2,name:'南京',detail:'南京南京南京南京南京南京南京南京南京'},
      {id:3,name:'单面喷漆卡',detail:'单面喷漆卡单面喷漆卡单面喷漆卡单面喷漆卡单面喷漆卡'},
      {id:4,name:'保养卡',detail:'保养卡保养卡保养卡保养卡保养卡保养卡保养卡保养卡保养卡'},
      {id:5,name:'蜂鸟养车',detail:'蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车蜂鸟养车'},
      {id:6,name:'充电转换器',detail:'充电转换器充电转换器充电转换器充电转换器充电转换器充电转换器'},
      {id:7,name:'四件套',detail:'四件套四件套四件套四件套四件套四件套四件套四件套四件套四件套四件套'},
      {id:8,name:'车载空气净化器',detail:'车载空气净化器车载空气净化器车载空气净化器车载空气净化器'},
      {id:9,name:'人情保',detail:'人情保人情保人情保人情保人情保人情保人情保人情保人情保人情保人情保'},
      {id:10,name:'畅客',detail:'畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客畅客'},
      {id:11,name:'成本核单话术',detail:'成本核单话 术成本核单话 术成本核单话 术成本核单话 术成本核单话 术'},
    ]
  },

  subscriptions: {

  },

  effects: {


  },

  reducers: {

    drag(state, { payload }){
      let nowId = payload.id;

      return { ...state, nowId:nowId}

    },

    allowDrop(state, { payload }){
      let id = payload.id;  //移到当前元素的ID

      return { ...state, newId:id}
    },

    endDrop(state, { payload }){
      let nowId = state.nowId;
      let newId = state.newId;
      if(nowId!=newId){
        let data={};
        let index;
        let speechCraftData = state.speechCraftData;
        for(var i=0;i<speechCraftData.length;i++){
          if(speechCraftData[i].id==nowId){
            data = speechCraftData[i];
            speechCraftData.splice(i,1)
          }
        };
        for(var i=0;i<speechCraftData.length;i++){
          if(speechCraftData[i].id==newId){
            index = i;
          }
        };
        speechCraftData.splice(index,0,data);
        return { ...state,}
      }else{
        return { ...state,}
      }
    },
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
