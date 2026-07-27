let studyItems =
JSON.parse(localStorage.getItem("studyItems"))
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


function saveItems(){

localStorage.setItem(
"studyItems",
JSON.stringify(studyItems)
);

}



function addStudyItem(){

let name =
document.getElementById("newName").value;


let xp =
Number(document.getElementById("newXP").value);



if(!name || xp<=0){

return;

}


studyItems.push({

name:name,
xp:xp

});


saveItems();

renderItems();

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



function deleteItem(index){

studyItems.splice(index,1);

saveItems();

renderItems();

}
