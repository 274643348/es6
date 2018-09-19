/**
 * Promise 实例具有then方法
 * 
 * 它的作用是为 Promise 实例添加状态改变时的回调函数。
 * 前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数
 * 
 */

// let  promise = new Promise(function(resolve,reject){
//     setTimeout((data)=>{
//         console.log(data);
//         resolve("bbb");
//     }, 1000,"aaaaa");
// })

// promise.then((value)=>{
//     console.log(value);
// });


//****************************then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）****************************//
//****************************因此可以采用链式写法，即then方法后面再调用另一个then方法。****************************//
//****************************第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。****************************//

// let promise = new Promise((resolve,reject)=>{
//     setTimeout(resolve,1000,'11');
// });

// let promise2 = promise.then((value)=>{
//     console.log(value);
//     return "22";
// });

// promise2.then((value)=>{
//     console.log(value);
// });



/**
 * 前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），
 * 这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
 * 
 */

// let promise = new Promise((resolve,reject)=>{
//     setTimeout(resolve,1000,"111");
// });
// promise.then(function(value){
//     console.log(value);
//     return new Promise(function(resolve,reject){
//         console.log("return start");
//         setTimeout(resolve,1000,"222");
//         console.log("return end");
//     });
// }).then(function(value){
//     console.log("then 2 start");
//     console.log(value);
//     console.log("then 2 end");
// });

// 111
// return start
// return end
// then 2 start
// 222
// then 2 end

