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

document.querySelector("#getDataBtn").addEventListener("click", function() {
    getServerData("http://localhost:3000/users").then(
        data => fillDataTable(data, "usersTable")
    );
});

//Fill table with users

function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not exist.`)
        return;
    } 

    let tBody = table.querySelector("tbody");
    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k in row) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
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

    let group = createAnyElement("div", {class: "btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn-info", onclick: "getInfo(this)"});
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


function delUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
console.log(tr);

}


