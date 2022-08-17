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
  ob(params){ //获取OB的数据，然后插入到lotterOB种
    return request2.post('yewu11/v1/w/structureMatchBaseInfoByMidsPB',params);
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
  // insert_score(params){
  //   return request.post('lotterBMsix/updateScore',params).then((data)=>{
  //     console.info(data)
  //   })
  // }
  
}

const odds = new Odds()
export default odds