let totalXP =
Number(localStorage.getItem("totalXP")) || 0;


let level =
Number(localStorage.getItem("level")) || 1;


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


document.getElementById("level").innerHTML =
level;



let data = getLevel(totalXP);



document.getElementById("currentXP").innerHTML =
data.current;



document.getElementById("nextXP").innerHTML =
data.next;



document.getElementById("xpBar").style.width =
(data.current / data.next * 100) + "%";


}

function checkLevelUp(){

let data = getLevel(totalXP);


while(level < data.level){

    level++;

    localStorage.setItem(
        "level",
        level
    );

}

}
