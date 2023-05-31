// ********************* Variables *********************
// nav vars
const nav = document.querySelector('nav');

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
// ********************* End Variables *********************


// ********************* Functions *********************

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
    console.log(window.getComputedStyle(containerMenuResponsive, null).display);
    if(window.getComputedStyle(containerMenuResponsive, null).display == 'none'){
        containerMenuResponsive.style.display = 'flex';
    }else{
        containerMenuResponsive.style.display = '';
    }
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



// ********************* End Events *********************

// ********************* Main *********************

showSlideHeader(slideHeader);

// ********************* End Main *********************
