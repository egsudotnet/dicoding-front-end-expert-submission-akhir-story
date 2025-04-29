export default class BookmarkPage {
  async render() {
    return '';
  }

  async afterRender() {
    location.hash = '/';
  }
}
