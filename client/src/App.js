import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [home, setHome] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/').then(function(res) {
    setHome(res.data)
    })
  }, [])
  return(
    <div className='App'>
      {home}
    </div>
  )
}

export default App;