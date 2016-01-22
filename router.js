import {isNumber, isFunction, isString, hasClass} from './index';
import page from 'page';

const header = document.querySelector('header.main');
const body = document.body;

const defaultRoutes = [
  {path: '*', handler: show},
  {path: '*', handler: show404},
];

export default function route(routes = defaultRoutes) {
  const {pathname} = window.location;
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

  if (isFunction(routes, 'forEach')) {
    routes.forEach((r) => {
      const {path, handler} = r;
      if (isString(path) && isFunction(handler)) {
        page(path, handler);
      }
    });
  }
  page();
}

function show(ctx, next) {
  const {pathname} = ctx;
  let selector = (pathname === '/' || pathname === '/ms3000' || pathname === '/ms3000/')
                 ? '#♥'
                 : ctx.pathname.replace('/', '#');

  const offsetTop = getTopOffset(selector, next);

  if (isNumber(offsetTop)) {
    window.scrollTo(0, offsetTop);
  } else {
    next();
  }
}

function show404() {
  console.log('404');
}

function getTopOffset(selector, next) {
  const target = document.querySelector(selector);

  if (!target || !header) {
    return next();
  }

  let {offsetTop} = target;

  const {clientHeight: heightBefore} = header;

  if (!hasClass(body, 'scrolled')) {
    if (window.scrollY > 40) {
      body.classList.add('scrolled');
    }

    const {clientHeight: heightAfter} = header;
    const totalOffset = heightBefore 
                        ? heightBefore - heightAfter
                        : heightAfter;
    if (totalOffset) {
      // offsetTop -= totalOffset;
    }
  }

  return offsetTop;
}
