const HOLIDAYS_DOM = {
    holiday_name: document.getElementById("inputHolidayName"),
    holiday_image: document.getElementById("inputHolidayImage"),
    holiday_price: document.getElementById("inputPrice"),
    holiday_rate: document.getElementById("inputRate"),
    holidays_data: document.getElementById("Card")
}

let arrayOfData;

function draw(arrayOfData) {
    clearCard()
    for (let index = 0; index < arrayOfData.length; index++) {
        drawLi(arrayOfData[index]);
    }
}

function clearCard() {
    HOLIDAYS_DOM.holidays_data.innerHTML = "";
}

function drawLi(holiday) {
    const { holidays_data } = HOLIDAYS_DOM;
    const holidayUL = createHoliday(holiday);
    if (!holidayUL) return;
    holidays_data.append(holidayUL);
}

function deleteHoliday(id) {
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1);
    saveToLocalStorage("holidaysData", arrayOfData)
    draw(arrayOfData);
}

function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].holiday_name === id) {
            return index;
        }
    }
}

function createHoliday(holiday) { 
    const { holiday_name, holiday_image, holiday_price, holiday_rate } = holiday;
    if (!holiday_name || !holiday_image || !holiday_price || !holiday_rate) return;

    const divElement = document.createElement("div");
    const ul = document.createElement("ul");
    
    divElement.appendChild(ul);
    divElement.className = "col-lg-2 mb-4"
    divElement.style = "font-size: 0.8em";
    
    ul.className = "card list-group list-group-flush";
    ul.id = holiday_name;
    
    Card.className = "row mt-5";

    const deleteButton = document.createElement("Button")
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger button-no-paddind";
    deleteButton.addEventListener("click", deleteHolidayHandler);

    // const likeButton = document.createElement("Button");
    // likeButton.innerHTML = "Like"; 
    // likeButton.className = "btn btn-primary button-no-paddind"; 
    // // likeButton.addEventListener("click", counterLikes);  

    const likeButton = document.createElement("Button");
    likeButton.innerHTML = '<img height="35" width="60" src=like.jpg>'; 
    likeButton.className = "btn button-no-paddind"; 
    //likeButton.addEventListener("click", counterLikes);  
       
    const image = document.createElement("img");
    image.src = holiday.holiday_image;
    image.alt = "picture"
    image.className = "card-img-top";
    image.style = "width: 200px height: 150px"

    const li_holiday_name = document.createElement("li");
    li_holiday_name.innerText = holiday_name;
    li_holiday_name.className = "list-group-item font-weight-bold";
    li_holiday_name.style = "font-size:1.2em cards-padding";

    const li_holiday_image = document.createElement("li");
    li_holiday_image.append(image);
    li_holiday_image.className = "list-group-item cards-padding";

    const li_holiday_price = document.createElement("li");
    li_holiday_price.innerText = "Price: " + holiday_price;
    li_holiday_price.className = "list-group-item cards-padding";

    const li_holiday_rating = document.createElement("li");
    li_holiday_rating.innerText = "Rating" + holiday_rate;
    li_holiday_rating.className = "list-group-item cards-padding";

    const li_holiday_buttons = document.createElement("li"); 
    li_holiday_buttons.className = "list-group-item cards-padding";
    li_holiday_buttons.append(deleteButton, likeButton);

    ul.append(li_holiday_name, li_holiday_image, li_holiday_price, holiday_rate, li_holiday_buttons);

    return divElement;
}

function deleteHolidayHandler() {
    deleteHoliday(this.parentElement.parentElement.id);
}

function validateHolidayName(name) {
    return findIndex(arrayOfData, name);
}

document.querySelector("#sortButton").addEventListener("click", sortByPrice);

function sortByPrice() {
    arrayOfData.sort(function(a, b) { return a.holiday_price - b.holiday_price;});
    draw(arrayOfData); 
}

document.querySelector("#saveButton").addEventListener("click", saveHoliday);

function saveHoliday() {
    const { holiday_name, holiday_image, holiday_price, holiday_rate } = HOLIDAYS_DOM;

    const result = validateHolidayName(holiday_name.value);
    if (result !== undefined) {
        alert("Holiday Exist")
        return;
    }

    arrayOfData.push(new Holiday( holiday_name.value, holiday_image.value, holiday_price.value, holiday_rate.value))
    saveToLocalStorage("holidaysData", arrayOfData)
    draw(arrayOfData)


}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function Holiday( _name, _image, _price, _rate) {
    this.holiday_name = _name;
    this.holiday_image = _image;
    this.holiday_price = _price;
    this.holiday_rate = _rate;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("holidaysData")) || []
    draw(arrayOfData)
}
init();
