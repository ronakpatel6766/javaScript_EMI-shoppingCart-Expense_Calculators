//shopping List app by Ronak Patel
//features
//store in localstorage of browser
//purchase / purchased 
//delete list items


var b_addButton = document.getElementById('b_addButton');
var addInput = document.getElementById('b_itemInput');
var b_sList = document.getElementById('b_sList');
var listArray = [];
//declare addToshoppingList function

function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
}
var changeToComp = function(){
    var parent = this.parentElement;
    parent.className = 'uncompleted well';
    this.innerText = 'Purchased';
    this.removeEventListener('click',changeToComp);
    this.addEventListener('click',changeToInComp);
    changeListArray(parent.firstChild.innerText,'complete');

}

var changeToInComp = function(){
    var parent = this.parentElement;
    parent.className = 'completed well';
    this.innerText = ' Purchase';
    this.removeEventListener('click',changeToInComp);
    this.addEventListener('click',changeToComp);

    changeListArray(parent.firstChild.innerText,'incomplete');

}

var removeItem = function(){
    var parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    var data = this.parentElement.firstChild.innerText;
    for(var i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray.splice(i,1);
            refreshLocal();
            break;
        }
    }


}

//function to change the shopping list array
var changeListArray = function(data,status){

    for(var i=0; i < listArray.length; i++){

        if(listArray[i].content == data){
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

//function to change the dom of the list of shopping list
var createItemDom = function(text,status){

    var listItem = document.createElement('li');

    var itemLabel = document.createElement('label');

    var itemCompBtn = document.createElement('button');

    var itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete')?'completed well':'uncompleted well';

    itemLabel.innerText = text;
    itemCompBtn.className = 'btn btn-success';
    itemCompBtn.innerText = (status == 'incomplete')?'Purchase':'Incomplete';
    if(status == 'incomplete'){
        itemCompBtn.addEventListener('click',changeToComp);
    }else{
        itemCompBtn.addEventListener('click',changeToInComp);
    }



    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click',removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
}

var refreshLocal = function(){
    var todos = listArray;
    localStorage.removeItem('b_sList');
    localStorage.setItem('b_sList', JSON.stringify(todos));
}

var addToList = function(){
    var newItem = new listItemObj();
    newItem.content = addInput.value;

    if(newItem.content==""){
        alert("Please Add Some Item");
    }
    else{
    listArray.push(newItem);
    
    //add to the local storage
    refreshLocal();

    //change the dom
    var item = createItemDom(addInput.value,'incomplete');
    b_sList.appendChild(item);
    addInput.value = '';
}

}

//function to clear shopping list array
var clearList = function(){
    listArray = [];
    localStorage.removeItem('b_sList');
    b_sList.innerHTML = '';

}

window.onload = function(){
    var list = localStorage.getItem('b_sList');
    document.getElementById("b_itemInput").focus(); 
    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for(var i=0; i<listArray.length;i++){
            var data = listArray[i].content;

            var item = createItemDom(data,listArray[i].status);
            b_sList.appendChild(item);
        }

    }

};
//add an event binder to the button
b_addButton.addEventListener('click',addToList);
b_clearButton.addEventListener('click',clearList);
