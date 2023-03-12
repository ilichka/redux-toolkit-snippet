Learn more in my [redux-snippet](https://github.com/ilichka/redux-snippet).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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
    
```

Example with createStore(`old`)
```typescript

```

2. CreateReducer

Example with createReducer(`new`)
```typescript
    
```

Example with native reducer(`old`)
```typescript

```

3. CreateAction

Example with createAction(`new`)
```typescript
    
```

Example with native action creators(`old`)
```typescript

```

4. CreateAsyncThunk

Example with createAsyncThunk(`new`)
```typescript
    
```

Example with native thunk function(`old`)
```typescript

```

5. CreateSlice. CreateSlice allows us to make our redux code in the simplest way, even without createAction, createReducer.

Example with createSlice(`new`)
```typescript
    
```

Example with native "slice"(`old`)
```typescript

```