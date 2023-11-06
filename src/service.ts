import { request } from "./utils/api";
import {
    DashboardsResponse,
    DashboardDetail,
  } from "./utils/interfaces";

class DashboardService {
  /**
   * Get all Dashboards.
   * @returns {Promise<Array>}
   */
  static async getDashboards(): Promise<DashboardsResponse> {
    try {
      const response = await request("/dashboards.json", "GET");
      return response;
    } catch (error) {
      return error as DashboardsResponse;
    }
  }
  


  /**
   * Get Dashboard details.
   * @param {id} - The data of the dashboard
   * @returns {Promise<Object>}
   */
  static async getDashboardDetail(id: string): Promise<DashboardDetail> {
    try {
      const response = await request(`/${id}.json`, "GET");
      return response;
    } catch (error) {
      return error as DashboardDetail;
    }
  }
}

export default DashboardService;
