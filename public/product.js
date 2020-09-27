// function for switching create new product form and updat product form
function editFunc(){
    document.getElementById('productForm').innerHTML= `<form class="form-horizontal" action="/master-product" method="PATCH" id="productForm">
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
          <button id="singlebutton" name="singlebutton" class="btn btn-primary" type="submit" onclick="submitProd(id.value, proName.value, quantity.value, description.value, retailPrice.value, purchasePrice.value, percentage_discount.value)">Submit</button>
        </div>
      </div>
  
    </fieldset>
  </form>`;
}


function delFunc(id){

  document.getElementById('createdProductCard').innerHTML = '';

}


function submitProd() {
let id = document.getElementById('id').value;
let proName = document.getElementById('proName').value;
let quantity = document.getElementById('quantity').value;
let description = document.getElementById('description').value;
let retailPrice = document.getElementById('retailPrice').value;
let purchasePrice = document.getElementById('purchasePrice').value;
let percentage_discount = document.getElementById('percentage_discount').value;

  console.log('Hello');
  document.getElementById('createdProductCard').innerHTML = `
  <form action="/master-product" method="DEL">
  <div class="container m-auto">
    <div class="card col-md-4 p-5 mb-3">
      <img src={{src}} class="card-img-top" alt="...">
      <div class="card-body">
         <h5 class="card-title" id="id" name="id" >${id}</h5>
        <h5 class="card-title" >${proName}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text">${quantity}</p>
        <p class="card-text">${retailPrice}</p>
        <p class="card-text">${purchasePrice}</p>
        <p class="card-text">${percentage_discount}</p>
      </div>
      <button type="button" onclick="editFunc()">Edit</button>
      <button type="submit" onclick="delFunc({{id}})">Delete</button>
    </div>
  </div>
  </form>
  `;
}
