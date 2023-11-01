import Drawer from '../utils/drawer';
import UrlParser from '../routes/url';
import routes from '../routes/routes';

class App {
    constructor({ button, drawer, content }) {
      this._button = button;
      this._drawer = drawer;
      this._content = content;

      this._initialAppShell();
    }

    _initialAppShell() {
      Drawer.init({
        button: this._button,
        drawer: this._drawer,
        content: this._content,
      });
      const skipLink = document.querySelector('.skip-link');
      const mainContent = document.querySelector('#mainContent');

      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent.scrollIntoView({ behavior: 'smooth' });
        skipLink.blur();
      });
    }

    async renderPage() {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];
      this._content.innerHTML = await page.render();
      await page.afterRender();
    }
  }

  export default App;
