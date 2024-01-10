import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:8888/ka';

const billStore = createSlice({
    name: 'billStore',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        }
    }
});

const { setBillList } = billStore.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get(URL);
        dispatch(setBillList(res.data));
    }
};

export { getBillList };

export default billStore.reducer;