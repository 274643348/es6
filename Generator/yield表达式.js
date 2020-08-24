/**
 * 由于 Generator 函数返回的遍历器对象，
 * 只有调用next方法才会遍历下一个内部状态，
 * 所以其实提供了一种可以暂停执行的函数。
 * yield表达式就是暂停标志。

 * 
 */


// （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

// （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。



//懒惰语法
//yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
//因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

// function* add(){
//     yield 123+456;
// }
// let addIterator = add();
// let value = addIterator.next().value;
// console.log(value);

//上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。


//不用yield表达式,就变成一个单纯的暂缓执行函数
// function* f()
// {
//     console.log("running ");
// }
// let delayCall = f();
// setTimeout(()=>{
//     delayCall.next();
// },2000)


//注意!!!!!!!!!
//1:yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

// (function(){
//     yield 1;
// })();


//2:forEach方法的参数也是一个普通的函数,所以内部不能用yield表达式;
// let a = [1,[[2,3],4],[5,6]];
// let showAry = function* (arr){
//     arr.array.forEach(element => {
//         if (typeof element !== "number") {
//             yield showAry(element);
//         }else
//         {
//             yield element;
//         }
//     });
// };

// for (const iterator of showAry(a)) {
//     console.log(iterator);
// }


// let a = [1,[[2,3],4],[5,6]];
// let showAry = function* (arr){
//     for (const iterator of arr) {
//         if (typeof iterator !== "number") {
//             yield* showAry(iterator);
//         }else{
//             yield iterator;
//         }
//     }
// };

// //通过遍历迭代器
// for (const iterator of showAry(a)) {
//     console.log(iterator);
// }

// console.log("--------------------------------");
// let gneerator1 = showAry(a);
// while(true)
// {
//     let value = gneerator1.next();
//     console.log(value);
//     if (value.done) {
//         break;
//     }

// }
// console.log("--------------------------------");

// let gneerator = showAry(a);
// console.log(gneerator.next());
// console.log(gneerator.next());
// console.log(gneerator.next());
// console.log(gneerator.next());
// console.log(gneerator.next());
// console.log(gneerator.next());
// console.log(gneerator.next());



//3:yield表达式如果在另一个表达式之中,必须放在圆括号里边;
//  function* demo(){
//     //  console.log("Hello" + yield);
//     //  console.log("Hello" + yield 123);
//      console.log("Hello" + (yield));
//      console.log("Hello" + (yield 123));
//  }

//  let aa = demo();
//  console.log( aa.next());
//  console.log( aa.next());
//  console.log( aa.next());

//  { value: undefined, done: false }
//  Helloundefined
//  { value: 123, done: false }
//  Helloundefined
//  { value: undefined, done: true }

//4: yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
// function foo(a,b)
// {
//     console.log("" +a + b);
// }
// function* demo() {
//     foo(yield 'a', yield 'b'); // OK
//     let input = yield; // OK
//   }
//   let aaa = demo();
//  console.log( aaa.next());
//  console.log( aaa.next());
//  console.log( aaa.next());