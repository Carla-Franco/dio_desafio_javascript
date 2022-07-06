const inputElement = document.querySelector(".tarefa");
const addButton = document.querySelector(".adiciona-tarefa");

const itensContainer = document.querySelector('.container-itens');

const validateInput = () => inputElement.value.trim().length > 0;

const functionAdd = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('object-item');

    const itemText = document.createElement('p');
    itemText.innerText = inputElement.value;

    itemText.addEventListener('click', () => handleClick(itemText));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () => handleDeleteClick(itemContainer, itemText));

    itemContainer.appendChild(itemText);
    itemContainer.appendChild(deleteItem);

    itensContainer.appendChild(itemContainer);

    inputElement.value = '';

    updateLocalStorage();
};

const handleClick = (itemText) => {
    const itens = itensContainer.childNodes;

    for (const item of itens) {
        const currentTaskIsBeingClicked = item.firstChild.isSameNode(itemText);

         if (currentTaskIsBeingClicked) {
            item.firstChild.classList.toggle("completed");
         }
    }

    updateLocalStorage();
};

const handleDeleteClick = (itemContainer, itemText) => {
    const itens = itensContainer.childNodes;
    
    for (const item of itens) {
        const currentTaskIsBeingClicked = item.firstChild.isSameNode(itemText);

        if (currentTaskIsBeingClicked) {
            itemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const itens = itensContainer.childNodes;

    const localStorageItens = [ ... itens].map((item) => {
        const content = item.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("itens", JSON.stringify(localStorageItens));
};

const refreshItensUsingLocalStorage = () => {
    const itensFromLocalStorage = JSON.parse(localStorage.getItem("itens"));

    if (!itensFromLocalStorage) return;

    for (const item of itensFromLocalStorage) {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("object-item");

        const itemText = document.createElement("p");
        itemText.innerText = item.description;

        if (item.isCompleted) {
            itemText.classList.add("completed");
        }

        itemText.addEventListener("click", () => handleClick(itemText));

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");

        deleteItem.addEventListener("click", () => handleDeleteClick(itemContainer, itemText));

        itemContainer.appendChild(itemText);
        itemContainer.appendChild(deleteItem);

        itensContainer.appendChild(itemContainer);
    }
};

refreshItensUsingLocalStorage();

addButton.addEventListener("click", () => functionAdd());

inputElement.addEventListener("change", () => handleInputChange());