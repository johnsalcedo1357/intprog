function display(users) {
    let list = document.getElementById("userlist");
        users.forEach(user => {
            let textContent = `
            <img src="${user.avatar}"><br>
            ${user.first_name} ${user.last_name} - ${user.email}<br>
            
            `;
            list.innerHTML += textContent;
        });
}
