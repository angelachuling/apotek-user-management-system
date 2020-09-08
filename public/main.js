let users = [];
console.log(users);
let checkID = false;


//check login
function loginDetailSubmit(userName, password,event) {
    
    event.preventDefault();

    //export data from localStorage and covert it to JS array
    let existingDataJS = JSON.parse(localStorage.getItem('apotekUsers'));
    console.table(existingDataJS);

    existingDataJS.find(checkSignIn);

    function checkSignIn(item) {
        console.log(userName, password);
        console.log(item);
        if (item.userName === email && item.password === password) {
            checkID = true;
            console.log(checkID);
            window.location.href = "/product";
        }
    }

    console.log(checkID);

    if (checkID == false){
        alert("Log in failed! Pls try again.");
    }
}



//new user sign up
function registerUser(firstName, lastName, userName, password, event){
    //firstName.value, lastName.value, userName.value, pswd.value,
    
    event.preventDefault();

    console.log("first check");
    if (firstName, lastName, userName, password) {

            //export data from localStorage and covert it to JS array. 
            let existingDataJS = JSON.parse(localStorage.getItem('apotekUsers'));

            if (existingDataJS == null){
                existingDataJS = [];
            }
            
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: password
            };
            console.log("second check" + newUser);
            existingDataJS.push(newUser);
            
            //save new user data in localstorage
            localStorage.setItem('TshirtShopUsers', JSON.stringify(existingDataJS));

            console.log("new user input done")

            window.location.href = "/product";

    } else {
        alert("Pls complete all the fields when submit.")
    }
}
