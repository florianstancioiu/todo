const bodyElement = document.querySelector('body');
const toggleDarkModeButton = document.querySelector('.toggle-dark-mode');
const localStorageDarkMode = JSON.parse(localStorage.getItem('darkMode'));
const userPrefersDarkMode =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const condition = localStorage.getItem('darkMode')
  ? localStorageDarkMode
  : userPrefersDarkMode;

if (condition) {
  bodyElement.classList.add('dark-mode');
  toggleDarkModeButton.textContent = 'Light Mode';
}

toggleDarkModeButton.addEventListener('click', (event) => {
  const currentTarget = event.target;
  if (currentTarget.textContent === 'Dark Mode') {
    bodyElement.classList.add('dark-mode');
    currentTarget.textContent = 'Light Mode';
    localStorage.setItem('darkMode', JSON.stringify(true));
  } else {
    bodyElement.classList.remove('dark-mode');
    currentTarget.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', JSON.stringify(false));
  }
});
