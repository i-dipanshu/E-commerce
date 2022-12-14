import axios from "axios";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({type: "ALL_PRODUCT_REQUEST"});

    const { data } = await axios.get("http://localhost:5000/api/v1/products");

    dispatch({
        type: "ALL_PRODUCT_SUCCESS",
        payload: data
    })

  } catch (error) {
    dispatch({
      type: "ALL_PRODUCT_FAIL",
      payload: error.response.data,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
}