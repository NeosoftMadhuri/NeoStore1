export const Enable=()=>
{
    return{
        type:'enable',
       
    }
}
export const CART=(num)=>
{
    return{
        type:'cart',
        payload:num
    }
}
export const DISABLE = (num) => {
   return{
       type: "disable",
       payload:num
   }
}
export const SERACH = (val) => {
    return{
        type: "search",
        payload:val
    }
 }