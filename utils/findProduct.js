 export const findProduct=(cartArr,prodId)=>{
    const isFind=cartArr && cartArr.length>0 && cartArr.some(({_id})=> _id===prodId)
    return isFind;
  }
