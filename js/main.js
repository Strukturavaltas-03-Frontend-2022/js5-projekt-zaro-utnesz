'use strict'

let keys = ["id", "name", "email", "address"];



// GET method

function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    )
}

function startGetUsers() {
    getServerData("http://localhost:3000/users").then(
        data => fillDataTable(data, "usersTable")
    );
}

startGetUsers();

//Fill table with users

function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not exist.`)
        return;
    }

    // Add new user row

    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = addUserRow();
    tBody.appendChild(newRow);

    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            let input = createAnyElement("input", {
                class: "input",
                value: row[k],
                name: k,
                readOnly: true,
            });
            tr.appendChild(td);
            td.appendChild(input);
        }
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup() {

    let group = createAnyElement("div", { class: "btn-group" });
    let infoBtn = createAnyElement("button", { class: "btn-edit", onclick: "editUser(this)" });
    infoBtn.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>`;
    let deleteBtn = createAnyElement("button", { class: "btn-del", onclick: "delUser(this)" });
    deleteBtn.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;
    let saveBtn = createAnyElement("button", { class: "btn-save", onclick: "saveUser(this)", style: "display: none" });
    saveBtn.innerHTML = `<i class="fa fa-save" aria-hidden="true"></i>`;
    let undoBtn = createAnyElement("button", { class: "btn-undo", onclick: "undoUser(this)", style: "display: none" });
    undoBtn.innerHTML = `<i class="fa fa-undo" aria-hidden="true"></i>`;

    group.appendChild(infoBtn)
    group.appendChild(deleteBtn)
    group.appendChild(saveBtn)
    group.appendChild(undoBtn)

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
};


//Button functions

//Edit user


function editUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    Array.from(tr.children).forEach(td => td.children[0].readOnly = false)
    const name = tr.children[1].children[0].value
    const email = tr.children[2].children[0].value
    const address = tr.children[3].children[0].value

    btn.style.display = "none";
    btn.parentElement.children[1].style.display = "none";
    btn.parentElement.children[2].style.display = "inline-block";
    btn.parentElement.children[3].style.display = "inline-block";

};

//Save user

function saveUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    Array.from(tr.children).forEach(td => td.children[0].readOnly = true);
    const name = tr.children[1].children[0].value
    const email = tr.children[2].children[0].value
    const address = tr.children[3].children[0].value

    btn.style.display = "none";
    btn.parentElement.children[3].style.display = "none";
    btn.parentElement.children[0].style.display = "inline-block";
    btn.parentElement.children[1].style.display = "inline-block";


    let data = getRowData(tr);
    let id = tr.children[0].children[0].value;
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => startGetUsers()
    );

    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    const isVAlidAddress = /^[a-zA-Z0-9\s,'-]*$/;

    const nameMatch = name.match(isValidName);
    const emailMatch = email.match(isValidEmail);
    const addressMatch = address.match(isVAlidAddress);

    if (nameMatch && emailMatch && addressMatch) {

        alert("ok")
    } else if (!nameMatch && emailMatch && addressMatch) {

        alert("Name is not valid!");
    } else if (nameMatch && !emailMatch && addressMatch) {

        alert("Email is not valid!");
    } else if (nameMatch && emailMatch && !addressMatch) {

        alert("Address is not valid!");
    } else {

        alert("Please add valid data!");
    }



};

//Undo user

function undoUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    Array.from(tr.children).forEach(td => td.children[0].readOnly = true);
    const name = tr.children[1].children[0].value
    const email = tr.children[2].children[0].value
    const address = tr.children[3].children[0].value

    btn.style.display = "none";
    btn.parentElement.children[2].style.display = "none";
    btn.parentElement.children[0].style.display = "inline-block";
    btn.parentElement.children[1].style.display = "inline-block";
    startGetUsers();


}


//Delete user

function delUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.children[0].children[0].value;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();
        }
    );

    alert("User deleted!");

}


// New User

function addUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "input",
            name: k,
            placeholder: "New data..."

        });
        td.appendChild(input);
        tr.appendChild(td);
    }

    let newBtn = createAnyElement("button", {
        class: "newUser",
        onclick: "createUser(this)"
    });
    newBtn.innerHTML = `<i class="fa fa-plus-square" aria-hidden="true"></i>`;
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createUser(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getRowData(tr);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => startGetUsers()
    );


    Array.from(tr.children).forEach(td => td.children[0].readOnly = true);
    const name = tr.children[1].children[0].value
    const email = tr.children[2].children[0].value
    const address = tr.children[3].children[0].value

    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    const isVAlidAddress = /^[a-zA-Z0-9\s,'-]*$/;

    const nameMatch = name.match(isValidName);
    const emailMatch = email.match(isValidEmail);
    const addressMatch = address.match(isVAlidAddress);

    if (nameMatch && emailMatch && addressMatch) {
        alert("ok")
    } else if (!nameMatch && emailMatch && addressMatch) {

        alert("Name is not valid!");
    } else if (nameMatch && !emailMatch && addressMatch) {

        alert("Email is not valid!");
    } else if (nameMatch && emailMatch && !addressMatch) {

        alert("Address is not valid!");
    } else {

        alert("Please add valid data!");
    }
}

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

