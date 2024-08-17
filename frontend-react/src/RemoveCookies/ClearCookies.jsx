import Cookie from 'js-cookie';

function clearAllCookies() {
  const cookies = Cookie.get();
  console.log('Cookies before removal:', cookies);

  Object.keys(cookies).forEach(cookieName => {
    Cookie.remove(cookieName, { path: '/' });
  });

  const remainingCookies = Cookie.get();
  console.log('Cookies after removal:', remainingCookies);
}

export default clearAllCookies;
