﻿
// <!-- /* with UTF-8 bom */ -->

var webduinoTime = document.querySelector(".webduinoTime");
var speaks = document.getElementById("speak");

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
        document.execCommand("Copy");
    }
// 接下來是 webduino.js 函式庫
// async 同步語法 做完前面才會接續執行後面

var h;
var m;
var s;
var time;

(async function () {



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
    time = ['現在時間為 ',h,' 點',m,' 分',s,' 秒'].join('');
    webduinoTime.innerHTML = time;
    

    await delay(0.3);
    // 縮短時間，確保與 webduinoTime 文字無誤差
    show();
  }

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
// time
// get_time("hms")
show(); 

}());

// 按鈕點擊朗讀語法

document.getElementById('speaktime').addEventListener('click',function () {
  speakSynth.cancel();
  speak(time,["zh-TW",1,1,0.7], function () {
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




