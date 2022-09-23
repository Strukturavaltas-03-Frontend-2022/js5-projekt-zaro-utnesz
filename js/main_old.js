

const getUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    console.log(users);
    const tBody = document.querySelector('table tbody');
    tBody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tBody.appendChild(tr);

        const id = document.createElement('input');
        tr.appendChild(id);
        id.textContent = user.id;

        const name = document.createElement('input');
        tr.appendChild(name);
        name.textContent = user.name;

        const email = document.createElement('input');
        tr.appendChild(email);
        email.textContent = user.email;

        const address = document.createElement('input');
        tr.appendChild(address);
        address.textContent = user.address;
        
        const edit_button = document.createElement('button');
        tr.appendChild(edit_button);
        edit_button.textContent = 'edit';

        const button = document.createElement('button');
        tr.appendChild(button);
        button.textContent = 'delete';


        user.handleClick = function () {
            button.addEventListener('click', async () => {
                await fetch(`http://localhost:3000/users/${this.id}`, {
                    method: 'DELETE',
                });
                alert(`${this.name} deleted!`);
                await getUsers();
            });
        };

        user.handleClick();

//         user.editUser = function () {
//             button.addEventListener('click', async () => {
//                 await fetch(`http://localhost:3000/users/${this.id}`, {
//                     method: 'DELETE',
//                 });

//             });
//         };

//         user.editUser();


 });
};
getUsers();


