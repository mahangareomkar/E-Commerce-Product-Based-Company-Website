import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (category) => {
    try {
      const response = await fetch(`${host}/products/getproducts/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      return e.message;
    }
  },
);

export const fetchProductByID = createAsyncThunk("product/fetchProductByID", async (productID) => {
  try {
    const response = await fetch(`${host}/products/get-product/${productID}`, {
      method: "GET"
    })

    const data = await response.json();
    return data;
  } catch (e) {
    return e.message;
  }
})

export const fetchIconicProductAndFeatured = createAsyncThunk(
  "product/fetchIconicProductAndFeatured",
  async () => {
    try {
      const response = await fetch(`${host}/products/getfeatured-and-iconic`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      return e.message;
    }
  },
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    try {
      const response = await fetch(`${host}/products/addproduct`, {
        method: "POST",
        headers: {
          "authtoken": localStorage.getItem("authtoken")
        },
        body: product,
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return e.message;
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, productID) => {
    try {
      const response = await fetch(
        `${host}/products/updateproduct/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

      const data = await response.json();
      return data;
    } catch (e) {
      return e.message;
    }
  },
);

export const addFeatured = createAsyncThunk("product/addFeatured", async (details) => {
  try {
    const response = await fetch(`${host}/featured/add`, {
      method: "POST",
      headers: {
        "authtoken": localStorage.getItem("authtoken")
      },
      body: details,
    })

    const data = await response.json();
    return data;
  } catch (e) {
    return e.message;
  }
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    allProducts: [],
    featured: [],
    iconicProducts: [],
    loading: false,
    errorMessage: null,
    featuredAndIconicStatus: "loading",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.allProducts = action.payload.allProducts;
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchProductByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByID.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.product = action.payload.product;
        }
      })
      .addCase(fetchProductByID.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchIconicProductAndFeatured.pending, (state) => {
        state.featuredAndIconicStatus = "loading";
      })
      .addCase(fetchIconicProductAndFeatured.fulfilled, (state, action) => {
        state.featuredAndIconicStatus = "success";
        state.iconicProducts = action.payload.iconic;
        state.featured = action.payload.featured;
      })
      .addCase(fetchIconicProductAndFeatured.rejected, (state, action) => {
        state.featuredAndIconicStatus = "rejected";
        state.errorMessage = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          if (action.payload.product.isIconic) {
            state.iconicProducts.push(action.payload.product)
          }
        } else {
          state.errorMessage = action.payload;
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        for (let i = 0; i < state.allProducts.length; i++) {
          if (state.allProducts[i].id == action.payload.id) {
            state.allProducts[i] = action.action.payload.product;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(addFeatured.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeatured.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          if (state.featured === null) {
            state.featured = action.payload.featured
          } else {
            state.featured.push(action.payload.featured);
          }
        } else {
          state.errorMessage = action.payload;
        }
      })
      .addCase(addFeatured.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
  },
});

export default productSlice.reducer;
