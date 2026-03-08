const writeValueForm = document.forms.writeValue;
const inputText = document.getElementById('textInput');
const listDiv = document.getElementById('boxList');
const buttonsBlock = document.getElementsByTagName('button');

function Text (name,value){
    this.name = name;
    this.value = value
}
let textList =[]


writeValueForm.addEventListener('submit',(e) =>{
        e.preventDefault();
            const textInputS = writeValueForm.textInput.value;
            let textObj = {textInputS};
            localStorage.setItem('textObj', JSON.stringify(textObj));
            const pList = document.createElement('p');
            const textInputSplit = textInputS.split('=');
            const textInputName = textInputSplit[0].trim();
            const textInputValue = textInputSplit[1].trim();
            textList.push(new Text(textInputName, textInputValue))
            pList.innerText = `${textInputName}=${textInputValue}`
            listDiv.appendChild(pList);
            inputText.value = ''
})

buttonsBlock[0].addEventListener('click',(e) =>{
    e.preventDefault();
    let textListNameSort= textList.sort((text1, text2) => text1.name.localeCompare(text2.name));
    listDiv.innerHTML = '';
    for (const textListNameSortElement of textListNameSort) {
        const sortName = document.createElement('p');
        sortName.innerText = `${textListNameSortElement.name}=${textListNameSortElement.value}`;
        listDiv.appendChild(sortName);
    }
})

buttonsBlock[1].addEventListener('click',(e)=>{
    e.preventDefault();
    let textListValueSort = textList.sort((text1, text2) => text1.value.localeCompare(text2.value));
    listDiv.innerHTML = '';
    for (const textListValueSortElement of textListValueSort) {
        const sortValue = document.createElement('p');
        sortValue.innerText =`${textListValueSortElement.name}=${textListValueSortElement.value}`;
        listDiv.appendChild(sortValue);
    }
})

buttonsBlock[2].addEventListener('click',(e)=>{
    e.preventDefault();
    listDiv.innerHTML=''
})
