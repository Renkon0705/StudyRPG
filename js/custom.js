let studyItems =

JSON.parse(
localStorage.getItem("studyItems")
)

||

[

{
name:"映像授業30分",
xp:30
},

{
name:"英単語100語",
xp:20
}

];


let addCost =
Number(localStorage.getItem("addCost")) || 1;


function saveItems(){


localStorage.setItem(

"studyItems",

JSON.stringify(studyItems)

);


}





function renderItems(){


let setting =
document.getElementById("settingList");


let study =
document.getElementById("studyList");



setting.innerHTML="";

study.innerHTML="";




studyItems.forEach((item,index)=>{



setting.innerHTML +=

`

<p>

${item.name}

(${item.xp}XP)


<button onclick="deleteItem(${index})">

削除

</button>


</p>

`;





study.innerHTML +=

`

<p>

${item.name}


<input

type="number"

id="study${index}"

value="0">


</p>

`;



});


}








function addStudyItem(){


let name =
document.getElementById("newName").value;


let xp =
Number(document.getElementById("newXP").value);


// 現在の購入用Lvを取得
let level =
Number(localStorage.getItem("level")) || 1;



// コスト確認

if(level < addCost){

alert(
"必要Lv："+addCost
);

return;

}



// 項目追加

studyItems.push({

name:name,

xp:xp

});



// ★ここでLvを消費

level = level - addCost;



localStorage.setItem(
"level",
level
);



// 次回コスト増加

addCost++;


localStorage.setItem(
"addCost",
addCost
);



saveItems();


renderItems();


updateStatus();


}








function deleteItem(index){


studyItems.splice(index,1);


saveItems();


renderItems();


}









function calculateCustomXP(){



let xp=0;



studyItems.forEach((item,index)=>{


let count=

Number(
document.getElementById(
"study"+index
).value
);



xp += count*item.xp;


});

// 連日ボーナス

let multiplier =
getStreakMultiplier();


xp *= multiplier;


if(xp<=0){

return;

}



totalXP += xp;



localStorage.setItem(

"totalXP",

totalXP

);



document.getElementById("todayXP").innerHTML=

"+"+xp+" XP";



updateStatus();

updateStreak();

}










function toggleSetting(){


let menu=

document.getElementById("settingMenu");



if(menu.style.display==="none"){

menu.style.display="block";

}

else{

menu.style.display="none";

}


}

function updateAddCost(){


document.getElementById("addCostText").innerHTML =

"次の項目追加コスト：Lv."+addCost;


}

function updateAddCost(){

document.getElementById("addCostText").innerHTML=

"次の解放コスト：Lv."
+
addCost;

}
