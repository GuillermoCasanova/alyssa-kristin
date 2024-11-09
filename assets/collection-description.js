class CollectionDescription extends HTMLElement {
  constructor() {
    super();
    this.seoTextElement = this.querySelector('[data-seo-text]');
    if (this.seoTextElement && this.seoTextElement.textContent.length > 350) {
      this.originalText = this.seoTextElement.textContent;
      this.clippedText = this.originalText.substring(0, 350);
      this.remainingText = this.originalText.substring(350);
      this.render();
    }
  }

  render() {
    this.seoTextElement.innerHTML = `
      ${this.clippedText}
      <span style="display: none;">${this.remainingText}</span>
    `;
    this.toggleButton = document.createElement('button');
    this.toggleButton.setAttribute('data-toggle-text', '');
    this.toggleButton.classList.add('collection-description__toggle-button');
    this.toggleButton.setAttribute('aria-expanded', 'false');
    this.toggleButton.innerHTML = `
        <svg>
        <use href="#icon-plus-sign"/>
        </svg>
      <span class="visually-hidden">Read more</span>
    `;
    this.toggleButton.addEventListener('click', () => this.toggleText());
    this.seoTextElement.insertAdjacentElement('afterend', this.toggleButton);
    this.remainingTextElement = this.seoTextElement.querySelector('span');
  }
  toggleText() {
    const isExpanded = this.toggleButton.getAttribute('aria-expanded') === 'true';
    this.toggleButton.setAttribute('aria-expanded', !isExpanded);
    this.remainingTextElement.style.display = isExpanded ? 'none' : 'inline';
    const span = this.toggleButton.querySelector('.visually-hidden');
    span.textContent = isExpanded ? 'Read more' : 'Read less';
    const useElement = this.toggleButton.querySelector('use');
    useElement.setAttribute('href', isExpanded ? '#icon-plus-sign' : '#icon-negative-sign');
  }
}

customElements.define('collection-description', CollectionDescription);
