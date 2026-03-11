const writeValueForm = document.forms.writeValue;
const inputText = document.getElementById('textInput');
const listDiv = document.getElementById('boxList');
const buttonsBlock = document.getElementsByTagName('button');


let textElements =JSON.parse(localStorage.getItem('textElement')) ||[];

function saveTextElements(){
    localStorage.setItem('textElement', JSON.stringify(textElements));
}

function deleteSelectionElement (element,statusText){
    element.addEventListener('click',(e)=> {
        if(e.target.matches('p')){
            element.style.background ='red';
            statusText.status = 'delete';
            saveTextElements()
        }
    })
}

// Додає об'єкти до списку
function renderText(){
    const pList = document.createElement('p');
    textElements.forEach(item =>{
        pList.innerText = `${item.name}=${item.value}`;
        pList.id=item.id
        deleteSelectionElement(pList,item);
        listDiv.appendChild(pList);
        inputText.value = ''
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

// Сортування об'єктів за ім'ям в порядку зростання
buttonsBlock[0].addEventListener('click',(e) =>{
    e.preventDefault();
    let textListNameSort= textElements.sort((text1, text2) => text1.name.localeCompare(text2.name));
    listDiv.innerHTML = '';
    for (const textListNameSortElement of textListNameSort) {
        const sortName = document.createElement('p');
        sortName.innerText = `${textListNameSortElement.name}=${textListNameSortElement.value}`;
        // textElements.forEach(item =>{
        //     sortName.id = item.id;
        //     item.status = '';
        //     deleteSelectionElement(sortName,item);
        //     saveTextElements();
        // })

        listDiv.appendChild(sortName);
    }
})
// Сортування об'єктів за значенням в порядку зростання
buttonsBlock[1].addEventListener('click',(e)=>{
    e.preventDefault();
    let textListValueSort = textElements.sort((text1, text2) => text1.value.localeCompare(text2.value));
    listDiv.innerText = '';
    for (const textListValueSortElement of textListValueSort) {
        const sortValue = document.createElement('p');
        sortValue.innerText =`${textListValueSortElement.name}=${textListValueSortElement.value}`;
        // textElements.forEach(item =>{
        //     sortValue.id = item.id;
        //     item.status = '';
        //     deleteSelectionElement(sortValue,item);
        //     saveTextElements();
        // })

        listDiv.appendChild(sortValue);
    }
})

// Видаляє всі об'єкти
buttonsBlock[2].addEventListener('click',(e)=>{
    e.preventDefault();
    textElements.splice(document.querySelectorAll('.deleteElement'))
    saveTextElements();
    renderText();
})

