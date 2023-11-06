// dashboardInterfaces.ts
export interface Dashboard {
  displayName: string;
  id: string;
  starred: boolean;
}

export interface DashboardsResponse {
  dashboards: Dashboard[];
}

export interface Visualization {
    type: string;
    id: string;
    name: string;
  }
  
  export interface Text {
    text: string;
    users: string[];
    x: number;
    y: number;
    type: string;
    id: string;
    reports: string[];
    resources: string[];
    h: number;
    w: number;
  }
  
  export interface Map {
    id: string;
    name: string;
    users: string[];
    shape: string;
    x: number;
    y: number;
    type: string;
    reports: string[];
    resources: string[];
    h: number;
    w: number;
  }
  
  export interface DashboardItem {
    visualization?: Visualization;
    text?: Text;
    map?: Map;
    type:String
  }
  
  export interface DashboardDetail {
    access: {
      manage: boolean;
      externalize: boolean;
      write: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
    restrictFilters: boolean;
    allowedFilters: string[];
    displayName: string;
    id: string;
    dashboardItems: DashboardItem[];
    starred: boolean;
  }
  
  export interface DashboardDetailResponse {
    dashboards: DashboardDetail[];
  }

  export interface DashboardItemDetail {
    type: string;
    visualization?: {
      type: string;
      name: string;
    };
    name?: string;
    mapName?: string;
    text?: {
      name: string;
    };
    map?: {
      name: string;
    };
  }
  // import { AccordionData} from '../utils/interfaces'
  
  export interface AccordionData {
    displayName: string;
    starred: boolean;
    isActive: boolean;
    details: DashboardItem[];
  }
  