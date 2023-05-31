// ********************* Variables *********************
// slide header vars
const containerSlideHeader = document.querySelector('#container-slide-header');
const imgSlideHeader = document.querySelectorAll('.img-slide-header');
const btnSlideLeftHeader = document.querySelector('#btn-slide-left-header');
const btnSlideRightHeader = document.querySelector('#btn-slide-right-header');
let slideHeader = 0;

// nav vars
// q: how can I do the responsive menu?


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

// End Slide Header
// ********************* End Functions *********************

// ********************* Events *********************
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

// End Slide Header
// ********************* End Events *********************

// ********************* Main *********************

showSlideHeader(slideHeader);

// ********************* End Main *********************
