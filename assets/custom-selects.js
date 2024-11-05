function initializeNiceSelects() {

    function initCustomSelects() {
        document.querySelectorAll('[data-custom-select]').forEach((element) => {
            const choices = new Choices(element, {
              searchEnabled: false,
              searchChoices: false,
            });
          });
    }

    initCustomSelects(); 
}


if (window.innerWidth < 950 && 'ontouchstart' in window) {
    console.log('dont trigger')
} else {
  // Call the function to initialize NiceSelect
  initializeNiceSelects();
}