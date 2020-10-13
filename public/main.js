
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
                    favoriteList.splice(index, 1);
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

}
//display items in fav cart
function checkFavF() {
    favContainer.innerHTML = '';
    for (let i = 0; i < favoriteList.length; i++) {
        favContainer.innerHTML += `<a class="dropdown-item" href="#">${favoriteList[i]}</a>`;
    }
}
let products;
$("#btnProduct").click(function () {
    $.get("/productAjax", function (data, status) {
        let dataJson = JSON.stringify(data)
        console.log(dataJson)
        products = JSON.parse(dataJson)
        console.log(products)
        products.forEach(item => {
            console.log(item)
            $('#tBody').append(`<tr class="text-lg text-bolder text-info text-uppercase" id="${item.id}">
                                                   <td class="row-data"> ${item._id}</td>
                                                   <td class="row-data"> ${item.id}</td>
                                                   <td class="row-data"> ${item.proName}</td>
                                                    <td class="row-data"> ${item.quantity}</td>
                                                    <td class="row-data"> ${item.description}</td>
                                                   <td class="row-data"> ${item.retailPrice} €</td>
                                                     <td class="row-data"> ${item.purchasePrice}€</td>
                                                   <td class="row-data"> ${item.percentage_discount}%</td>
                                                  <td><img src="${item.src}" alt="product-image" id="adminPageImage" class="w-20">
                                                            </td>
                                               <td class="d-blick justify-content-center">
                                                <a href="/update/${item._id}" class="btn btn-outline-info" id="myButton">
                                                                    Edit </a>
                                                <i style="font-size: larger;" class="fas fa-trash-alt float-left text-danger"></i>
                                                                <a href="/delete/${item._id}" class="btn btn-outline-danger">Del</a>
                                                            </td>
                                            </tr> `)
        })
    })
})

$("#btnUser").click(function () {
    $.ajax({
        url: '/userAjax',
        method: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            // $('#tBody').html(data)
            data.forEach(user => {
                $('#tBody2').append(`<tr class="text-lg text-bolder text-info text-uppercase" id="${user._id}">
                <td class="row-data"> ${user._id}</td>
                <td class="row-data"> ${user.uFname}</td>
                <td class="row-data"> ${user.uSname}</td>
                <td class="row-data"> ${user.email}</td>
                <td class="row-data"> ${user.pswd}</td>
                <td class="row-data"> ${user.role}</td>
                <td class="row-data"> ${user.remember}</td>
                <td><img src="${user.imagePath}" alt="user-image" id="adminPageImage" class="w-25"
                        style="height:70px;">
                </td>
                <td class="d-blick justify-content-center">
    
                    <a href="/updateUser/${user._id}" class="btn btn-outline-info" id="myButton">
                        Edit </a>
                    <a href="/deleteUser/${user._id}" class="btn btn-outline-danger">Del</a>
                </td>
            </tr>`)
            });

         }
     })
})

