import request from "@/utils/http.js"
import request2 from "@/utils/http2.js"
import request3 from "@/utils/http3.js"

class Odds{
  insert(params){
    return request.post('lotterBMsix/updateScore',params).then((data)=>{
      console.info(data)
    })
  }
  getOddsByKeName(params){
    return request3.post('v1/match/matchResultList/',params);
  }
  insert_mq(params){
    return request.post('lotterBMsix',params).then((data)=>{
      console.info(data)
    });
  }
  insertFive(){
    return request.post('lotterBMsix/allMatchToday',{token: request3.token}).then((data)=>{
      console.info(data)
    });
  }
  insert_ob(params){
    return request.post('lotterBMsix/ob',params).then((data)=>{
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