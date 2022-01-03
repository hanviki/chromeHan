import request from "@/utils/http.js"
import request2 from "@/utils/http2.js"
import request3 from "@/utils/http3.js"

class Odds{
  insert(params){
    return request.post('lotterBMatch',params).then((data)=>{
      console.info(data)
    });
  }
  getOddsByKeName(params){
    return request2.get('lotterBMatch',params);
  }
  insert_mq(params){
    return request.post('lotterBMsix',params).then((data)=>{
      console.info(data)
    });
  }
  getOddsByKeName_jinqiu(params){
    return request2.get('lotterBJinqiu',params);
  }
  insert_rangqiu(params){
    return request.post('lotterBRangqiu',params).then((data)=>{
      console.info(data)
    });
  }
  getOddsByKeName_rangqiu(params){
    return request2.get('lotterBRangqiu',params);
  }
  m6(params){
    return request3.post('v1/match/getMatchDetail/',params)
  }
  m6List(params){
    return request3.post('v1/match/getList/',params)
  }
}

const odds = new Odds()
export default odds