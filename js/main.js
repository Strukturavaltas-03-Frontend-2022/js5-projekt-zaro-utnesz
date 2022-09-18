//Keys of users

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
document.querySelector("#getDataBtn").addEventListener("click", startGetUsers);

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
                name: k
            });
                if (k == "id") {
                input.setAttribute("readonly", true);
            } 
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
    let infoBtn = createAnyElement("button", { class: "btn-info", onclick: "setUser(this)" });
    infoBtn.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`;
    let deleteBtn = createAnyElement("button", { class: "btn-del", onclick: "delUser(this)" });
    deleteBtn.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;

    group.appendChild(infoBtn)
    group.appendChild(deleteBtn)

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

//Button functions

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

}



// New User function

function addUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "input",
            name: k
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
}

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

// Set user

function setUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
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
};
