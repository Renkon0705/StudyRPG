let level =
Number(localStorage.getItem("level")) || 1;


let currentXP =
Number(localStorage.getItem("currentXP")) || 0;


let nextXP =
Number(localStorage.getItem("nextXP")) || 100;


function getLevel(xp){


let level=1;

let need=100;



while(xp>=need){

xp-=need;

level++;

need=Math.floor(need*1.2);

}



return {

level:level,

current:xp,

next:need

};


}


function getXPFromLevel(level){

let total=0;

let need=100;


for(let i=1;i<level;i++){

total+=need;

need=Math.floor(need*1.2);

}


return total;

}


function updateStatus(){

level =
Number(localStorage.getItem("level")) || 1;
let data = getLevel(totalXP);



document.getElementById("level").innerHTML =
level;



document.getElementById("currentXP").innerHTML =
data.current;



document.getElementById("nextXP").innerHTML =
data.next;



document.getElementById("xpBar").style.width =
(data.current / data.next * 100) + "%";


}

function checkLevelUp(){

let data = getLevel(totalXP);


// XPが到達したレベルまで上げる

if(level < data.level){

    level = data.level;


    localStorage.setItem(
        "level",
        level
    );

}

}
