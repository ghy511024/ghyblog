/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function test(arr,func){
    //    console.log(func.length)
    console.log(   Object.prototype.toString.call(func));
    if(func.length){
        //        console.log(func.toString())
        func.toString();
    }
}

test([12,2],function(item){
    //    console.log("test")
    })

function isArray(it) {
    return Object.prototype.toString.call(it) === '[object Array]';
}

/**
 *console.log(strToarry("['bb,bb','sdf']"));
*console.log(strToarry("[cc,bb,vvv]"));
*console.log(strToarry("[\"mm\",\"mmm\"]"));
*console.log(strToarry('"["tttt","ttt"]"'));
 *
 **/
function strToarry(str){
    var reg1=/^"|^'|'$|"$/g//去掉前面的引号
    var reg2=/^\[|]$/g//去掉前面的括号
    var reg3=/('\s*,\s*')/gi
    var reg4=/("\s*,\s*")/gi
    var reg5=/'|"/gi
    var tmp;
    if(reg3.test(str)){
        tmp=str.replace(reg1,"").replace(reg2,"").replace(reg3,"'&_#'").replace(reg5,"").split("&_#");
        if(isArray(tmp)){
            return tmp;
        }
    }
    if(reg4.test(str)){
        tmp=str.replace(reg1,"").replace(reg2,"").replace(reg4,"'&_#'").replace(reg5,"").split("&_#");
        if(isArray(tmp)){
            return tmp;
        }
    }
    else{
        tmp=str.replace(reg1,"").replace(reg2,"").replace(reg5,"").split(",");
        if(isArray(tmp)){
            return tmp;
        }
    }
    return str;
}

//console.log(Conf.data);
//
//console.log(strToarry("['bb,bb','sdf']"));
//console.log(strToarry("[cc,bb,vvv]"));
//console.log(strToarry("[\"mm\",\"mmm\"]"));
//console.log(strToarry('"["tttt","ttt"]"'));

function sortMap(map,sort){
    var list=[];
    var ret={};
    for(var key in map){
        var  tmp={
            key:key,
            value:map[key]
        }
        list.push(tmp);
    }
    list.sort(function(a,b){
        if(sort<0){
            return   a.value-b.value;
        }
        else{
            return   b.value-a.value;
        }
    })
   
    for(var i in list){
        ret[list[i]["key"]]=list[i]["value"]
    }
    return ret;
}
var maps={
    "ghy":1,
    "ttt":3,
    "sdfsdf":2
}
console.log(JSON.stringify(sortMap(maps)));