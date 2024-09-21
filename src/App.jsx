import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './Todo/Todo'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster />
     <Todo/>
    </>
  )
}

export default App
