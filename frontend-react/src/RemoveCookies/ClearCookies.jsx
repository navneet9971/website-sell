import Cookie from 'js-cookie';

// Function to clear all cookies with handling for path and domain
function clearAllCookies() {
  // Get all cookies
  const cookies = Cookie.get();
  
  // Log cookies to the console for debugging
  console.log('Cookies before removal:', cookies);

  // Iterate over each cookie and remove it
  Object.keys(cookies).forEach(cookieName => {
    // Try removing with different paths if necessary
    Cookie.remove(cookieName, { path: '/' });
    // You might need to add more paths or domains here if needed
  });

  // Verify if cookies are removed
  const remainingCookies = Cookie.get();
  console.log('Cookies after removal:', remainingCookies);
}

export default clearAllCookies;
