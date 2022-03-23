// 關於更多 JS 基本功能可看鐵人賽文章：https://ithelp.ithome.com.tw/users/20120114/ironman/2307?page=1
// <!-- /* please use Big-5 code open cuz school server can not use with UTF-8 */ -->
var webduinoTime = document.querySelector(".webduinoTime");

console.log(webduinoTime);

setInterval("getDate()",1000);

function changeColor(newColor) {
    var elem = document.getElementById("updateTime");
    elem.style.color = newColor;
  }

function changeInnerHtml() {

  var elem = document.getElementById("webduinoTime");
  var click = document.getElementById("catchtime");
  click.innerHTML = elem.innerHTML;
}

function getDate(){
                var date = new Date();
                var date1 = date.toLocaleString();
                var div1 = document.getElementById("updateTime");
                div1.innerHTML = date1;
            }
 function copyEvent(id)
    {
        var str = document.getElementById(id);
        window.getSelection().selectAllChildren(str);
        document.execCommand("Copy")
    }
// webduino.js 的部分
// async function a(){}
// a();

(async function () {

var h;
var m;
var s;
var time;

function get_time(t) {
  var varTime = new Date(),
    varHours = varTime.getHours(),
    varMinutes = varTime.getMinutes(),
    varSeconds = varTime.getSeconds();
  var varNow;
  if (t == "hms") {
    varNow = varHours + "點" + varMinutes + "分" + varSeconds + "秒";
  } else if (t == "h") {
    varNow = varHours;
  } else if (t == "m") {
    varNow = varMinutes;
  } else if (t == "s") {
    varNow = varSeconds;
  }
  return varNow;
}

async function show() {
  h = get_time("h");
  m = get_time("m");
  s = get_time("s");
  if (m < 10) {
    m = String(0) + String(m);
  }
  if (s < 10) {
    s = String(0) + String(s);
  }
  time = ['現在的時間為：',h,'點',m,'分',s,'秒'].join('');
  webduinoTime.innerHTML = time;
  await delay(1);
  show();
}


show();
  
document.getElementById('speaktime').addEventListener('click',function () {
  speak(('現在的時間為'+get_time("hms")),["zh-TW",1,1,0.7], function () {
    document.getElementById('btn3').addEventListener('click',function () {
      speakSynth.pause();
    });
    document.getElementById('btn4').addEventListener('click',function () {
      speakSynth.resume();
    });
    document.getElementById('btn5').addEventListener('click',function () {
      speakSynth.cancel();
    });

  },1);
}); 

}());