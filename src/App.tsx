import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getSwaggerData } from './api-service'
import Home from './pages/home/Home'
import PathPage from './pages/single-path/SinglePathPage'
import { SwaggerData } from './types'
import { transformDTO } from './utils/transform-response'

function App() {
  const [data, setData] = useState<SwaggerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)

      try {
        const fetchedData = await getSwaggerData()
        const parsedData = transformDTO(fetchedData)
        setData(parsedData)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (data === null) {
      fetchData()
    }
    //TODO: Consider using AbortController to cancel fetch api call before unmounting
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home loading={loading} error={error} data={data} />}
      />
      <Route
        path=":id"
        element={<PathPage loading={loading} error={error} data={data} />}
      />
    </Routes>
  )
}

export default App
