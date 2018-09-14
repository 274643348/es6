
/**
 * Promise对象代表一个异步操作
 * pending（进行中）、fulfilled（已成功）和rejected（已失败）
 * 
 * 
 * 状态变化只有两种:1:pending-》fulfilled; 2:pending->rejected;
 * 状态一旦变化就永远凝固,resolved(已定型))
 * 
 * 如果改变已经发生,你在对promise对象添加回调函数也会立即得到这个结果;这与Event完全不同,event如果错过了再去监听,是得不到的;
 * 
 * 为了方便resolved统一指fulfilled;
 * 
 * 这样就可以将异步操作以流程表达出来,避免层层嵌套的毁掉函数;
 * 
 * 
 * -------------------缺点-----------------
 * 1:无法取消promise,一旦新建他会立即执行,无法中途取消;
 * 2:如果没有回调函数,promise内部抛出的错误,不会反应到外部;
 * 3:pending状态,无法知道是处于哪个阶段(刚刚开始,还是即将结束);
 * 
 */

// const promise = new Promise(function (resolve, reject) {
//     console.log("2222");
//     if (true) {
//         resolve("success");
//         console.log("3333");
//     } else {
//         reject(error);
//     }
// });

// console.log("1111");

// promise.then(function(value){
//     console.log("then resolve   " + value);
// },function(error){
//     console.log("then reject   " + error);
// });

/**
2222
3333
1111
then resolve   success
 */



// const promise = new Promise(function (resolve, reject) {
//     console.log("2222");
//     if (true) {
//         resolve("success");
//         console.log("3333");
//     } else {
//         reject(error);
//     }
// });

// promise.then(function(value){
//     console.log("then resolve   " + value);
// },function(error){
//     console.log("then reject   " + error);
// });
// console.log("1111");

/**
2222
3333
1111
then resolve   success
 */


//****************************then 来指定resolved和rejected的回调函数****************************//


//  const promise = new Promise(function(resolve,reject){
//     setTimeout(resolve,1000,"done");     
//  })

//  console.log("then -----  start");

//  promise.then((value)=>{
//     console.log(value);
//  });
//  console.log("then -----  end");

// then -----  start
// then -----  end
// done



//****************************Promise 新建后立即执行,then指定的回调函数,只有当前脚本所在的同步人物执行完才会执行****************************//


// let promise = new Promise(function(resolve, reject) {
//     console.log('Promise');
//     resolve();
//   });
  
//   promise.then(function() {
//     console.log('resolved.');
//   });
  
//   console.log('Hi!');

// Promise
// Hi!
// resolved.
//上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。




//****************************一个异步操作的结果是返回另一个异步操作****************************//
// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject("aa"), 3000);
//   })
  
//   const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)
//   })
  
//   p2.then(function(value){
//       console.log("then     resole")
//       console.log(value );
//   }).catch(function(err){
//       console.log(err + "    err");
//   })

//aa    err


//****************************调用resolve或reject并不会终结 Promise 的参数函数的执行****************************//
//   new Promise((resolve, reject) => {
//     resolve(1);
//     console.log(2);
//   }).then(r => {
//     console.log(r);
//   });

//2
//1

  //一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外

// new Promise((resolve, reject) => {
//     return resolve(1);
//     // 后面的语句不会执行
//     console.log(2);
// }).then(r => {
//     console.log(r);
// });

//1

  //调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务!!!!!!!!!!!!!!


