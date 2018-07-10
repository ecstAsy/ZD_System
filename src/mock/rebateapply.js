import Mock from 'mockjs';
import config from '../utils/config';

const { apiPrefix } = config;
let rebateApplyListsData = Mock.mock({
  'data|80-100':[{
    id : '@id',
    'applicant|1' : ['业务员1','业务员2','业务员3','业务员4'],
    applyTime : '@datetime("yyyy-MM-dd HH:mm:ss")',
    customer : '@cname',
    carPlate : /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    'insuranceCompany|1' : ['人保/苏州/人保1','人保/常州/人保2','人保/无锡/人保3','人保/南京/人保4','人保/江阴/人保1'],
    'commercialNum|2000-5000.1-10' : 1,
    'rebateRatio|14-28.1-10': 1,
    'overTopNum|150-300.1-10' : 1,
    'heightRatio|14-34.1-10' : 1,
    applyType : '保单申请',
    'status|1' : ['驳回','未处理','同意','上级申请中'],
    'remark|1' : ['没超','正常']
  }]
})

let database = rebateApplyListsData.data;

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

module.exports = {
  [`GET ${apiPrefix}/rebateapply`] (req, res) {
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
  },

  [`DELETE ${apiPrefix}/rebateapply`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/rebateapply`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png')
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/rebateapply/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/rebateapply/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/rebateapply/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
