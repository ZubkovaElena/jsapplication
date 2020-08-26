  export class TransformService {
      static fbObjectToArray(fbData){
       return Object.keys(fbData).map(key =>{
          const item = fbData[key]        //получаем каждый из объектов
           item.id =key
            return item
        })
      }
  }