/*global $*/
var counter = document.getElementById("counterId");
var startButton = document.getElementById("startId");
var stopButton = document.getElementById("stopId");
var resetButton = document.getElementById("resetId");

var startTime;
var stopTime = 0;
var timeoutId;

let h = 0;
let m = 0;
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
  h = 0;
  m = 0;
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
  h = String(t.getUTCHours()).padStart(1, 0);
  m = String(t.getMinutes()).padStart(1,0);
  s = String(t.getSeconds()).padStart(1,0);
  ms = String(t.getMilliseconds()).slice(-3,-2);
  if(ms == 0){
    counter.textContent = `${h}:${m}:${s}:0`;
  } else {
    counter.textContent = `${h}:${m}:${s}:${ms}`;
  }
  timeoutId = setTimeout(displayTime, 10);
};