Learn more in my [redux-snippet](https://github.com/ilichka/redux-snippet).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run serve`

Runs the fake api.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## What redux-toolkit is?

Redux-toolkit is an add-on over the redux from redux developers, that allows developers spend less time,
writing boilerplate, and stay focused on logic working with state.

Main features of redux-toolkit:

- In redux toolkit we have new functions, that allows us to create action-creators and reducers in few rows. 
These functions are createSlice, createAsyncThunk, configureStore, createAction and createReducer.
- ConfigureStore function automatically add thunk middleware in redux and devtools.
- CreateSlice, createReducer wrap your function with produce from the [Immer](https://www.npmjs.com/package/immer) library.
**This means you can write code that "mutates" the state inside the reducer, and Immer will safely return a correct
immutably updated result.**

Let's look through these functions: 

1. ConfigureStore

Example with configureStore(`new`)
```typescript
    export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(postApi.middleware)
    }
})
```

Example with createStore(`old`)
```typescript
    export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware)))
```

2. CreateReducer

Example with createReducer(`new`)
```typescript
    export const reducer = createReducer(initialState, {
    [increment.type]: function(state, action: PayloadAction<string>) {
        state.count += 1
    }
})
```

Example with native reducer(`old`)
```typescript
    export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMET: 
            return {
                ...state,
                count: state.count + 1
            }
    }
}
```

3. CreateAction

Example with createAction(`new`)
```typescript
    export const increment = createAction('INCREMENT', (payload: number) => ({payload}))
```

Example with native action creators(`old`)
```typescript
    export const increment = (payload: number) => ({type: 'INCREMENT', payload})
```

4. CreateAsyncThunk

Example with createAsyncThunk(`new`)
```typescript
    export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/use1rs')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('ERROR WHILE LOADING EEEEEEEE')
        }

    }
)
```

Example with native thunk function(`old`)
```typescript
export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching())
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
        dispatch(userSlice.actions.usersFetchingSuccess(response.data))
    } catch (e) {
        dispatch(userSlice.actions.usersFetchingError(`Error while loading`))
    }
}
```

5. CreateSlice. CreateSlice allows us to make our redux code in the simplest way, even without createAction, createReducer.

Example with createSlice(`new`)
```typescript
    export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        incremet(state) {
            state.count += 1
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false
            state.error = null
            state.users = action.payload
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
```

Example with native "slice"(`old`)
```typescript
export const customersReducer = (state = defaultState, action: CustomersAction): CustomersState => {
    switch (action.type) {
        case CustomersActionTypes.FETCH_CUSTOMERS:
            return {...state, loading: true}
        case CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS:
            return {...state,loading: false, customers: [...state.customers, ...action.payload]}
        case CustomersActionTypes.FETCH_CUSTOMERS_ERROR:
            return {...state,loading: false, error: action.payload}
        case CustomersActionTypes.ADD_CUSTOMER:
            return {...state,loading: false, customers: [...state.customers, action.payload]}
        case CustomersActionTypes.REMOVE_CUSTOMER:
            return {...state,loading: false, customers: state.customers.filter((customer)=>customer.id !== action.payload.id)}
        default:
            return state;
    }
}
```

# RTK Query 

RTK Query allows to make automatically error and loading handlers, allows to get rid of extraReducers. Also, it stores request
and allows not to make the same request, if we need, but take data from storage. Simpler to say
RTK query cashes request. Even if we update query parameter of RTK hook, we still 
receive updated data only in place, where we changed this query, and in another place
it doesn't change. 

In RTK we have refetch method, that allows us to refetch data forced.

Query allows to fetch data, but mutations allows to mutate data.

`tagTypes` tags data, that stores in chase, `providesTags` provides a tag to particular endpoint.

RTK query: 
```typescript
    export const postApi = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit= 5) => ({
                url: '/posts',
                method: 'GET',
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['Post']
        }),
    })
})
```

`invalidatesTags` invalidates data and refetch it.

RTK mutation 
```typescript
export const postApi = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit= 5) => ({
                url: '/posts',
                method: 'GET',
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        })
    })
})
```

RTK query creates hook for each endpoint and usage of such hooks is:

```typescript
// query(GET method)
const {data: posts, error, isLoading} = postApi.useFetchAllPostsQuery(limit)
```

```typescript
// mutation(POST, PUT, DELETE method)
const [createPost, {error, isLoading, data: posts}] = postApi.useCreatePostMutation()
const [updatePost, {error, isLoading, data: posts}] = postApi.useUpdatePostMutation()
const [deletePost, {error, isLoading, data: posts}] = postApi.useDeletePostMutation()
```