// src/pages/not-found/not-found-page.js
class NotFoundPage {
  render() {
    const element = document.createElement('div');
    element.innerHTML = '<h1>404 - Page Not Found</h1>';
    return element;
  }
}

export default NotFoundPage;