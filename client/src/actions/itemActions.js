import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items") // Making a request to router endpoint
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    );
};

export const addItem = (item) => (dispatch) => {
  // fetch("/api/items", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(item),
  // })
  //   .then((res) => res.json())
  //   .then((item) =>
  //     dispatch({
  //       type: ADD_ITEM,
  //       payload: item,
  //     })
  //   );

  axios
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
