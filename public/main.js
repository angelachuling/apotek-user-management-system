// let users = [];
// console.log(users);
// let checkID = false;


//check login
// function loginDetailSubmit(userName, password,event) {

//     event.preventDefault();

//     //export data from localStorage and covert it to JS array
//     let existingDataJS = JSON.parse(localStorage.getItem('apotekUsers'));
//     console.table(existingDataJS);

//     existingDataJS.find(checkSignIn);

//     function checkSignIn(item) {
//         console.log(userName, password);
//         console.log(item);
//         if (item.userName === email && item.password === password) {
//             checkID = true;
//             console.log(checkID);
//             window.location.href = "/product";
//         }
//     }

//     console.log(checkID);

//     if (checkID == false){
//         alert("Log in failed! Pls try again.");
//     }
// }
// //new user sign up
// function registerUser(firstName, lastName, userName, password, event){
//     firstName.value, lastName.value, userName.value, pswd.value,

//     event.preventDefault();

//     console.log("first check");
//     if (firstName, lastName, userName, password) {

//             //export data from localStorage and covert it to JS array. 
//             //let existingDataJS = JSON.parse(localStorage.getItem('apotekUsers'));

//             if (existingDataJS == null){
//                 existingDataJS = [];
//             }

//             let newUser = {
//                 firstName: firstName,
//                 lastName: lastName,
//                 userName: userName,
//                 password: password
//             };
//             console.log("second check" + newUser);
//             existingDataJS.push(newUser);

//             //save new user data in localstorage
//             localStorage.setItem('apotekUsers', JSON.stringify(existingDataJS));

//             console.log("new user input done")

//             window.location.href = "/product";

//     } else {
//         alert("Pls complete all the fields when submit.")
//     }
// }


//creat an array that holds selected items
//calculate and display total order quantity
let orderList = [];
let num = 0, x = false;
function orderButton(orderItem, qty) {
    if (qty > 0) {
        num++;
        console.log(orderItem);

        for (let i = 0; i < orderList.length; i++) {
            if (orderList[i].orderItem == orderItem) {
                x = true;
                orderList[i].qty = Number(orderList[i].qty) + Number(qty)
            }
        }
        console.log(x);
        if (x == false) {
            orderList.push({ orderItem, qty });
        }
        document.getElementById("cartCount").innerHTML = num;

    }
    else alert('The minimum Quantity should be 1')

}
//cart 
//display items in shopping cart

function checkCartF() {
    console.log(orderList)
    cartContainer.innerHTML = '';
    for (let i = 0; i < orderList.length; i++) {
        cartContainer.innerHTML += `<div class="dropdown-item" href="#">${orderList[i].qty} ${orderList[i].orderItem}  </div>`;
    }
}
//favorite items

let favoriteList = [];
let favTotal = 0;
let heartColor = 'red';
function addFavorite(id, title) {
    for (let i = 0; i < favoriteList.length; i++) {
        if (favoriteList[i] == title) {
            heartColor = 'white';
            document.getElementById(`favoriteButton_${id}`).style.color = "rgb(128 128 128) ";
            favoriteList.map((item, index) => {
                if (item == title) {
                    favoriteList.splice(index,1);  
                }
            })

            favTotal = favoriteList.length;
            document.getElementById("favoriteCount").innerHTML = favTotal;
        }
    }
    if (heartColor == 'red') {
        document.getElementById(`favoriteButton_${id}`).style.color = "red";
        heartColor = 'red';
        favoriteList.push(title);
        favTotal = favoriteList.length;
        document.getElementById("favoriteCount").innerHTML = favTotal;
    }
    console.log(favoriteList)
    // if(heartColor == 'red'){
    //     heartColor = 'white';
    //     favoriteList.map((item,index)=>{
    //         if(item==title){
    //             favoriteList.slice(index);
    //         }
    //     })

    //     favTotal = favoriteList.length;
    //     document.getElementById("favoriteCount").innerHTML = favTotal;
    //     console.log(favTotal)

    //}
}
//display items in fav cart
function checkFavF() {
    favContainer.innerHTML = '';
    for (let i = 0; i < favoriteList.length; i++) {
        favContainer.innerHTML += `<a class="dropdown-item" href="#">${favoriteList[i]}</a>`;
    }
}

