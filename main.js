//Simple loop within an array with for or while
const fruits = ["Mango", "Grapes", "Strawberries"]
fruits.forEach(function(item, index){
    console.log(item,index);
})

//filter instead of break
//array.filter(item => item.condition <10) before forEach

//we get task1.data file
//forEach element from it we look for the patterns distinguished in the task1.seq file