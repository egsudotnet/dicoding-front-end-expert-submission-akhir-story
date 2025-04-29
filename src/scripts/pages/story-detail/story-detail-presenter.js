import { reportMapper } from '../../data/api-mapper';
export default class ReportDetailPresenter {
  #reportId;
  #view;
  #apiModel;

  constructor(reportId, { view, apiModel }) {
    this.#reportId = reportId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showReportDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showReportDetailMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showReportDetail() {
    this.#view.showReportDetailLoading();
    try {
      const response = await this.#apiModel.getReportById(this.#reportId);
 
      if (!response.ok) {
        console.error('showReportDetail: response:', response);
        this.#view.populateReportDetailError(response.message);
        return;
      }
 
      response.story.location = {latitude : response.story.latitude, longitude : response.story.longitude};

      const story = await reportMapper(response.story);
      console.log(story); // for debugging purpose, remove after checking it
      this.#view.populateReportDetailAndInitialMap(response.message, story);
    } catch (error) {
      console.error('showReportDetail: error:', error);
      this.#view.populateReportDetailError(error.message);
    } finally {
      this.#view.hideReportDetailLoading();
    }
  }

  #isReportSaved() {
    return false;
  }
}
