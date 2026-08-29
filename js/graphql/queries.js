
export const QUERY =`
query{
  user{
    firstName
    lastName
    login
    img:avatarUrl
    email
    gender:attrs(path:"gender")
    auditRatio
    totalUp
    totalDown
    totalUpBonus
    
    XP: transactions_aggregate(
      where:{
        eventId:{_eq:41}, 
        type:{_eq:"xp"}
      }
    ){
      
      aggregate{
        sum{
          amount
        }
      }
    }
    
    level: transactions(
      where:{
        type:{_eq:"level"}, 
        eventId:{_eq:41}
      } 
      limit:1 
      order_by:[
        {createdAt: desc},{amount:desc}
      ]
    ){
      amount
    }
    
    skills: transactions(
      distinct_on:type 
      where:{
        type:{_ilike:"skill_%"}, 
        eventId:{_eq:41}
      } 
      order_by:[{type:asc},{amount:desc}]
    ){
      amount
      createdAt
      type
    }
    
    XP_per_project: transactions(
      distinct_on:path 
      where:{
        amount:{_gt:0}
        type:{_eq:"xp"}, 
        eventId:{_eq:41},
        object:{type:{_eq:"project"}}
      } 
    ){
      amount
      createdAt
      object{
        name
        parents{
          mandatory:attrs(path:"mandatory")
        }
      }
    }
    
  }
}
`