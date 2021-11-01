
// Your Code Here
let formDOM = document.getElementById('form');
//let titleDiv = document.createElement('div');
//titleDiv.textContent = 'Title:     '
let titleEntry = document.createElement('input');
titleEntry.type = 'input';
titleEntry.setAttribute('type', 'text');
//let descDiv = document.createElement('div');
//textContent = 'Description:     '
let descEntry = document.createElement('input');
descEntry.type = 'input';
descEntry.setAttribute('type', 'text');
let imgDiv = document.createElement('div');
imgDiv.textContent = 'Image URL:     '
let imgEntry = document.createElement('input');
imgEntry.type = 'input';
imgEntry.setAttribute('type', 'text');
let subBtn = document.createElement('input')
subBtn.setAttribute('type', 'submit')
// titleDiv.append(titleEntry);
// descDiv.append(descEntry);
// imgDiv.append(imgEntry)
formDOM.append(titleEntry, descEntry, imgEntry, subBtn)


// saveButton.addEventListener('click', () => {
//     fetch('http://localhost:3001/addBook', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/JSON'
//         },
//         body: JSON.stringify({
//             id: book.id,
//             quantity: quantityInput.value
//         })
//     })
// })

subBtn.addEventListener('click', () => {
    fetch('http://localhost:3001/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
            id: 1,
            title: `${titleEntry}`,
            description: `${descEntry}`,
            imageURL: `${imgEntry}`
        })
    })

    .then(response => response.json)
    .then(json => console.log(json))
})




async function main() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root')
    
    let li = document.createElement('li')
    li.textContent = book.title
    
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'

    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    deleteButton.addEventListener('click', () => {
        fetch('http://localhost:3001/removeBook' + `/${book.id}`, {
        method: 'DELETE',
        })

        console.log( `${book.id} - deleted`)
    })

    li.append(quantityInput, saveButton, deleteButton)
    root.append(li)
}

main();