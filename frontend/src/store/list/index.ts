import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from 'src/shared/api';
import {
  defaultErrorMessage,
  defaultSuccessMessage,
  showNotification
} from '../notifications';

interface Item {
  name: string;
  url: string;
}

const initialState: { data: Item[] } = {
  data: []
};

const getData = createAsyncThunk('get data', async () => {
  const res = await axios.get(`${backendUrl}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.data;
});

const uploadFile = createAsyncThunk(
  'upload file',
  async (data: { file: File }, store) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file, data.file.name);
      await axios.post(`${backendUrl}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; multipart/form-data'
        }
      });
      store.dispatch(getData());
      store.dispatch(
        showNotification({
          ...defaultSuccessMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: 'File was uploaded'
        })
      );
    } catch (e) {
      store.dispatch(
        showNotification({
          ...defaultErrorMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: (e as any)?.response?.data?.message
        })
      );
    }
  }
);

const sendUrlData = createAsyncThunk(
  'send url data',
  async ({ name, url }: { name: string; url: string }, store) => {
    try {
      await axios.post(`${backendUrl}/send-url`, { name, url });
      store.dispatch(
        showNotification({
          ...defaultSuccessMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: 'File was sent'
        })
      );
    } catch (e) {
      store.dispatch(
        showNotification({
          ...defaultErrorMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: (e as any)?.response?.data?.message
        })
      );
    }
  }
);

const deleteDocument = createAsyncThunk(
  'deleteDocument',
  async ({ url }: { url: string }, store) => {
    try {
      await axios.post(`${backendUrl}/delete`, { url });
      store.dispatch(
        showNotification({
          ...defaultSuccessMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: 'File was deleted'
        })
      );
      store.dispatch(getData());
    } catch (e) {
      store.dispatch(
        showNotification({
          ...defaultErrorMessage,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          text: (e as any)?.response?.data?.message || defaultErrorMessage.text
        })
      );
    }
  }
);

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.data = action.payload;
    });
  }
});
export default listSlice.reducer;

export { getData, uploadFile, sendUrlData, deleteDocument };
