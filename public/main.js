
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
    
}
//display items in fav cart
function checkFavF() {
    favContainer.innerHTML = '';
    for (let i = 0; i < favoriteList.length; i++) {
        favContainer.innerHTML += `<a class="dropdown-item" href="#">${favoriteList[i]}</a>`;
    }
}
// function for switching create new product form and updat product form
function editFunc(){
    document.getElementById('productForm').innerHTML=`<form class="form-horizontal" action="/master-product" method="DEL" id="productForm">
    <fieldset>
  
      <!-- Form Name -->
      <legend>PRODUCTS</legend>
      <div class="row">
        <!-- Text input-->
        <div class="form-group  col-md-3 ">
          <div class="row">
            <label class="col-md-12 control-label" for="id">PRODUCT ID</label>
            <div class="col-md-12">
              <input id="product_id" name="id" placeholder="PRODUCT ID" class="form-control input-md" required=""
                type="text">
            </div>
          </div>
        </div>
        <!-- Text input-->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="proName">PRODUCT NAME</label>
            <div class="col-md-12">
              <input id="product_name" name="proName" placeholder="PRODUCT NAME" class="form-control input-md" required=""
                type="text">
            </div>
          </div>
        </div>
        <!-- Text input-->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="quantity">QUANTITY</label>
            <div class="col-md-12">
              <input id="available_quantity" name="quantity" placeholder="AVAILABLE QUANTITY"
                class="form-control input-md" required="" type="text">
  
            </div>
          </div>
        </div>
  
        <!-- Textarea -->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="description">PRODUCT DESCRIPTION</label>
            <div class="col-md-12">
              <textarea class="form-control" id="product_description" name="description"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Text input-->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="retailPrice">Retail Price </label>
            <div class="col-md-12">
              <input id="percentage_discount" name="retailPrice" placeholder="Retail Price" class="form-control input-md"
                required="" type="text">
            </div>
          </div>
        </div>
        <!-- Text input-->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="purchasePrice">Purchase Price</label>
            <div class="col-md-12">
              <input id="percentage_discount" name="purchasePrice" placeholder="Purchase Price"
                class="form-control input-md" required="" type="text">
            </div>
          </div>
        </div>
        <!-- Text input-->
        <div class="form-group col-md-3">
          <div class="row">
            <label class="col-md-12 control-label" for="percentage_discount">PERCENTAGE DISCOUNT</label>
            <div class="col-md-12">
              <input id="percentage_discount" name="percentage_discount" placeholder="PERCENTAGE DISCOUNT"
                class="form-control input-md" required="" type="text">
  
            </div>
          </div>
        </div>
        <!-- File Button -->
        <div class="form-group col-md-3 ">
          <label class="col-md-12 control-label" for="src">Image</label>
          <div class="col-md-12">
            <input id="filebutton" name="src" class="input-file" type="text">
          </div>
        </div>
      </div>
      <!-- File Button -->
      <!-- Button -->
      <div class="form-group">
        <div class="col-md-4">
          <button id="singlebutton" name="singlebutton" class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
  
    </fieldset>
  </form>`
}
function delFunc(id){}

