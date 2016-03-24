var Benchmark = require("../../../node_modules/benchmark");

var suite = new Benchmark.Suite;

function leftpad_azer (str, len, ch) {
  str = String(str);

  var i = -1;

  if (!ch && ch !== 0) ch = " ";

  len = len - str.length;

  while (++i < len) {
    str = ch + str;
  }

  return str;
}

function leftpad_array1 (str, len, ch){
  str = "" + str;
  var padlen = len - str.length;
  if(padlen <= 0){ 
    return str;
  }else{
    return (new Array(padlen + 1)).join((""+ch) || " ") + str;
  }
}

function leftpad_array2 (str,len,ch) {
  return ((new Array(len)).join((ch+"")||" ") + str)
    .slice(-Math.max(len, (""+str).length));
}

function leftpad_repeat(str, len, ch){
  str = "" + str;
  ch = ("" + ch) || " ";
  var padlen = len - str.length;
  if(padlen <= 0){ 
    return str;
  }else{
    return ch.repeat(padlen) + str;
  }
}

function leftpad_binary(str, len, ch){
  str = "" + str;
  if(!ch && ch !== 0) ch = " ";

  var padlen = len - str.length;
  if(padlen <= 0) return str;

  var padch = padlen & 1 ? ch : "";

  while(padlen >>= 1){
  ch += ch;
    if(padlen & 1){
      padch += ch;
    }
  }
  return padch + str;
}

// add tests
suite.add("leftpad#azer", function() {
  leftpad_azer("10",1000,"0")
})
.add("leftpad#array1", function() {
  leftpad_array1("10",1000,"0")
})
.add("leftpad#array2", function() {
  leftpad_array2("10",1000,"0")
})
.add("leftpad#repeat", function() {
  leftpad_repeat("10",1000,"0")
})
.add("leftpad#binary", function() {
  leftpad_binary("10",1000,"0")
})
// add listeners
.on("cycle", function(event) {
  console.log(String(event.target));
})
.on("complete", function() {
  console.log("Fastest is " + this.filter("fastest").map("name"));
})
// run async
.run({ "async": true });