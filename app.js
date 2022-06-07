
//************************/
const [incomplete, completed] = ["#incomplete-tasks","#completed-tasks"].map(el=>document.querySelector(el));
const new_task = document.querySelector("#new-task");

//создание элемена таска li с его содержимым и обработчиками событий

function addTask(taskName,className =""){
    const tmp_content = document.createElement("template").content;    
    let li = document.createElement("li"); 
    if (className) li.classList.add(className);
    tmp_content.append(li);
    //************checkbox**********//
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.addEventListener("change",handlerClick);
    tmp_content.firstChild.append(checkbox);
    //************label**********//
    let label = document.createElement("label");
    label.classList.add("text");
    label.textContent=taskName;    
    tmp_content.firstChild.append(label);
    //************text**********//
    let input_text = document.createElement("input");
    input_text.setAttribute("type","text");
    input_text.setAttribute("value",`${taskName}`);
    input_text.classList.add("task");
    tmp_content.firstChild.append(input_text);
    //************btn edit/save**********//
    let btn = document.createElement("button");
    btn.classList.add("edit");
    btn.textContent = className?"Save":"Edit";
    btn.addEventListener("click",handlerClick);    
    tmp_content.firstChild.append(btn);
    //************btn delete**********//
    btn = document.createElement("button");    
    btn.classList.add("delete");
    btn.insertAdjacentHTML("afterbegin","<img src='./remove.svg'>");
    btn.addEventListener("click",handlerClick);
    tmp_content.firstChild.append(btn);
    return tmp_content;
}

(function(){
    [incomplete, completed].forEach((el,index)=>{
        el.append(addTask(index?"See the Doctor":"Pay Bills"));
        if (!index) el.append(addTask("Go Shopping","editMode"));
    })
})()

const arr_btn = document.querySelector(".add-task__btn");
arr_btn.addEventListener("click",handlerClick);

let getCurentTaskElement = function( tag ){
    while ( !/incomplete-tasks|completed-tasks/i.test(tag.getAttribute('id'))){
        return getCurentTaskElement(tag.parentElement);
    }
    return tag;
}
//Common event's handler (add, delete, check)
function handlerClick(event){
    event.preventDefault(); event.stopPropagation();
    let target = event.currentTarget, parent = target.parentElement;
    switch (event.type){
        case "click":
            if (target.classList.contains("add-task__btn")){    
                if (!new_task.value){alert("enter scheduled task before adding"); new_task.focus(); return;}
                incomplete.append(addTask(new_task.value));
                new_task.value="";
            }
            else if( target.classList.contains("delete")){
                parent.remove();
            }
            else if ( target.classList.contains("edit")){
                let curentEditMode = document.querySelector(".editMode");
                if ( /edit/i.test(target.textContent) ){                    
                    if ( curentEditMode ){
                        curentEditMode.querySelector(".edit").textContent = "Edit";
                        curentEditMode.classList.remove("editMode");
                    };
                    parent.classList.add("editMode");
                    parent.querySelector(".edit").textContent = "Save";
                }
                else {
                    parent.classList.remove("editMode");
                  parent.querySelector("label").textContent = parent.querySelector("input[type='text']").value;
                    curentEditMode.querySelector(".edit").textContent = "Edit";

                }
            }
            break;
        case "change":            
            let value =  parent.querySelector("input[type='text']").value;
            let whereIam = getCurentTaskElement(target);
            parent.remove();
            if (whereIam === completed) incomplete.append(addTask(value));
            else completed.append(addTask(value));
        break;
    }
}
