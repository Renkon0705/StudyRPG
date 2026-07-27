// =================
// Study RPG XP System
// =================


// レベル

let level =
Number(localStorage.getItem("level")) || 1;


// 現在XP

let currentXP =
Number(localStorage.getItem("currentXP")) || 0;


// 次レベル必要XP

let nextXP =
Number(localStorage.getItem("nextXP")) || 100;



// =================
// XP追加
// =================

function addXP(amount){


currentXP += amount;



while(currentXP >= nextXP){


    currentXP -= nextXP;


    level++;


    nextXP =
    Math.floor(nextXP * 1.2);


}



// 保存

saveLevelData();


// 表示更新

updateStatus();



// レベルアップ演出

if(typeof showLevelPopup === "function"){

    showLevelPopup();

}


}





// =================
// Lv変更
// =================

function changeLevel(amount){


level += amount;



if(level < 1){

    level = 1;

}



saveLevelData();


updateStatus();


}





// =================
// 保存
// =================

function saveLevelData(){


localStorage.setItem(
"level",
level
);



localStorage.setItem(
"currentXP",
currentXP
);



localStorage.setItem(
"nextXP",
nextXP
);


}





// =================
// 表示
// =================

function updateStatus(){



let lv =
document.getElementById("level");


let now =
document.getElementById("currentXP");


let next =
document.getElementById("nextXP");


let bar =
document.getElementById("xpBar");



if(lv){

lv.innerHTML =
level;

}



if(now){

now.innerHTML =
currentXP;

}



if(next){

next.innerHTML =
nextXP;

}



if(bar){

bar.style.width =
(currentXP / nextXP * 100)
+
"%";

}


}





// 初期表示

updateStatus();
