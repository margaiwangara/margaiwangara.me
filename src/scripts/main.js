import AOS from 'aos';
import { Notyf } from 'notyf';
import 'aos/dist/aos.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 5000,
});

// animate on scroll
AOS.init();

function throttle(callback, limit) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

function makeContact() {
  const form = document.getElementById('contact-form-id');
  const fieldset = form.querySelector('fieldset');

  async function handleSubmit(event) {
    event.preventDefault();

    // disable fieldset
    const data = new FormData(event.target);
    fieldset.disabled = true;

    // console.log('data', data);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        notyf.success('Thank you for your submission');
        form.reset();
        fieldset.disabled = false;
        // console.log('success', data);
      })
      .catch((error) => {
        notyf.error('Oops! There was a problem submitting your form');
        fieldset.disabled = false;
        // console.log('error', error);
      });
  }

  form.addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('date');
  el.innerHTML = new Date().getFullYear();

  // smooth scroll
  const href = document.getElementById('hire');
  href.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    const targetElement = document.querySelector(target);

    targetElement.scrollIntoView({
      behavior: 'smooth',
    });
  });

  // contact form
  makeContact();

  // let mainNavLinks = document.querySelectorAll('nav ul li a');
  // let mainSections = document.querySelectorAll('main section');

  // let lastId;
  // let cur = [];

  // window.addEventListener('scroll', (event) => {
  //   let fromTop = window.scrollY;

  //   mainNavLinks.forEach((link) => {
  //     let section = document.querySelector(link.hash);

  //     if (
  //       section.offsetTop <= fromTop &&
  //       section.offsetTop + section.offsetHeight > fromTop
  //     ) {
  //       link.classList.add('active');
  //     } else {
  //       link.classList.remove('active');
  //     }
  //   });
  // });
});
