/*global $*/
var counter = document.getElementById("counterId");
var startButton = document.getElementById("startId");
var stopButton = document.getElementById("stopId");
var resetButton = document.getElementById("resetId");

var startTime;
var stopTime = 0;
var timeoutId;

let m = 0;
let ten = 0;
let s = 0;
let ms = 0;

//ボタンの初期状態設定
if(startButton.disabled == false && stopButton.disabled == false && resetButton.disabled == false){
  stopButton.disabled = true;
  resetButton.disabled = true;
}

//スタートボタン押下時
function start(){
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  startTime = Date.now();
  displayTime();
}

//ストップボタン押下時
function stop(){
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutId);
  stopTime += (Date.now() - startTime);
}

//リセットボタン押下時
function reset(){
  stop();
  counter.textContent = '0:0:0:0';
  m = 0;
  ten = 0;
  s = 0;
  ms = 0;
  stopTime = 0;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
}

//スタート押下時に呼び出される
function displayTime(){
  var t = new Date(Date.now() - startTime + stopTime);
  m = String(t.getMinutes()).padStart(1, '0');
  ten = String(t.getSeconds());
  s = String(t.getSeconds()).slice(-1);
  ms = String(t.getMilliseconds()).slice(0, 1);
  //1秒と10秒単位の切り離し
  if(ten < 10){
    counter.textContent = `${m}:0:${s}:${ms}`;
  }
  else{
    counter.textContent = `${m}:${ten.slice(0,1)}:${s}:${ms}`;
  }
  timeoutId = setTimeout(displayTime, 10);
};