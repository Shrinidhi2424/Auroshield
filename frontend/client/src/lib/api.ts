const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8001/api";

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Report endpoints
  async createReport(report: any): Promise<ApiResponse> {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }

  async getReports(userId?: string): Promise<ApiResponse> {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/reports${query}`);
  }

  async updateReportStatus(reportId: string, status: string): Promise<ApiResponse> {
    return this.request(`/reports/${reportId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Emergency endpoints
  async triggerPanicAlert(location: any): Promise<ApiResponse> {
    return this.request('/emergency/panic', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });
  }

  async notifyVolunteers(reportId: string): Promise<ApiResponse> {
    return this.request('/volunteers/notify', {
      method: 'POST',
      body: JSON.stringify({ reportId }),
    });
  }

  // User endpoints
  async updateUserProfile(userId: string, profile: any): Promise<ApiResponse> {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(profile),
    });
  }

  async getVolunteerReports(userId: string): Promise<ApiResponse> {
    return this.request(`/volunteers/${userId}/reports`);
  }
}

class AIServiceClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`AI Service Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // AI analysis endpoints
  async analyzeIncident(description: string): Promise<ApiResponse> {
    return this.request('/analyze/incident', {
      method: 'POST',
      body: JSON.stringify({ description }),
    });
  }

  async getSafetyRecommendations(location: any): Promise<ApiResponse> {
    return this.request('/safety/recommendations', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });
  }

  async analyzeDangerLevel(reports: any[]): Promise<ApiResponse> {
    return this.request('/analyze/danger-level', {
      method: 'POST',
      body: JSON.stringify({ reports }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export const aiServiceClient = new AIServiceClient(AI_SERVICE_URL);
