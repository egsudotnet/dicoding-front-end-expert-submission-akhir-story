import {
  generateLoaderAbsoluteTemplate,
  generateRemoveReportButtonTemplate,
  generateReportDetailErrorTemplate,
  generateReportDetailTemplate,
  generateSaveReportButtonTemplate,
} from '../../templates';
import { createCarousel } from '../../utils';
import ReportDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/map';
import * as CityCareAPI from '../../data/api';

export default class ReportDetailPage {
  #presenter = null;
  #form = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
        </div>
      </section>
    `;
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 15,
    });
  }

  async afterRender() {
    this.#presenter = new ReportDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: CityCareAPI,
    });
 

    this.#presenter.showReportDetail();
  }

  async populateReportDetailAndInitialMap(message, story) {
    document.getElementById('story-detail').innerHTML = generateReportDetailTemplate({ 
      
      title: story.description,
      description: story.description,
      // // // damageLevel: story.damageLevel,
      photoUrl: story.photoUrl,
      // // // location: story.location,
      latitude: story.latitude,
      longitude: story.longitude,
      name: story.name,
      createdAt: story.createdAt,

    });

    // Carousel images
    createCarousel(document.getElementById('images'));

    // Map
    await this.#presenter.showReportDetailMap();

    if (this.#map) {
      const reportCoordinate = [story.latitude, story.longitude];
      const markerOptions = { alt: story.description };
      const popupOptions = { content: story.description };
      this.#map.changeCamera(reportCoordinate);
      this.#map.addMarker(reportCoordinate, markerOptions, popupOptions);
    }
  }

  populateReportDetailError(message) {
    document.getElementById('story-detail').innerHTML = generateReportDetailErrorTemplate(message);
  }


  clearForm() {
    this.#form.reset();
  }

  showReportDetailLoading() {
    document.getElementById('story-detail-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideReportDetailLoading() {
    document.getElementById('story-detail-loading-container').innerHTML = '';
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }
 
 

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
  }
}
