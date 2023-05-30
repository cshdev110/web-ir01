// ********************* Variables *********************
const containerSlideHeader = document.querySelector('#container-slide-header');
const imgSlideHeader = document.querySelectorAll('.img-slide-header');
const btnSlideLeftHeader = document.querySelector('#btn-slide-left-header');
const btnSlideRightHeader = document.querySelector('#btn-slide-right-header');

// slide header vars
let slideHeader = 0;
// ********************* End Variables *********************


// ********************* Functions *********************
// Slide Header
function showSlideHeader(slide_number, slide_side = 'right'){
    console.log(slide_number);
    imgSlideHeader.forEach((img, index) => {
        if(slide_side === 'right' && (slide_number - 1) == index){
            img.classList.remove('show-img-slide-header');
            img.classList.add('hide-right-img-slide-header');
        }else if(slide_side === 'left' && (slide_number + 1) == index){
            img.classList.remove('show-img-slide-header');
            img.classList.add('hide-left-img-slide-header');
        }

        if(slide_side === 'left' && index == slide_number){
            img.classList.remove('hide-right-img-slide-header');
            img.classList.add('show-img-slide-header');
        }else if(slide_side === 'right' && index == slide_number){
            img.classList.remove('hide-left-img-slide-header');
            img.classList.add('show-img-slide-header');
        }
    });
}

function resetSlideHeader(left_or_right = '', delay = 1500){
    imgSlideHeader.forEach((img, index) => {
        img.style.transition = 'none';
        img.classList.remove('show-img-slide-header');
        if(left_or_right === 'right'){
            img.classList.remove('hide-right-img-slide-header');
            img.classList.add('hide-left-img-slide-header');
        }
        else if(left_or_right === 'left'){
            img.classList.remove('hide-left-img-slide-header');
            img.classList.add('hide-right-img-slide-header');
        }
    });
    return new Promise(resolve => 
        setTimeout(() => {
            imgSlideHeader.forEach(img => {
                img.style.transition = '';
            });
        }, delay)
    );
}

// End Slide Header
// ********************* End Functions *********************

// ********************* Events *********************
// Slide Header
btnSlideLeftHeader.addEventListener('click', () => {
    slideHeader--;
    if(slideHeader < 0){
        slideHeader = imgSlideHeader.length - 1;
        imgSlideHeader.forEach((img, index) => {
            resetSlideHeader('left');
        });
    }
    showSlideHeader(slideHeader, 'left');
});

btnSlideRightHeader.addEventListener('click', async () => {
    slideHeader++;
    if(slideHeader > imgSlideHeader.length - 1){
        slideHeader = 0;
        await resetSlideHeader('right', 500);
    }
    showSlideHeader(slideHeader, 'right');
});

// End Slide Header
// ********************* End Events *********************

// ********************* Main *********************
imgSlideHeader.forEach(img => {
    img.classList.add('hide-left-img-slide-header');    
});
showSlideHeader(slideHeader);

// ********************* End Main *********************
