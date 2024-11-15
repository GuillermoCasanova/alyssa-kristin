class SideNav {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  init() {
    if (window.innerWidth >= 940) {
      this.generateSideNav();
      this.addSmoothScroll();
      this.pinSideNav();
    }
  }

  generateSideNav() {
    const sections = document.querySelectorAll('section[id]');
    const sideNavList = document.getElementById('side-nav-list');
    sections.forEach(section => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + section.id;
      a.textContent = section.id.replace(/-/g, ' ');
      li.appendChild(a);
      sideNavList.appendChild(li);
    });
  }

  addSmoothScroll() {
    const links = document.querySelectorAll('#side-nav-list a');
    links.forEach(link => {
      link.addEventListener('click', this.smoothScroll);
    });
  }

  smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }


  pinSideNav() {
    const sideNav = document.querySelector('.side-nav-wrapper');
    sideNav.style.position = 'sticky';
    sideNav.style.top = '0';

    const sections = document.querySelectorAll('section[id]');
    console.log(sections);

  const wrapperDiv = document.createElement('div');


  sections.forEach(section => {
    wrapperDiv.appendChild(section.closest('div'));
  });

  wrapperDiv.insertAdjacentElement('afterbegin', sideNav);

  document.querySelector('main').insertAdjacentElement('afterbegin', wrapperDiv);

  }
}

new SideNav();