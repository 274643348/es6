/**
 * promise.prototype.catch方法是.then(null,rejection)的别名,用于指定发生错误时的回调函数;
 */

//  let promise = new Promise(function(resolve,reject){
//      setTimeout(reject,1000,"err  catch");
//  });

//  let promise2 = promise.then(function(value){

//  });

//  promise2.catch(function(err){
//      console.log(err);
//  });

//****************************可以发现reject方法的作用，等同于抛出错误****************************//

//  let promise = new Promise(function(resolve,reject){
//      throw "throw err";
//  });

//  promise.catch(function(err){
//      console.log(err);
//  });

// let promise = new Promise(function(resolve,reject){
//     try {
//         throw "throw err";
//     } catch (error) {
//         setTimeout(reject,1000,error);
//     }
// });

// promise.catch(function(err){
//     console.log(err);
// });

/**
 * Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。
 * 因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了
 */

// let promise = new Promise(function(resolve,reject){
//     throw "err data"
//     resolve("resolve");
//     // setTimeout(resolve,2000,"resolve");
//     // setTimeout((value)=>{ reject(value);},1000,"err data");
// });

// promise.then(function(value){
//     console.log(value);
// });//警告,没有对异常做处理
// promise.then(function(value){
//     console.log(value);
// },()=>{});
// promise.then(function(value){
//     console.log(value);
// }).catch(function(){});

// promise.catch(function(err){
//     console.log(err);
// })

/***************
 * 建议总是使用catch方法，而不使用then方法的第二个参数
 * 理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）
 *
 */

// let promise = new Promise(function(resolve,reject){
//     reject("err data");
// });

// promise.then(function (value) {
//     console.log(value);
// }, function (err) {
//     console.log("then1  " + err);
// }).catch(
//     function (err) {
//         console.log("catch1  " +err);
//     });

// //then中没有对reject处理,所有then返回promise还是reject;
// promise.then(function (value) {}).catch(
//     function (err) {
//         console.log("catch2  " +err);
//     });

/**************
 * 在then中返回时抛出异常;
 */

// new Promise(function(resolve,reject){
//         resolve("resolve");
//     }).then(function(value){
//         console.log(value);
//         throw "err data";
//     }).catch(function(err){
//         console.log(err);
//     });

// new Promise(function(resolve,reject){
//         resolve("resolve");
//     }).then(function(value){
//         console.log(value);
//         return new Promise((resolve,reject)=>{reject("err data")});
//     }).catch(function(err){
//         console.log(err);
//     });

/**
 * 内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，
 * 但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。
 * 这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
 */
// let promise = new Promise(function(resolve, reject) {
//   console.log("0000");
//   console.log(x + 2);
//   console.log("1111");
//   reject("err data");
// });

// promise.catch(err => {
//   console.log(err);
// });
// console.log("2222");
// setTimeout(() => {
//   console.log("time out 1s");
// }, 1000);

// 0000
// 2222
// ReferenceError: x is not defined
// time out 1s

/**
 * 捕获异常******************
 */
// let promise = new Promise(function(resolve, reject) {
//   try {
//     console.log("0000");
//     console.log(x + 2);
//     console.log("1111");
//   } catch (error) {
//     reject("err data");
//   }
// });

// promise.catch(err => {
//   console.log(err);
// });
// console.log("2222");
// setTimeout(() => {
//   console.log("time out 1s");
// }, 1000);


/*************
 * 不过，Node 有一个unhandledRejection事件，专门监听未捕获的reject错误，
 * 上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误
 * 
 * 
 * unhandledRejection事件的监听函数有两个参数，
 * 第一个是错误对象，
 * 第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。
 * 
 * 注意，Node 有计划在未来废除unhandledRejection事件。
 * 如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。
 * 
 */

// let promise = new Promise(function(resolve,reject){
//     let a = b+2;
//     resolve("success ");
// });
// promise.catch((err)=>{console.log(err)});
// promise.then((value)=>{console.log(value)},(err)=>{});

// process.on("unhandledRejection",function(err,p){
//     console.log(err);
// });


/**
 * 
 * Promise 指定在下一轮“事件循环”再抛出错误。
 * 到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，
 * 会冒泡到最外层，成了未捕获的错误;
 * 
 * Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误
 * 。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
 * 
 */


// let promise = new Promise(function(resolve,reject){
//     let x= a+1;
//     resolve(x+2);
// });
// promise.catch(function(err){
//     console.log("err start");
//     console.log(err);
//     console.log("err end");
// }).then(function(){
//     console.log("carry on");
// });

// err start
// ReferenceError: a is not defined
// err end
// carry on

/***********************************************
 * catch方法之中，还能再抛出错误。
 * 
 */

 let promise = new Promise(function(resolve,reject){
     throw "err 1";
 });

 promise.catch(function(err){
     console.log(err);
     throw "err 2"
 }).catch(function(err){
     console.log(err);

 });

