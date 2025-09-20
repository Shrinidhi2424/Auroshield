import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../lib/api';
import type { Report } from '@shared/schema';

interface ReportsState {
  reports: Report[];
  volunteerReports: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  reports: [],
  volunteerReports: [],
  loading: false,
  error: null,
};

export const submitReport = createAsyncThunk(
  'reports/submit',
  async (reportData: any) => {
    const response = await apiClient.createReport(reportData);
    return response.data;
  }
);

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (userId?: string) => {
    const response = await apiClient.getReports(userId);
    return response.data;
  }
);

export const fetchVolunteerReports = createAsyncThunk(
  'reports/fetchVolunteerReports',
  async (userId: string) => {
    const response = await apiClient.getVolunteerReports(userId);
    return response.data;
  }
);

export const updateReportStatus = createAsyncThunk(
  'reports/updateStatus',
  async ({ reportId, status }: { reportId: string; status: string }) => {
    const response = await apiClient.updateReportStatus(reportId, status);
    return { reportId, status };
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addReport: (state, action) => {
      state.reports.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit report
      .addCase(submitReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit report';
      })
      // Fetch reports
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reports';
      })
      // Fetch volunteer reports
      .addCase(fetchVolunteerReports.fulfilled, (state, action) => {
        state.volunteerReports = action.payload;
      })
      // Update report status
      .addCase(updateReportStatus.fulfilled, (state, action) => {
        const { reportId, status } = action.payload;
        const report = state.volunteerReports.find(r => r.id === reportId);
        if (report) {
          report.status = status;
        }
      });
  },
});

export const { clearError, addReport } = reportsSlice.actions;
export default reportsSlice.reducer;
