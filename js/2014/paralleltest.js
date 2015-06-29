$(document).ready(function(){
    var p = new Parallel([1, 2, 3, 4, 5]);
    console.log(p.data); // prints [1, 2, 3, 4, 5]
    console.log(p.isSupported); // prints [1, 2, 3, 4, 5]
    
    var p2 = new Parallel('forwards'.split());
    p2.spawn(function(data){
        data=data.reverse();
//        console.log(data);
        return data;
    }).then(function(data){
        console.log(data)
    })
    
    //
     var p3 = new Parallel([0, 1, 2, 3, 4, 5, 6]),
      log = function () { console.log.apply(console,arguments); };
  // One gotcha: anonymous functions cannot be serialzed
  // If you want to do recursion, make sure the function
  // is named appropriately
  function fib(n) {
    return 2*n;
  };
  p3.map(fib).then(log)
  
  
   console.time("test1");
  var p4=new Parallel(1);
  var count=function(n){
      var i=0;
      while(i++<n*100){}
      return i
  }
console.log("end1");
  p4.spawn(count).then(function(){
      console.timeEnd("test1");
  })
   var count2=function(n){
      var i=0;
      while(i++<n*100000){}
      return i
  }
   console.time("test2");
   console.log("end2...")
    count2(10000);
  console.log("end3...")
    console.timeEnd("test2");
})
