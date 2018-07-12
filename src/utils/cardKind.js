import { request } from 'utils'


function* baum () {
  yield request({
    url: 'http://0.0.0.0:8000/api_1/cardKindNameList',
    method: 'get',
  }).then(result => console.log(result))
}


let CARD_KINDS = (function () {
  const b = baum()
  b.next()

  return [{
    value: 1,
    lable: '111111111',
  }]
}())

module.exports = CARD_KINDS
