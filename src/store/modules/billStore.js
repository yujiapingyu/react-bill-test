import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8888/ka";

const billStore = createSlice({
  name: "billStore",
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
    // 同步添加账单方法
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { setBillList, addBill } = billStore.actions;

const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get(URL);
    dispatch(setBillList(res.data));
  };
};

const addBillList = (bill) => {
  return async (dispatch) => {
    const res = await axios.post(URL, bill);
    dispatch(addBill(res.data));
  };
};

export { getBillList, addBillList };

export default billStore.reducer;
