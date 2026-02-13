import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async()=>{
        const res = await fetch("http://localhost:3000/api/product")
        const data = await res.json()
        return data.data
    }
)

const productSlice = createSlice({
    name:"products",
    initialState: {
        products:[],
        loading:false,
        error:null

    },
    reducer:{},
    extraReducers: (builder)=>{
        builder

        //when api call starts

        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })

        //when api call succedds

        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload;

        })

        //when api calls fails

        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

    }
})

export default productSlice.reducer;
