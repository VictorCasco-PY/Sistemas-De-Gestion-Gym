import { RouterProvider } from 'react-router-dom'
import './App.css'
import './main.css'
import { routes } from "./routes/index"
import 'bulma/css/bulma.min.css';

function App() {

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
