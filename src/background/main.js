import hotReload from '@/utils/hotReload'
import api from "@/api/index.js"

hotReload()
//api.testApi.test()
console.log('this is background main.js')


// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log('back监听');
    sendResponse(sender)
    let requectFunc = {
      getBaiduID:async data =>{
        console.log(request.data.id);
        let kw = getById(request.data.id).nodeValue
        longConnectMsgSend('content',{name:'getBaiduID',baidukw: kw})
      }
    }
    requectFunc[request.name] && requectFunc[request.name](request.data)
  });

// chrome长连接消息发送
async function longConnectMsgSend(type,data){
  let connectObj = {
    content:"sulg-long-connect-content",
    popup:"sulg-long-connect-popup"
  }
  let tabId = await getCurrentTabId()
  let port = chrome.tabs.connect(tabId, {name: connectObj[type]});
  port.postMessage(data)
}
function getById(id){
  return document.getElementById('#'+ id);
}


