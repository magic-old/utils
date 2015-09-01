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
    const hrefArray = link.href.split('#');
    if (hrefArray.length) {
      link.href = hrefArray.join('');
    }
  }
});

function isNumber(val) {
  return typeof val === 'number' && (parseInt(val) === parseInt(val));
}

function show(ctx, next) {
  let selector = (ctx.pathname === '/')
                 ? '#♥'
                 : ctx.pathname.replace('/', '#');

  const target = document.querySelector(selector);

  if (!target) {
    return next();
  }

  let {offsetTop} = target;
  if (body && body.className.indexOf('scrolled') === -1) {
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
