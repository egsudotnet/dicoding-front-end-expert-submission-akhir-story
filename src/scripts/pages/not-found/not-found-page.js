export default class NotFoundPage {

  async render() {
    return `
      <section>
        <center>
          <img src="images/Error404.png" alt="404 Not Found" class="not-found__image">
          <h1>Halaman Tidak Ditemukan</h1>
        </center>
      </section>
    `;
  }

}
