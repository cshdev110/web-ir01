// importing classes
import { ClientInformation } from "./client_information.js";
import { menu as db } from "./db.js";

// ********************* Variables *********************
// nav vars
const currentPage = window.location.href;
const nav = document.querySelector('nav');
const navListsUrl = document.querySelectorAll('nav li a');
const navLists = document.querySelectorAll('nav li');

// slide header vars
const containerSlideHeader = document.querySelector('#container-slide-header');
const imgSlideHeader = document.querySelectorAll('.img-slide-header');
const btnSlideLeftHeader = document.querySelector('#btn-slide-left-header');
const btnSlideRightHeader = document.querySelector('#btn-slide-right-header');
let slideHeader = 0;

// nav vars
const menuResponsive = document.querySelector('#evnt-menu-responsive');
const containerMenuResponsive = document.querySelector('#container-elems-nav');
const subMenuDropdown = document.querySelector('#dropdown-sub-menu');
const subMenuDropdownContent = document.querySelector('#sub-menu');

// section 2 vars
const lunch_plates = document.querySelectorAll('.lunch-plates img');

// section 4 vars
const dinner_plates = document.querySelectorAll('.dinner-plates img');

// section 5 vars
const takeAway_bookings = document.querySelectorAll('.container-take-away-booking img');

// take away vars
// modal vars
const modal = document.querySelector('#modal-sign-up');
// active client
let activeClientName = null;

// ********************* End Variables *********************


// ********************* Functions *********************
// start the app
function startApp(){
    showSlideHeader(slideHeader);
    checkUserLoggedIn();

    // highlight the current page in the nav bar
    navListsUrl.forEach((elem) => {
        if(elem.href == currentPage.split('#')[0]){
            navLists.forEach((li) => {
                if(li.contains(elem)){
                    li.style.backgroundColor = '#1A0004';
                }
            });
        }
    });
    
    // client information is placed back into the fields, if there ara any and the user is logged in
    try{
        if(currentPage.indexOf('take_away.html') !== -1){
            const clientData = JSON.parse(localStorage.getItem(activeClientName));
            Object.entries(clientData.order.food).forEach(([key, value]) => {
                const selector = document.querySelector(`#${key}`);
                selector.value = (value['type'] !== '') ? value['type'] : -1;
                updateOrder(selector);
            });
        }
    }catch(e){
        console.log(e);
    }
}

// check if the user is logged in, if yes, add a div with the name of the user and a logout button
function checkUserLoggedIn(){
    if(localStorage.getItem('activeClient') != null){
        activeClientName = localStorage.getItem('activeClient');
        // console.log(activeClientName);
        const divUserLoggedIn = document.createElement('div');
        divUserLoggedIn.setAttribute('id', 'div-user-logged-in');
        divUserLoggedIn.innerHTML = `
            <p id="p-user-logged-in">${activeClientName}</p>
            <button id="btn-logout">Logout</button>
        `;
        nav.appendChild(divUserLoggedIn);
        // event listener to the logout button
        const btnLogout = document.querySelector('#btn-logout');
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('activeClient');
            window.location.reload();
        });
        try{
            document.querySelector('#sign-in-up-take-away-form').style.display = 'none';
            document.querySelector('#taking-order').style.display = 'flex';
            document.querySelector('#name-active-client').textContent = 
                                                `Client: ${activeClientName} - 
                                                Phone: ${JSON.parse(localStorage.getItem(activeClientName)).phone}`;
        }catch(e){}
    }
}


// Slide Header
function showSlideHeader(slide_number, slide_side = 'right'){    
    imgSlideHeader.forEach((img, index) => {
        if(slide_number == index){
            img.style.visibility = 'visible';
            img.style.left = '0%';
        }
        if(slide_number - 1 == index || (slide_number - 1 < 0 && index == imgSlideHeader.length - 1)){
            img.style.visibility = 'hidden';
            img.style.left = '100%';
        }else if(slide_number + 1 == index || (slide_number + 1 > imgSlideHeader.length - 1 && index == 0)){
            img.style.visibility = 'hidden';
            img.style.left = '-100%';
        }
    });
}

// menu responsive
function showMenuResponsive(){
    if(window.getComputedStyle(containerMenuResponsive, null).display == 'none'){
        containerMenuResponsive.style.display = 'flex';
    }else{
        containerMenuResponsive.style.display = '';
    }
}

// update the order on every change on select elements or on load page
function updateOrder(target, updateData = false){
    if(target.value != -1){
        const clientData = JSON.parse(localStorage.getItem(activeClientName));
        const description = db[target.id][target.value].description;
        const price = db[target.id][target.value].price;

        if(clientData.order.active){
            document.querySelector('#date-order-active-client').textContent = `Ordered on: ${clientData.order.date.split('T')[0]}`; 
            document.querySelector('#submit-take-away-order-form').textContent = 'Order Again';
            document.querySelector('#reset-take-away-order-form').textContent = 'New';
        }

        try{
            document.querySelector(`#description-food-${target.id}`).remove();
            document.querySelector(`#price-food-${target.id}`).remove();
        }catch(err){}

        const descriptionElement = document.createElement('p');
        const priceElement = document.createElement('p');

        descriptionElement.setAttribute('id', `description-food-${target.id}`);
        priceElement.setAttribute('id', `price-food-${target.id}`);
        descriptionElement.setAttribute('class', `info-food-class`);
        priceElement.setAttribute('class', `info-food-class`);

        // formating the price to show it in AUD currency
        descriptionElement.textContent = description;
        priceElement.textContent = price.toLocaleString("en-US", {style: "currency", currency: "AUD"});;

        target.insertAdjacentElement('afterend', priceElement);
        target.insertAdjacentElement('afterend', descriptionElement);
        
        if(updateData){
            clientData.order.food[target.id]['type'] = target.value;
            clientData.order.food[target.id]['price'] = price;
        }
        // total price
        let totalPrice = 0;
        Object.entries(clientData.order.food).forEach(([key, value]) => {
            totalPrice += value['price'];
        });
        
        document.querySelector('#total-active-client').textContent = totalPrice.toLocaleString("en-US", {style: "currency", currency: "AUD"});
        if(updateData){
            clientData.order.total = totalPrice;
            localStorage.setItem(activeClientName, JSON.stringify(clientData));
        }
    }else{
        const clientData = JSON.parse(localStorage.getItem(activeClientName));
        if(updateData){
            
            clientData.order.food[target.id]['type'] = (target.value == -1) ? '' : target.value;
            clientData.order.food[target.id]['price'] = 0;
            localStorage.setItem(activeClientName, JSON.stringify(clientData));
        }
        // total price
        let totalPrice = 0;
        Object.entries(clientData.order.food).forEach(([key, value]) => {
            totalPrice += value['price'];
        });
        document.querySelector('#total-active-client').textContent = totalPrice.toLocaleString("en-US", {style: "currency", currency: "AUD"});
        
        try{
            document.querySelector(`#description-food-${target.id}`).remove();
            document.querySelector(`#price-food-${target.id}`).remove();
        }catch(err){}
    }
}

// Add required attribute to the inputs
function fn_add_required_attribute(elem) {
    elem.target.setAttribute('required', '');
}
window.fn_add_required_attribute = fn_add_required_attribute;

// Error general messages
function fn_error_message(elem, message){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `* ${message}`;
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.fontWeight = '800';
    elem.appendChild(errorMessage);
    // remove the message after 3 seconds
    setTimeout(() => {
        errorMessage.remove();
    }
    , 3000);
}

// ********************* End Functions *********************

// ********************* Events *********************

// nav events when the nav tag reaches the top of the page when scrolling
window.addEventListener('scroll', () => {
    if(nav.getBoundingClientRect().top <= 0){
        nav.style.backgroundColor = '#56000CD0';
    }else{
        nav.style.backgroundColor = '';
    }
});

// Slide Header - buttons
btnSlideLeftHeader.addEventListener('click', () => {
    slideHeader--;
    if(slideHeader < 0){
        slideHeader = imgSlideHeader.length - 1;
        imgSlideHeader.forEach((img, index) => {
        });
    }
    showSlideHeader(slideHeader, 'left');
});

btnSlideRightHeader.addEventListener('click', async () => {
    slideHeader++;
    if(slideHeader > imgSlideHeader.length - 1){
        slideHeader = 0;
    }
    showSlideHeader(slideHeader, 'right');
});

// menu responsive events
menuResponsive.addEventListener('click', () => {
    showMenuResponsive();

});

// sub menu dropdown. It adds the classes on the css file to show the sub menu for different screen sizes
// when the screen is less than 768px or over. 
// Ending removing the classes when the user clicks outside the sub menu to reset the styles
document.addEventListener('click', (evt) => {
    // to hide sub-menu
    if(subMenuDropdown.contains(evt.target)){
        subMenuDropdown.classList.toggle('parent-sub-menu-to-dropdown');
        if(window.innerWidth <= 768){
            subMenuDropdownContent.classList.toggle('active-sub-menu-media-screen');
        }else{
            subMenuDropdownContent.classList.toggle('active-sub-menu');
        }
    }else{
        subMenuDropdown.classList.remove('parent-sub-menu-to-dropdown');
        subMenuDropdownContent.classList.remove('active-sub-menu');
        subMenuDropdownContent.classList.remove('active-sub-menu-media-screen');
    }
});

// section 2 events - send to lunch menu page
lunch_plates.forEach((plate) => {
    plate.addEventListener('click', () => {
        window.location.href = 'pages/lunch_menu.html';
    });
});

// section 4 events - send to dinner menu page
dinner_plates.forEach((plate) => {
    plate.addEventListener('click', () => {
        window.location.href = 'pages/dinner_menu.html';
    });
});

// section 5 events - send to take away and booking page
takeAway_bookings.forEach((elem, indx) => {
    if(indx == 0){
        elem.addEventListener('click', () => {
            window.location.href = 'pages/take_away.html';
        });
    }else{
        elem.addEventListener('click', () => {
            window.location.href = 'pages/booking.html';
        });
    }
});

// Filfering name. Only letters, dots and spaces are allowed
document.querySelectorAll('.required-info-name').forEach((elem) => {
        elem.addEventListener('keyup', (evt) => {
        evt.target.value = /(?:[a-zA-Z.\s]+)/.exec(evt.target.value);
    });
});

// Filtering the phone number
document.querySelectorAll('.required-info-phone').forEach((elem) => {
    elem.addEventListener('keyup', (evt) => {
        evt.target.value = /(?:^[0-9]{0,4}[-]{0,1}[0-9]{0,3}[-]{0,1}[0-9]{0,3}$)/g.exec(evt.target.value);
        evt.target.value = evt.target.value.replace(/-/g, '');
        for (let i = 0; i < evt.target.value.length; i++) {
            if (i === 4) {
                evt.target.value = evt.target.value.slice(0, 4) + '-' + evt.target.value.slice(4);
            }    
            else if (i === 8) {
                evt.target.value = evt.target.value.slice(0, 8) + '-' + evt.target.value.slice(8);
            }
        }
    });
});

// Filtering the email
try{
    document.querySelector('.required-info-email').addEventListener('keyup', (evt) => {
        evt.target.value = /(?:^[a-zA-Z0-9._-]*[@]{0,1}[a-zA-Z0-9.-]*[\.]{0,1}[a-zA-Z]{0,4})/g.exec(evt.target.value);
    });
}catch(err){}


// Inside the try and catch are the events for the take away page
try{
    // show modal element to sign up
    document.querySelector('#show-sign-up-take-away-form').addEventListener('click', () => {
        modal.style.display = 'flex';
    });


    // hide modal element to sign up
    document.querySelector('#hide-sign-up-take-away-form').addEventListener('click', () => {
        modal.style.display = '';
    });

    // Sign in
    document.querySelector('#sign-in-up-take-away-form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        activeClientName = document.querySelector('#name-sign-in-take-away').value;
        const password = document.querySelector('#password-sign-in-take-away').value;
        const client = JSON.parse(localStorage.getItem(activeClientName));
        if(client && client.password == password){
            localStorage.setItem("activeClient", activeClientName);
            modal.style.display = '';
            checkUserLoggedIn();
            window.location.href = 'take_away.html';
        }else{             
            // messages on the bottom of the form to let the user know 
            // that the name or password are wrong
            fn_error_message(document.querySelector('#sign-in-up-take-away-form'), "Wrong name or password");
            // const wrongNameOrPassword = document.createElement('p');
            // wrongNameOrPassword.textContent = '* Wrong name or password';
            // wrongNameOrPassword.style.color = 'red';
            // wrongNameOrPassword.style.textAlign = 'center';
            // wrongNameOrPassword.style.marginTop = '10px';
            // wrongNameOrPassword.style.fontWeight = '800';
            // document.querySelector('#sign-in-up-take-away-form').appendChild(wrongNameOrPassword);
            // // remove the message after 3 seconds
            // setTimeout(() => {
            //     wrongNameOrPassword.remove();
            // }
            // , 3000);
        }
    });

    // Create new user and store it in the local storage
    document.querySelector('#sign-up-take-away-form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        activeClientName = document.querySelector('#name-sign-up-take-away').value;
        const phone = document.querySelector('#phone-sign-up-take-away').value;
        const password = document.querySelector('#password-sign-up-take-away').value;

        const client = new ClientInformation(activeClientName, phone, password);
        localStorage.setItem(activeClientName, JSON.stringify(client));
        localStorage.setItem("activeClient", activeClientName);
        modal.style.display = '';
        checkUserLoggedIn();
        window.location.href = 'take_away.html';
    });

    // selecting the food and dynamic information
    document.querySelectorAll('#taking-order select').forEach((select) => {
        select.addEventListener('change', (evt) => {
            updateOrder(evt.target, true);
        });
    });

    // submit the order and thank the user
    document.querySelector('#taking-order').addEventListener('submit', (evt) => {
        evt.preventDefault();
        const clientData = JSON.parse(localStorage.getItem(activeClientName));
        console.log(clientData.order.total);
        if(clientData.order.total > 0){
            const confirmOrder = confirm('Are you sure you want to place this order?');
            if(confirmOrder){
                
                clientData.order.date = new Date();
                
                // show modal to thank the user for the order
                document.querySelector('#date-order-active-client').textContent = 'Ordered on: ' + clientData.order.date.toLocaleDateString();
                const thanksForOrdered = document.createElement('div');
                thanksForOrdered.classList.add('thanks-for-ordered-booking');
                if(!clientData.order.active){
                    thanksForOrdered.innerHTML = `<p>Thanks for your order! ${activeClientName} &#10024;</p>`;
                }else if(clientData.order.active){
                    thanksForOrdered.innerHTML = `<p>Thanks for your order once again! ${activeClientName} &#10024;</p>`;                
                }
                document.querySelector('#taking-order').appendChild(thanksForOrdered);

                clientData.order.active = true;
                localStorage.setItem(activeClientName, JSON.stringify(clientData));

                // remove the message after 3 seconds
                setTimeout(() => {
                    thanksForOrdered.remove();
                    window.location.href = 'take_away.html';
                }
                , 3000);
            }
        }else {
            // // messages on the bottom of the form take away to let the user know 
            // // that needs to select at least one item
            fn_error_message(document.querySelector('#taking-order'), "Select at least one item");
        }
    });

    // clean user data
    document.querySelector('#reset-take-away-order-form').addEventListener('click', () => {
        const confirmReset = confirm('Are you sure you want to reset the order?');
        if(confirmReset){
            const clientData = JSON.parse(localStorage.getItem(activeClientName));
            const resetClient = new ClientInformation(activeClientName, clientData.phone, clientData.password);
            localStorage.setItem(activeClientName, JSON.stringify(resetClient)); 
            window.location.href = 'take_away.html';
        }
    });

}catch(err){console.log(err);}

try{
    // booking page events
    document.querySelector('#form-bookings').addEventListener('submit', (evt) => {
        evt.preventDefault();
        let issues = false;

        const timeElm = document.querySelector('#time-for-meal-bookings');
        const time = timeElm.value;
        const timeArray = time.split(':');
        const hour = timeArray[0];
        const minutes = timeArray[1];
        console.log(hour, minutes);
        if((hour < 11) || (hour == 11 && minutes <= 29) || (hour > 14 && hour < 17) || (hour >= 21)){
            fn_error_message(document.querySelector('#form-bookings'), "We are open between 11:30 am - 2:30 pm and 5:00 pm - 9:30 pm");
            timeElm.value = '';
            timeElm.focus();
            issues = true;
        }

        document.querySelectorAll('.dates-bookings').forEach((date, idx) => {
            let current_date = new Date();
            let input_date = new Date(date.value);
            
            // Must be greater than the current date
            if (current_date >= input_date) {
                fn_error_message(document.querySelector('#form-bookings'), `Date ${idx + 1} cannot be before the current date`); 
                date.value = '';
                date.focus();
                issues = true;
            }
        });
        if(!issues){
            const confirmBooking = confirm('Are you sure you want to book this table?');
            if(confirmBooking){
                const thankForBooking = document.createElement('div');
                thankForBooking.classList.add('thanks-for-ordered-booking');
                if(activeClientName == null){
                    thankForBooking.innerHTML = `<p>Thanks for your booking! &#10024;</p>`;
                }else{
                    thankForBooking.innerHTML = `<p>Thanks for your booking! ${activeClientName} &#10024;</p>`;
                }
                document.querySelector('#section-1-bookings').appendChild(thankForBooking);

                // remove the message after 3 seconds
                setTimeout(() => {
                    thankForBooking.remove();
                    window.location.href = 'booking.html';
                }
                , 3000);
            }
        }
    });
}catch(err){}

// Gallery
// installations
try{
    Array.from(document.querySelector('#container-img-instaltion-gallery').children).forEach(img => {
        img.addEventListener('click', (evt) => {
            evt.target.classList.toggle('modal-img');
        });
    });
}catch(err){}
// food
try{
    Array.from(document.querySelector('#container-img-food-gallery').children).forEach(img => {
        img.addEventListener('click', (evt) => {
            evt.target.classList.toggle('modal-img');
        });
    });
}catch(err){}

// ********************* End Events *********************

// ********************* Main *********************

startApp();

// ********************* End Main *********************
