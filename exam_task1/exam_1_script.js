const writeValueForm = document.forms.writeValue;
const inputText = document.getElementById('textInput');
const listDiv = document.getElementById('boxList');
const buttonsBlock = document.getElementsByTagName('button');




function Text (name,value){
    this.name = name;
    this.value = value
}
let textList =[]


function deleteSelectionElement (element){
    element.addEventListener('mousedown',(e)=> {
        if(e.target.matches('p')){
            element.className='deleteElement'
            element.style.background ='red';
        }
    })
}

// Додає об'єкти до списку
writeValueForm.addEventListener('submit',(e) =>{
        e.preventDefault();
            const textInputS = writeValueForm.textInput.value;
            const textInputSplit = textInputS.split('=');
            const textInputName = textInputSplit[0].trim();
            const textInputValue = textInputSplit[1].trim();
            let textObj = {textInputName,textInputValue};
            localStorage.setItem('textObj', JSON.stringify(textObj));
            const pList = document.createElement('p');
            textList.push(new Text(textInputName, textInputValue));
            pList.innerText = `${textInputName}=${textInputValue}`;
            deleteSelectionElement(pList);
            listDiv.appendChild(pList);
            inputText.value = ''
})

// Сортування об'єктів за ім'ям в порядку зростання
buttonsBlock[0].addEventListener('click',(e) =>{
    e.preventDefault();
    let textListNameSort= textList.sort((text1, text2) => text1.name.localeCompare(text2.name));
    listDiv.innerText = '';
    for (const textListNameSortElement of textListNameSort) {
        const sortName = document.createElement('p');
        sortName.innerText = `${textListNameSortElement.name}=${textListNameSortElement.value}`;
        deleteSelectionElement(sortName);
        listDiv.appendChild(sortName);
    }
})
// Сортування об'єктів за значенням в порядку зростання
buttonsBlock[1].addEventListener('click',(e)=>{
    e.preventDefault();
    let textListValueSort = textList.sort((text1, text2) => text1.value.localeCompare(text2.value));
    listDiv.innerText = '';
    for (const textListValueSortElement of textListValueSort) {
        const sortValue = document.createElement('p');
        sortValue.innerText =`${textListValueSortElement.name}=${textListValueSortElement.value}`;
        deleteSelectionElement(sortValue);
        listDiv.appendChild(sortValue);
    }
})

// Видаляє всі об'єкти
buttonsBlock[2].addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelectorAll('.deleteElement').forEach(element => {
        const [name,value] = element.innerText.split('=').map(item => item.trim())
        textList = textList.filter( item =>{
            return item.name !== name && item.value !== value})
        element.remove();

    })

})
