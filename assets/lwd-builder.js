

class LwdBuilder extends HTMLElement {
  constructor() {
    super();
    this.topSelect = this.querySelector('[data-top-select]');
    this.bottomSelect = this.querySelector('[data-bottom-select]');

      this.topValue = this.topSelect.value;
      this.bottomValue = this.bottomSelect.value;
      this.lwdLink = this.querySelector('[data-product-url]');
  }

  connectedCallback() {
    this.initControlsEvents();
    this.setActiveCombo(); 
  }

  initControlsEvents() {
    const topImages = this.querySelector('[data-top-images]');
    const bottomImages = this.querySelector('[data-bottom-images]');    

    this.topSelect.addEventListener('change', () => {
        this.topValue = this.topSelect.value;
        this.setActiveCombo();
    });

    this.bottomSelect.addEventListener('change', () => {
        this.bottomValue = this.bottomSelect.value;
        this.setActiveCombo();
    });
  }
  
  setActiveCombo(){
    this.showActiveChoices();
    this.setLwdLink();
    this.setChoicesNames(); 
  }

  setLwdLink() {
    const dresses = this.querySelectorAll('[data-dresses]');

    dresses.forEach(img => {
      const imgTopId = img.getAttribute('data-top-id');
      const imgBottomId = img.getAttribute('data-bottom-id');
      if (imgTopId === this.topValue && imgBottomId === this.bottomValue) {
        this.lwdLink.href = img.getAttribute('data-dress-url');
        console.log(img.getAttribute('data-dress-url'));
      }
    });

  }
  
  showActiveChoices() {
    if (this.topSelect && this.bottomSelect) {
        const topId = this.topSelect.value;
        const bottomId = this.bottomSelect.value;
        this.topValue = this.topSelect.value;
        this.bottomValue = this.bottomSelect.value;
        
        document.querySelectorAll('[data-option-images]').forEach(container => {
            const images = container.querySelectorAll('[data-id]');
            images.forEach(img => {
                img.classList.remove('active');

                if (img.getAttribute('data-id') === topId || img.getAttribute('data-id') === bottomId) {
                    img.classList.add('active');
                }
            });
        });
    }
  }

  setChoicesNames() {
    const topSelectedOption = this.topSelect.options[this.topSelect.selectedIndex].text;
    const bottomSelectedOption = this.bottomSelect.options[this.bottomSelect.selectedIndex].text;

    const topSelectedTitleElement = this.querySelector('[data-top-selected-title]');
    const bottomSelectedTitleElement = this.querySelector('[data-bottom-selected-title]');

    if (topSelectedTitleElement) {
        topSelectedTitleElement.textContent = topSelectedOption;
    }

    if (bottomSelectedTitleElement) {
        bottomSelectedTitleElement.textContent = bottomSelectedOption;
    }
  }

  showActiveDress() {
    const dressesContainer = this.querySelector('[data-dress-combo]');
    if (this.topSelect && this.bottomSelect && dressesContainer) {
        const topId = this.topSelect.value;
        const bottomId = this.bottomSelect.value;

        // Scroll to the slide that has the topId or bottomId
        const swipers = this.querySelectorAll('lwd-slideshow');
        swipers.forEach(swiper => {
            if(swiper.getSwiper) {
                const slides = swiper.querySelectorAll('.swiper-slide'); 

                slides.forEach((slide, index) => {
                    const optionId = slide.querySelector('[data-dress-combo-option]').getAttribute('data-id');
                    if (optionId === topId || optionId === bottomId) {
                        swiper.getSwiper().slideTo(index);
                    }
                });
            }
        });
    }
  }
}

customElements.define('lwd-builder', LwdBuilder);



