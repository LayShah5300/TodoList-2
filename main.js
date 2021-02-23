/* Select all the necessary Elements  */

var input = document.querySelector('.todo_input');
var MainTodoContainer = document.getElementById('todos')
var addingButton = document.querySelector('.add-item');
var deleteAllBtn = document.querySelector('.deleteBtn');
var completedButton = document.querySelector('.completed');
var removeButton = document.querySelector('.trash');

addingButton.addEventListener('click', function(e){
    /* stoping button behaviour */
    e.preventDefault();
    
    /* Create all the elements */
    if(input.value.trim()){
        /* UL Tag */
        var ulTag = document.createElement('ul');
        ulTag.classList.add('todo-list-container');
        /* Todo list div */
        var todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        /* LI Tag */
        var liTag = document.createElement('li');
        liTag.innerText = input.value;
        liTag.classList.add('todo-item');
        /*Save data to local storage*/
        saveLocalTodos(input.value);
        /* Button Div */
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');
        /* completed button element1 */
        var completeButton = document.createElement('button');
        completeButton.classList.add('completed');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        /* Edit Button */
        var editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        editBtn.classList.add('editBtn');
        editBtn.onclick = function(){
            editWorking(liTag);
        }
        /* trash button element2 */
        var trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    
        /* Appending Elements into each other */
        ulTag.appendChild(todoList);
        todoList.appendChild(liTag);
        todoList.appendChild(buttonDiv);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(trashButton);
    
        /* if input is empty then don't display empty list in DOM */
        MainTodoContainer.appendChild(ulTag);

        

            /* sessionStorage */
        /* when the add button click clear the input value */
        input.value = '';
        /* complete and trash button working */
        todoList.addEventListener('click', function(e){
            var items = e.target;
            if(items.classList[0] === 'completed'){
                var todo = items.parentElement;
                var todo2 = todo.parentElement;
                todo2.classList.add('line_through')
            }
            else if(items.classList[0] === 'trash'){
                var todo = items.parentElement;
                var todo2 = todo.parentElement;
                todo2.classList.add('fall');
                todo2.addEventListener('transitionend', function(){
                    var todo3 = todo2.parentElement;
                    todo3.remove();
                });
            }
        });
    }else if(input.value === ''){
        alert('please fill the input field')
    }
});

/**
 * It takes the value present in task and then let user edit it.
 * @param {string} e 
 */
function editWorking(e){
    var editValue = prompt('edit the select item', e.firstChild.nodeValue);
    e.firstChild.nodeValue = editValue;
}

/**
 * This function delete's All the task present in the List.
 */
function deleteAllElements(){
    var gettingUlTag = document.querySelectorAll('.todo-list-container');
    for(var i = 0; i < gettingUlTag.length; i++){
        gettingUlTag[i].remove();
    }
    input.value = '';
}

/**
 * This Function is used for searching. It takes input from user and shows the searched result.
 */
let SearchtextBox = document.getElementById("searchtextBox");
searchtextbox.addEventListener("input", function() {
    let trlist = document.getElementsByClassName('todo-list-container');
    Array.from(trlist).forEach(function(item) {
            let searchedtext = item.getElementsByTagName("li")[0].innerText;
            let searchtextboxval = searchtextbox.value;
            let re = new RegExp(searchtextboxval, 'gi');
            if (searchedtext.match(re)) {
                 item.style.display = "d-block";
            }else {
                item.style.display = "none";
            }
        })
       
})

/*Function to store data in local storage*/
function saveLocalTodos(todo){
    let todoz;
    if(localStorage.getItem('todoz') === null){
        todoz = [];
    }else{
        todoz = JSON.parse(localStorage.getItem('todoz'));
    }
    todoz.push(todo);
    localStorage.setItem('todoz',JSON.stringify(todoz));
}