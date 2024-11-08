function initializeNiceSelects() {

    function initCustomSelects() {
        document.querySelectorAll('[data-custom-select]').forEach((element) => {
            if (element.choices) {
              element.choices.destroy();
            }
            const choices = new Choices(element, {
              searchEnabled: false,
              searchChoices: false
            });
            element.choices = choices;
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