
class ImageSlideshow extends HTMLElement {
  constructor() {
    super();

    // Extract attributes and convert them into an object
    const { autoplay, autoHeight, allowTouchMove, draggable, grabCursor, slidesPerView,  a11y, freeMode, pagination, navigation, loop, disableOn, spaceBetween, centeredSlides, breakpoints, numberPagination, effect, controlContainer, fadeOnLargeUp, hoverArrowNav} = this.attributes;
    
    this.mediaQueries = {
      mediumUp: window.matchMedia('(min-width: 700px)'),
      largeUp: window.matchMedia('(min-width: 940px)')
   }

    if(disableOn) {
      this.setUpMediaQueries(disableOn.value); 
      this.checkForMediaQueries = true; 
    }

   

   this.options = {
        autoplay: autoplay && autoplay.value === 'true' ? {
          enabled: true,
          delay: 0 
        } : false,
        autoHeight: autoHeight && autoHeight.value == 'true' || false,
        pagination:  pagination && pagination.value === 'true' ?  {
          el: '.swiper-pagination',
          type: 'bullets',
        } : false,
        navigation: navigation && navigation.value == 'true' ? 
          {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          } : false,
        preloadImages: true,
        freeMode: freeMode && freeMode.value === 'true' ? {
          enabled: true,
          sticky: false
        } : false, 
        resistance: false,
        loop: loop && loop.value == 'true' || false,
        speed: 200,
        draggable: draggable && draggable.value == 'true' || false, 
        effect: effect ? effect.value : 'slide',
        grabCursor: grabCursor ? grabCursor.value : true,
        spaceBetween: spaceBetween ? parseInt(spaceBetween.value) : 20,
        touchReleaseOnEdges: true,
        slidesPerView: slidesPerView ? slidesPerView.value : 1,
        centeredSlides: centeredSlides && centeredSlides.value === "true",
        breakpoints: breakpoints ? convertToObject(breakpoints.value) : false,
        centeredSlidesBounds: centeredSlides && centeredSlides.value === "true",
        controlContainer: controlContainer ? controlContainer.value : false,
        allowTouchMove: allowTouchMove && allowTouchMove.value == 'true' || true
    }


    if(fadeOnLargeUp && this.mediaQueries.mediumUp.matches || this.options.effect == 'fade') {
      this.options.effect = 'fade';
      this.options.fadeEffect = {
        crossFade: true
      }
    }


    if(numberPagination) {
      this.options.pagination = {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
        }
      }
    }

   
    function convertToObject(pStringObject) {
      const inputString = pStringObject;
      const jsonString = inputString.replace(/'/g, '"'); // Replace single quotes with double quotes
      const result = JSON.parse(jsonString);
      return result; 
    }



    this.init();
  }

  setUpMediaQueries(pDisableOn) {
    const mediaQueryList = this.mediaQueries[pDisableOn];
    this.disableOn = pDisableOn; 

    mediaQueryList.addEventListener("change", event => {
      if (event.matches) {
        this.destroySwiper();
        this.resetOriginalHtml(); 
      } else {
        this.initSwiper();
      }
    });
  } 

  init() {
      if(this.checkForMediaQueries && this.mediaQueries[this.disableOn].matches) {
        return
      } else {
          this.initSwiper();
      }
  } 

  resetOriginalHtml() {
    // Remove current children
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.originalChildren.forEach(child => this.appendChild(child.cloneNode(true)));
  }

  setUpHtml(pOptions) {

    // Save the original HTML content of children elements
    this.originalChildren = Array.from(this.children).map(child => child.cloneNode(true));

    this.innerHTML = `
      <style>

        .marquee-timing  {
            -webkit-transition-timing-function:linear!important;
            -o-transition-timing-function:linear!important;
            transition-timing-function:linear!important;
        }
    
        .swiper-container {
          width: 100%;
          position: relative; 
        }
        .swiper-slide {
        }

        .swiper-content {
          }
      </style>
      <div class="swiper swiper-container">
        <div class="swiper-wrapper ${pOptions.autoplay ? 'marquee-timing': ''}">
          ${Array.from(this.children)
            .map(child => `<div class="swiper-slide">${child.outerHTML}</div>`)
            .join('')}
        </div>
        ${pOptions.navigation ? `<div class="swiper-button-next">
          <svg  viewBox="0 0 91 38" xmlns="http://www.w3.org/2000/svg"><path d="M89.768 20.768a1.5 1.5 0 0 0 0-2.536L73.858 1.322a1.5 1.5 0 0 0-2.121 2.121L84.464 19 71.737 31.737a1.5 1.5 0 1 0 2.121 2.121L89.768 20.768zM0 21.5h88v-5H0v5z" fill="currentColor"/></svg></div>
        <div class="swiper-button-prev">
        <svg  viewBox="0 0 91 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.23223 20.7678C0.255921 19.7915 0.25592 18.2086 1.23223 17.2322L17.1421 1.32234C18.1184 0.346032 19.7014 0.346032 20.6777 1.32234C21.654 2.29865 21.654 3.88157 20.6777 4.85788L6.53554 19L20.6777 33.1421C21.654 34.1185 21.654 35.7014 20.6777 36.6777C19.7014 37.654 18.1184 37.654 17.1421 36.6777L1.23223 20.7678ZM91 21.5L3 21.5L3 16.5L91 16.5L91 21.5Z" fill="currentColor"/></svg></div>`:  ''}
        ${pOptions.pagination ? `<div class="swiper-pagination"></div>`:  ''}
      </div>
    `;

  }

  destroySwiper() {
    if (this.swiper) {
      this.innerHTML =  this.originalChildren; 
      this.swiper.detachEvents(); 
      this.swiper.destroy(true, true); 
      this.swiper = null; 
      this.swiper = null;
    }
  }

  initSwiper() {
    if (this.swiper) {
      return Promise.resolve(this.swiper); // Already initialized, resolve with the existing instance
    }
  
    return new Promise((resolve, reject) => {
      if (this.attributes.preventLoad && this.attributes.preventLoad.value === 'true') {
        return;
      }
  
      import('./swiper.module.js')
        .then((Swiper) => {
          if (this.options.controlContainer) {
            const controlElement = document.querySelector(this.options.controlContainer);
            controlElement.setAttribute('preventLoad', 'false');
            return controlElement.initSwiper().then(()=> {
              if (this.options.controlContainer) {
                this.options.controller = {
                  by: 'slide',
                  control: controlElement.getSwiper(),
                };
              }
              this.setUpHtml(this.options);
              this.swiper = new Swiper.default(this.querySelector('.swiper-container'), this.options);
              controlElement.getSwiper().controller.control = this.swiper; 
          
              // if(true) {
              //   this.initHoverArrowNav(); 
              // } 
            }); // Return the promise from initSwiper
          }
  
          this.setUpHtml(this.options);
          this.swiper = new Swiper.default(this.querySelector('.swiper-container'), this.options);

          const event = new CustomEvent('swiperLoaded', {
            detail: {
              swiper: this.swiper
            }
          });
          this.dispatchEvent(event);
          
          resolve(this.swiper); // Resolve the promise with the initialized swiper instance
         ///return Promise.resolve(); // Return a resolved promise if no controlContainer
        })
        .catch(error => {
          reject(error); // Reject the promise if there was an error during import or initialization
        });
    });
  }

  initHoverArrowNav() {

      function setCursorToSVG(pTargetElement, svgCode) {

        if (pTargetElement) {
          pTargetElement.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svgCode)}"), auto`;
        } else {
          console.error(`Element with ID '${elementId}' not found.`);
        }
      }

      // SVG code for the cursors
      const prevCursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20" fill="none"><path fill="black" d="M6.7,14.4c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L2.4,7.4l5.7-5.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L0.3,6.7 c-0.4,0.4-0.4,1,0,1.4L6.7,14.4z M111,6.4L1,6.4v2l110,0V6.4z"/></svg>`;  
      const nextCursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20"><path fill="black" d="M110.7,8.1c0.4-0.4,0.4-1,0-1.4l-6.4-6.4c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l5.7,5.7l-5.7,5.7c-0.4,0.4-0.4,1,0,1.4 c0.4,0.4,1,0.4,1.4,0L110.7,8.1z M0,8.4l110,0v-2L0,6.4L0,8.4z"/></svg>`;

      // Add event listener to the target element
      const prevTargetElement = this.querySelector('.swiper-button-prev');
      const nextTargetElement = this.querySelector('.swiper-button-next');

      if (prevTargetElement) {
        prevTargetElement.addEventListener('mouseenter', () => {
          setCursorToSVG(prevTargetElement, prevCursorSVG);
        });

        prevTargetElement.addEventListener('mouseleave', () => {
          prevTargetElement.style.cursor = 'auto';
        });
      } else {
        console.error('Target element not found.');
      }

      if(nextTargetElement) {
        nextTargetElement.addEventListener('mouseenter', () => {
          console.log('hover'); 
          setCursorToSVG(nextTargetElement, nextCursorSVG);
        });

        nextTargetElement.addEventListener('mouseleave', () => {
          nextTargetElement.style.cursor = 'auto';
        });
      }
  }
  
  getSwiper() {
    return this.swiper; 
  }
}

customElements.define('custom-slideshow', ImageSlideshow);




class LwdSlideshow extends ImageSlideshow {
  constructor() {
    super();
    this.addEventListener('swiperLoaded', this.initEventListeners.bind(this));
  }

  initEventListeners() {
    this.getSwiper().on('slideChangeTransitionEnd', () => {
      let activeId =  this.querySelector('.swiper-slide-active').querySelector('[data-dress-combo-option]').dataset.id; 
      this.changeActiveId(activeId); 
    });

    if (this.getSwiper().initialized) {
      this.addSvgToSwiperButtons();
    }
  }

  changeActiveId(pActiveId) {
    const selects = document.querySelector('lwd-builder').querySelectorAll('select'); 
    const id = pActiveId;
    const lwdBuilder = document.querySelector('lwd-builder');

    selects.forEach(select => {
      const options = select.querySelectorAll('option');
      options.forEach(option => {
        if (option.value === id) {
          select.value = id;
          lwdBuilder.setActiveCombo(); 
        }
      });
    });

  }


      // Function to add SVG code to Swiper buttons
    addSvgToSwiperButtons() {
      console.log('addSvgToSwiperButtons'); 
        var svgCode =
          '<svg>  <use href="#arrow-right" /> </svg>';

        var nextButton = this.querySelector('.swiper-button-next');
        var prevButton = this.querySelector('.swiper-button-prev');

        if (nextButton && prevButton) {
          nextButton.innerHTML = svgCode;
          prevButton.innerHTML = svgCode;
        }
      }

}

customElements.define('lwd-slideshow', LwdSlideshow);