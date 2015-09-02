import {isNumber, hasClass} from './index';
import page from 'page';

page('*', show);
page('*', show404);
page();

const header = document.querySelector('header.main');
const nav = document.querySelector('nav.main');
const body = document.body;

const allLinks = document.querySelectorAll('a');

Object.keys(allLinks).forEach(key => {
  const link = allLinks[key];
  if (link && link.href) {
    const linkArray = link.href.split('#');
    if (linkArray.length > 1) {
      const href = linkArray[linkArray.length - 1];
      link.href = `/${href}`;
    }
  }
});

function show(ctx, next) {
  let selector = (ctx.pathname === '/')
                 ? '#♥'
                 : ctx.pathname.replace('/', '#');

  const target = document.querySelector(selector);

  if (!target) {
    return next();
  }

  let {offsetTop} = target;
  if (hasClass(body, 'scrolled')) {
    if (nav && nav.clientHeight) {
      offsetTop -= nav.clientHeight;
    }
  }

  if (isNumber(offsetTop)) {
    window.scrollTo(0, offsetTop);
  } else {
    next();
  }
}

function show404() {
  console.log('404');
}
