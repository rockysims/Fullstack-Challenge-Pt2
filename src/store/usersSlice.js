import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchUsers = createAsyncThunk(
	'users/fetchUsersStatus',
	async () => {
		const url = `${BASE_URL}/api/users`;
		const users = await axios.get(url).then(res => res.data);
		return users;
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		data: [],
		column: null,
		direction: null,
		errorMessage: '',
		loading: 'idle'
	},
	reducers: {
		sortBy: (state, action) => {
			const sortByColumn = action.payload;
			if (state.column === sortByColumn) {
				//reverse sort direction
				state.data.reverse();
				state.direction = state.direction === 'ascending'
					? 'descending'
					: 'ascending';
			} else {
				//sort data by sortByColumn
				state.column = sortByColumn;
				state.data.sort((a, b) => {
					const aVal = a[sortByColumn];
					const bVal = b[sortByColumn];
					if (aVal === bVal) return 0;
					return aVal > bVal
						? 1
						: -1;
				});
				state.direction = 'ascending';
			}
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.loading = 'pending';
		});

		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = 'success';
		});

		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			state.loading = 'error';
		});
	}
});

export const { sortBy } = usersSlice.actions;

export default usersSlice.reducer;
