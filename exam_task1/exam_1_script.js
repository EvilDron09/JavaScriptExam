// Variable declarations
// Оголошення змінних
const writeValueForm = document.forms.writeValue;
const inputText = document.getElementById('textInput');
const listDiv = document.getElementById('boxList');
const buttonsBlock = document.getElementsByTagName('button');

// Creating localStorage
// Створення localStorage
let textElements =JSON.parse(localStorage.getItem('textElement')) ||[];

// Adds items to localStorage
// Додає елементи в localStorage
function saveTextElements(){
    localStorage.setItem('textElement', JSON.stringify(textElements));
}

// Selects items to be deleted
// Виділяє елементи, які будуть видалені
function deleteSelectionElement (element,statusText){
    element.addEventListener('click',(e)=> {
        if(e.target.matches('p')){
            element.classList.add('deleteElement')
            element.style.background ='red';
            statusText.status = 'delete';
        }
        saveTextElements()
    })
}

// Adds objects to the list
// Додає об'єкти до списку
function renderText(){
    listDiv.innerHTML = '';
    textElements.forEach(item =>{
        const pList = document.createElement('p');
        pList.innerText = `${item.name}=${item.value}`;
        item.status = '';
        deleteSelectionElement(pList,item);
        listDiv.appendChild(pList);
        saveTextElements()
    })

}

writeValueForm.addEventListener('submit',(e) =>{
        e.preventDefault();
        const [name,value,status]= writeValueForm.textInput.value.split('=').map(e=>e.trim());
        if(name && value){
            textElements.push({name,value, status:''});
            saveTextElements();
            renderText();
            inputText.value = '';
        }
})

// Sorting objects by name in ascending order
// Сортування об'єктів за ім'ям в порядку зростання
buttonsBlock[0].addEventListener('click',(e) =>{
    e.preventDefault();
    textElements.sort((text1, text2) => text1.name.localeCompare(text2.name));
    listDiv.innerHTML = '';
        textElements.forEach(item =>{
            const sortName = document.createElement('p');
            sortName.innerText = `${item.name}=${item.value}`;
            deleteSelectionElement(sortName,item);
            listDiv.appendChild(sortName);
            item.status = '';
            saveTextElements();

        })
})

// Sorting objects by value in ascending order
// Сортування об'єктів за значенням в порядку зростання
buttonsBlock[1].addEventListener('click',(e)=>{
    e.preventDefault();
    textElements.sort((text1, text2) => text1.value.localeCompare(text2.value));
    listDiv.innerText = '';
    textElements.forEach(item =>{
        const sortName = document.createElement('p');
        sortName.innerText = `${item.name}=${item.value}`;
        deleteSelectionElement(sortName,item);
        listDiv.appendChild(sortName);
        item.status = '';
        saveTextElements();
    })
})

// Deletes selected objects
// Видаляє виділенні об'єкти
buttonsBlock[2].addEventListener('click',(e)=>{
    e.preventDefault();
   textElements = textElements.filter(item => item.status !== 'delete');
    saveTextElements();
    document.querySelectorAll('.deleteElement').forEach(element => element.remove());
})

// Removes all elements on page reload
// Видаляє всі елементи при перезавантаженні сторінки
window.addEventListener('load',() =>{
    textElements =[];
    saveTextElements();
    renderText();
})
