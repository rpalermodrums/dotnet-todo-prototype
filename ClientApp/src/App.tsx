import { Suspense } from 'react';

import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <div className="card">
        <Suspense fallback={(
          <>
            <div><img src={reactLogo} className="logo react" alt="React logo" /></div>
            <div>Loading...</div>
          </>
        )}>
          <TodoList />
        </Suspense>
      </div>
    </>
  )
}

export default App
