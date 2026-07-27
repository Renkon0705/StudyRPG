// =================
// Study RPG XP System
// =================


// 現在レベル

let level =
Number(
localStorage.getItem("level")
)
|| 1;



// 現在Lv内XP

let currentXP =
Number(
localStorage.getItem("currentXP")
)
|| 0;



// 次レベル必要XP

let nextXP =
Number(
localStorage.getItem("nextXP")
)
|| 100;





// =================
// XP獲得
// =================

function addXP(amount){


currentXP += amount;



// レベルアップ判定

while(currentXP >= nextXP){


    currentXP -= nextXP;


    level++;



    // 次Lv必要XP増加

    nextXP =
    Math.floor(nextXP * 1.2);


}



// 保存

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



// 表示更新

updateStatus();


// レベルアップ演出

if(typeof showLevelPopup === "function"){

    showLevelPopup();

}


}





// =================
// 表示更新
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





// =================
// 初期表示
// =================

updateStatus();
