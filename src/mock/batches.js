import Mock from 'mockjs';
import config from '../utils/config';

const { apiPrefix } = config;

let applicationListData = Mock.mock({
  'data|80-100':[
    {
      id:'@id',
      name:'@cname',
      'insuranceCompany|1' : ['人保/苏州/人保1','人保/常州/人保2','人保/无锡/人保3','人保/南京/人保4','人保/江阴/人保1'],
      carPlate : /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      batchTime : '@datetime("yyyy-MM-dd")',
      'team|1' :['团队1','团队2','团队3','团队4','团队5','团队6','团队7','团队8'] ,
      'processor|1':['业务员1','业务员2','业务员3','业务员4'],
      'status|1':['退保','待审核','审核通过'],
      'costNum|1':['2.00','3.00','6.00','0.50','0.46',''],
      'register|1':['登记完整','-'],
      'insuranceNum|900-5000.1-2' : 1,
      batchInfo:'京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领，京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领',
      remark:'京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领,京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领'
    }
  ]
})

let database = applicationListData.data;
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;
  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }
  if (data) {
    return data;
  }
  return null;
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

module.exports ={
  [`GET ${apiPrefix}/batches`] (req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  }
}
