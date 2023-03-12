import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {userSlice} from "./store/reducers/userSlice";
import {fetchUsers} from "./store/reducers/ActionCreators";
import Post from "./components/post";

function App() {
    const {users, error, isLoading} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchUsers())
    },[])
  return (
    <div>
        {/*{isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {JSON.stringify(users, null, 2)}*/}
        <Post/>
    </div>
  );
}

export default App;
