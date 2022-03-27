
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


  var clickbtn;
  var ok;
  var rgbled;
  var button;
  var _E8_AE_8A_E6_95_B8;
  
  var smartID = document.getElementById("device");



  boardReady({board: 'Smart', device: smartID, transport: 'mqtt'}, async function (board) {
    board.samplingInterval = 50;
    rgbled = getRGBLedCathode(board, 15, 12, 13);
    button = getPullupButton(board, 4);
    clickbtn = true;
    ok = false;
    rgbled.setColor('#000000');
    _E8_AE_8A_E6_95_B8 = String(_E8_AE_8A_E6_95_B8) + String('正常');
    window.alert('按下 確認 或 Enter 以繼續');
    button.on('pressed', async function () {
      speakSynth.cancel();
      speak('ㄏㄟˋ！我是 siri 有什麼能為你服務', ["zh-TW",1,1,1]);
      if (clickbtn == true) {
        rgbled.setColor('#ff0000');
      }
    });
    button.on('longPress', async function () {
      rgbled.setColor('#ffff33' , async function () {
          if (clickbtn == false) {
        }
        ok = true;
        while (ok == true) {
          await delay(1);
          rgbled.setColor('#cc0000');
          await delay(1);
          rgbled.setColor('#ffff99');
        }
  
      });
      async function speechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
          alert('本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)');
        } else {
          window._recognition = new webkitSpeechRecognition();
          window._recognition.continuous = true;
          window._recognition.interimResults = true;
          window._recognition.lang = 'cmn-Hant-TW';
  
          window._recognition.onstart = async function() {
            window._recognition.status = true;
          };
  
          window._recognition.onend = async function() {
            if (window._recognition.status) {
               window._recognition.start();
            }
          };
  
          window._recognition.onresult = async function (event,result) {
            result = {};
            result.resultLength = event.results.length - 1;
            result.resultTranscript = event.results[result.resultLength][0].transcript;
            if (event.results[result.resultLength].isFinal === false) {
              if (result.resultTranscript.indexOf('開始') !== -1) {
          speakSynth.cancel();
          speak('我要一直偵測閱讀', ["zh-TW",1,1,2]);
          await delay(0.2);
          rgbled.setColor('#3333ff');
        }
            } else if (event.results[result.resultLength].isFinal === true) {
              console.log('final');
            }
          };
          window._recognition.start();
        }
      }
      speechRecognition();
    });
    button.on('released', async function () {
      rgbled.setColor('#000000');
      ok = false;
      rgbled.setColor('#000000' , async function () {
  
      });
    });
    board.on('error', async function (err) {
      board.error = err;
      window.alert('請重新連線');
      _E8_AE_8A_E6_95_B8 = String(_E8_AE_8A_E6_95_B8) + String('失敗。');
    });
  });
  
  ok = false;
  
  // window._recognition.status = false;
  // window._recognition.stop();
  
  speakSynth.resume();
  


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
    time = ['現在時間為 ',h,'  點 ',m,' 分 ',s,' 秒 '].join('');
    // 獲得時間並顯示在網頁上 另可用在朗讀參數
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
    varNow = varHours + "  點 " + varMinutes + "  分  " + varSeconds + "  秒  ";
    // 避免數字為個位數時略字錯誤
    // get_time(hms)

  } else if (t == "h") {
    varNow = varHours;
  } else if (t == "m") {
    varNow = varMinutes;
  } else if (t == "s") {
    varNow = varSeconds;
  }
  return varNow;
}

show(); 


}());



// 網頁按鈕點擊朗讀語法

document.getElementById('speaktime').addEventListener('click',function () {
  speakSynth.cancel();
  console.log('clickstart');
  speak(time,["zh-TW",1,1,0.7], function () {
    document.getElementById('btn3').addEventListener('click',function () {
      speakSynth.pause();
      console.log('click start00');
    });
    document.getElementById('btn4').addEventListener('click',function () {
      speakSynth.resume();
      console.log('click start11');
    });
    document.getElementById('btn5').addEventListener('click',function () {
      speakSynth.cancel();
      console.log('click start22');
    });

  },1);
});

// 內建語音控制器

const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); 
//   stop()
// });

window.onload=function(){ 

 } 


synth.addEventListener('voiceschanged', setVoiceSelection);
utter.addEventListener('end', setButtonToStop);


const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const volume = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');
const voiceSelection = document.querySelector('#voice-selection');


const speakbtn = document.querySelector('#speakbtn');


let voices = [];


speakbtn.addEventListener('click', Speaks);


function Speaks() {

  utter.text = document.querySelector('#text-input').value;
  synth.speak(utter);
  setButtonToStop();

}

function stop() {
  speakSynth.cancel();
  setButtonToRead();
}

function setButtonToStop() {      
  speakbtn.textContent = '停止朗讀';
  speakbtn.removeEventListener('click', Speaks);
  speakbtn.addEventListener('click', stop);
}

function setButtonToRead() {      
  speakbtn.textContent = '開始朗讀';
  speakbtn.removeEventListener('click', stop);
  speakbtn.addEventListener('click', Speaks);
}
function setVoiceSelection() {
  voices = synth.getVoices();
  for (i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = voices[i].name;
    
    voiceSelection.appendChild(option);
    if (i = 66) {
      
      option.textContent = voices[i].name;
    
      voiceSelection.appendChild(option);



      
    }
    
  }
}
// function change(num){
//   document.getElementById("voice-election")[num].selected=true;
//   }
function setUtterVoice() {
  for(let i = 0; i < voices.length; i++) {        
    if (voiceSelection.value === voices[i].name) {
      utter.voice = voices[i];
      return null;
    }
  }
}



function setUtterRate() {
  rateValue.textContent = rate.value;
  console.log(rateValue)
  utter.rate = rate.value
}

function setUtterPitch() {
  pitchValue.textContent = pitch.value;
  utter.pitch = pitch.value
}

function setUtterVolume() {
  volumeValue.textContent = volume.value;
  utter.volume = volume.value
}

// 實體按鈕點擊朗讀語法

(async function () {

  var clickbtn;
  var ok;
  var rgbled;
  var button;
  var check = document.getElementById("check");
  
  var smartID = document.getElementById("device").value;

  
  boardReady({board: 'Smart', device: smartID, transport: 'mqtt'}, async function (board) {
    board.samplingInterval = 50;
    rgbled = getRGBLedCathode(board, 15, 12, 13);
    button = getPullupButton(board, 4);
    clickbtn = true;
    ok = false;
    rgbled.setColor('#000000');
    check.innerText += String(':正常');
    button.on('pressed', async function () {
      speakSynth.cancel();
      speak('ㄏㄟˋ！我是 siri 有什麼能為你服務', ["zh-TW",1,1,1]);
      if (clickbtn == true) {
        rgbled.setColor('#ff0000');
      }
    });
    button.on('longPress', async function () {
      rgbled.setColor('#ffff33' , async function () {
          if (clickbtn == false) {
        }
        ok = true;
        while (ok == true) {
          await delay(1);
          rgbled.setColor('#cc0000');
          await delay(1);
          rgbled.setColor('#ffff99');
        }
  
      });
      async function speechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
          alert('本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)');
        } else {
          window._recognition = new webkitSpeechRecognition();
          window._recognition.continuous = true;
          window._recognition.interimResults = true;
          window._recognition.lang = 'cmn-Hant-TW';
  
          window._recognition.onstart = async function() {
            window._recognition.status = true;
          };
  
          window._recognition.onend = async function() {
            if (window._recognition.status) {
               window._recognition.start();
            }
          };
  
          window._recognition.onresult = async function (event,result) {
            result = {};
            result.resultLength = event.results.length - 1;
            result.resultTranscript = event.results[result.resultLength][0].transcript;
            if (event.results[result.resultLength].isFinal === false) {
              if (result.resultTranscript.indexOf('開始') !== -1) {
          
          await delay(0.7);
          speakSynth.cancel();
          speak((webduinoTime.innerHTML),["zh-TW",1,1,0.7], function () {
            document.getElementById('btn3').addEventListener('click',function () {
              speakSynth.pause();
              console.log('click start00');
            });
            document.getElementById('btn4').addEventListener('click',function () {
              speakSynth.resume();
              console.log('click start11');
            });
            document.getElementById('btn5').addEventListener('click',function () {
              speakSynth.cancel();
              console.log('click start22');
            });
        
          },1);
          rgbled.setColor('#3333ff');
        }
            } else if (event.results[result.resultLength].isFinal === true) {
              console.log('final');
            }
          };
          window._recognition.start();
        }
      }
      speechRecognition();
    });
    button.on('released', async function () {
      rgbled.setColor('#000000');
      ok = false;
      rgbled.setColor('#000000' , async function () {
  
      });
    });
    board.on('error', async function (err) {
      board.error = err;
      window.alert('請重新連線');
      check.innerText += String(':異常');
    });
  });
  
  ok = false;
  
  // window._recognition.status = false;
  // window._recognition.stop();
  
  speakSynth.resume();
  
  }());