async function funcA(){
    console.log("11111 A");
    return new Promise((resolve,reject)=>{
    console.log("11111 A promise");
     //reject("11111");
     setTimeout(resolve,"11111 A",1000);
   });
 
 };
 
 async function funcB ()
 {
   console.log("22222 B");
   return new Promise((resolve,reject)=>{
    console.log("22222 B promise");
     // reject("22222");
     resolve("22222 B");
   });
 }
 
let rejectL;

async function aaaa() {

  return new Promise(async(resolve, reject) => {
    rejectL = reject;
    console.log("11111 ");
    await funcA();
    console.log("22222 ");
    await funcB();
    console.log("33333 ");

    resolve()
  });
}
 
 async function bbbb()
 {
    let aaaaP = await aaaa().then((value)=>{
      console.log("aaa ---  then  ---" + value);

    },(err)=>{
      console.log("aaa ---  then  ---" + err);
    });
 }
 
 async function cccc()
 {
  console.log("ccccc");
    rejectL();
 }
 

 console.log("00000 ");
 bbbb();
 cccc();
 console.log("44444 ");