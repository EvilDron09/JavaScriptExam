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
    textElements.sort((text1, text2) => {
        const valueName1 = text1.name;
        const valueName2 = text2.name
        const textNumName1 = parseFloat(valueName1);
        const textNumName2 = parseFloat(valueName2);
        const textNumberName1 = !isNaN(textNumName1) && isFinite(valueName1);
        const textNumberName2 = !isNaN(textNumName2) && isFinite(valueName2);
        if (textNumberName1 && textNumberName2){
          return textNumName1-textNumName2
        }
        if (textNumberName1) return -1;
        if (textNumberName2) return 1;
        return valueName1.localeCompare(valueName2);
    });
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
    textElements.sort((text1, text2) => {
        const valueText1 = text1.value;
        const valueText2 = text2.value;
        const textNumValue1 = parseFloat(valueText1);
        const textNumValue2 = parseFloat(valueText2);
        const textNumberValue1 = !isNaN(textNumValue1) && isFinite(valueText1);
        const textNumberValue2 = !isNaN(textNumValue2) && isFinite(valueText2);
        if (textNumberValue1 && textNumberValue2){
            return textNumValue1-textNumValue2;
        }
        if (textNumberValue1) return -1;
        if (textNumberValue2) return 1;
         return valueText1.localeCompare(valueText2);
    });
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
