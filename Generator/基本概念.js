/**
 * 
 * Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个“状态机”，封装了多个“内部状态”
 * 
 * 执行 Generator 函数会返回一个遍历器对象，
 * 也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
 * 返回的“遍历器对象”，可以依次“遍历” Generator 函数内部的每一个状态
 * 
 * 形式上，Generator 函数是一个普通函数，但是有两个特征。
 * 一是，function关键字与函数名之间有一个星号；
 * 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）
 */

 function * helloworldGenerator()
 {
     console.log("1111");
     yield "状态1";
     console.log("2222");
     console.log("2222");
     yield "状态2";
     console.log("3333");
     console.log("3333");
     return "ending";
 }

 //内部有两个yield,即该函数有三个状态:状态1,状态2和return 语句(结束执行);


 let generator = helloworldGenerator();

 //上方函数,没有输出log,因为Generator调用后,该函数并不执行,返回的也不是运行结果,而是一个指向内部状态的指针对象,也就是遍历器对象(iterator object);

 let value = generator.next();
 console.log("------------"+value.value +"--------" + value.done);

// 1111
// ------------状态1--------false
 //调用遍历对象的next方法,使得指针移向下一个状态;
 //每次调用next方法，内部指针就从“函数头部”或“上一次”停下来的地方开始执行，直到遇到下一个“yield表达式”（或return语句）为止

 value = generator.next();
 console.log("------------"+value.value +"--------" + value.done);

// 1111
// ------------状态1--------false
// 2222
// 2222
// ------------状态2--------false

value = generator.next();
console.log("------------"+value.value +"--------" + value.done);

// 1111
// ------------状态1--------false
// 2222
// 2222
// ------------状态2--------false
// 3333
// 3333
// ------------ending--------true

value = generator.next();
console.log("------------"+value.value +"--------" + value.done);

// 1111
// ------------状态1--------false
// 2222
// 2222
// ------------状态2--------false
// 3333
// 3333
// ------------ending--------true
// ------------undefined--------true

//总结一下,调用Generator函数,返回一个遍历器对象,代表Generator函数的内部指针.
//以后,每次调用遍历器对象的next方法,就回返回一个有着value和done两个属性的对象.
//value属性代表当前的内部状态的值,是yield表达式后边那个表达式的值;
//done属性是一个布尔值,表示是否遍历结束;


function * foo(x, y) {  };
function *foo(x, y) {  };
function* foo(x, y) {  };
function*foo(x, y) {  };
//一般采用第三种,星星紧跟function;

