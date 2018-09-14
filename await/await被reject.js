async function funcA(){
    console.log("11111 ");
    return new Promise((resolve,reject)=>{
    console.log("11111 promise");
     // reject("11111");
     resolve("11111");
   });
 
 };
 
 async function funcB ()
 {
   console.log("22222 ");
   return new Promise((resolve,reject)=>{
    console.log("22222 promise");
     // reject("22222");
     resolve("22222");
   });
 }
 
 async function aaaa()
 {
   console.log("11111 ");
   await funcA();
   console.log("22222 ");
   await funcB();
   console.log("33333 ");
 }
 
 console.log("00000 ");
 aaaa();
 console.log("44444 ");