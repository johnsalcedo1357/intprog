let info = {
    id: undefined,
    avatar: undefined,
    first_name:  undefined,
    last_name:  undefined,
    email:  undefined,
};

let query = {
    method: undefined,
    headers: {
        "Content-Type": "application/json"
    }
}

let url = 'https://reqres.in/api/users';

function display(users) {
    let list = document.getElementById("userlist");
    list.innerHTML = "";
        users.forEach(user => {
            let listItem = document.createElement("li");
            listItem.textContent = `${user.first_name} ${user.last_name} - ${user.email}`;
            list.appendChild(listItem);
        });
}

async function buttonClick(button){
    let response,data,id;
    let fileInput = document.getElementById("img");
    info.id = document.getElementById("id").value || undefined;
    info.first_name = document.getElementById("fname").value || undefined;
    info.last_name = document.getElementById("lname").value || undefined;
    info.email = document.getElementById("cred").value || undefined;
    if (fileInput && fileInput.type !== "hidden") { //check if avatar is hidden or not
        info.avatar = fileInput.files.length > 0 ? fileInput.files[0].name : undefined;
    } else {
        info.avatar = undefined;
    }
    switch(button.innerText){
        case "GET":
                query.method = "GET";
                query.body = undefined;
                response = await fetch(url, query);
                data = await response.json();
                console.log(data);
                display(Array.isArray(data.data) ? data.data : [data]);
            break;
        case "POST":
                query.method = "POST";
                query.body = JSON.stringify(info);
                response = await fetch(url,query);
                data = await response.json();
                console.log(data);
                display(Array.isArray(data.data) ? data.data : [data]);
            break;
        case "PATCH":
                query.method = "PATCH";
                query.body = JSON.stringify(info);
                url = `https://reqres.in/api/users/${id}`;
                response = await fetch(url,query);
                data = await response.json();
                console.log(data);
                url = 'https://reqres.in/api/users';
            break;
        case "DELETE":
                query.method = "DELETE";
                url = `https://reqres.in/api/users/${id}`
                response = await fetch(url,query);
                url = 'https://reqres.in/api/users';
            break;
        default:
            alert("invalid");
    }
}


///DESIGN
function clearValues(...ids) {
    ids.forEach(id => {
        let element = document.getElementById(id);
        if (element.type === "file") {
            let newInput = element.cloneNode(true);
            element.replaceWith(newInput);
        } else {
            element.value = "";
        }
    });
}

document.addEventListener("change", function(event) {
    if (event.target.name === "method") {
        let selectedValue = event.target.value;
        switch (selectedValue) {
            case "POST":
                document.getElementById("labelid").style.display = "none";
                document.getElementById("id").type = "hidden";
                document.getElementById("first").style.display = "inline";
                document.getElementById("fname").type = "text";
                document.getElementById("last").style.display = "inline";
                document.getElementById("lname").type = "text";
                document.getElementById("credentials").style.display = "inline";
                document.getElementById("cred").type = "text";
                document.getElementById("icon").style.display = "inline";
                document.getElementById("img").type = "file";
                document.getElementById("butt").innerText = "POST";
                clearValues("id", "fname", "lname", "cred", "img");
                break;
            case "PATCH":
                document.getElementById("labelid").style.display = "inline";
                document.getElementById("id").type = "text";
                document.getElementById("first").style.display = "inline";
                document.getElementById("fname").type = "text";
                document.getElementById("last").style.display = "inline";
                document.getElementById("lname").type = "text";
                document.getElementById("credentials").style.display = "inline";
                document.getElementById("cred").type = "text";
                document.getElementById("icon").style.display = "inline";
                document.getElementById("img").type = "file";
                document.getElementById("butt").innerText = "PATCH";
                clearValues("id", "fname", "lname", "cred", "img");
                break;
            case "DELETE":
                document.getElementById("labelid").style.display = "inline";
                document.getElementById("id").type = "text";
                document.getElementById("first").style.display = "none";
                document.getElementById("fname").type = "hidden";
                document.getElementById("last").style.display = "none";
                document.getElementById("lname").type = "hidden";
                document.getElementById("credentials").style.display = "none";
                document.getElementById("cred").type = "hidden";
                document.getElementById("icon").style.display = "none";
                document.getElementById("img").type = "hidden";
                document.getElementById("butt").innerText = "DELETE";
                clearValues("id", "fname", "lname", "cred", "img");
                break;
            case "GET":
                document.getElementById("labelid").style.display = "none";
                document.getElementById("id").type = "hidden";
                document.getElementById("first").style.display = "none";
                document.getElementById("fname").type = "hidden";
                document.getElementById("last").style.display = "none";
                document.getElementById("lname").type = "hidden";
                document.getElementById("credentials").style.display = "none";
                document.getElementById("cred").type = "hidden";
                document.getElementById("icon").style.display = "none";
                document.getElementById("img").type = "hidden";
                document.getElementById("butt").innerText = "GET";
                clearValues("id", "fname", "lname", "cred", "img");
                break;
            case "PUT":
                document.getElementById("labelid").style.display = "inline";
                document.getElementById("id").type = "text";
                document.getElementById("first").style.display = "inline";
                document.getElementById("fname").type = "text";
                document.getElementById("last").style.display = "inline";
                document.getElementById("lname").type = "text";
                document.getElementById("credentials").style.display = "inline";
                document.getElementById("cred").type = "text";
                document.getElementById("icon").style.display = "inline";
                document.getElementById("img").type = "file";
                document.getElementById("butt").innerText = "PUT";
                break;
            }
        }
    }
);