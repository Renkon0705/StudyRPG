let totalXP =
Number(localStorage.getItem("totalXP")) || 0;



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





function updateStatus(){


let data=getLevel(totalXP);



document.getElementById("level").innerHTML=
data.level;



document.getElementById("currentXP").innerHTML=
data.current;



document.getElementById("nextXP").innerHTML=
data.next;



document.getElementById("totalXP").innerHTML=
totalXP;



document.getElementById("xpBar").style.width=
(data.current/data.next*100)+"%";


}
