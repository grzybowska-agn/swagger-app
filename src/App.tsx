import { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getSwaggerData } from './api-service'
import PageWrapper from './components/templates/page-wrapper/PageWrapper'
import HomePage from './pages/home-page/HomePage'
import PathPage from './pages/path-page/PathPage'
import { SwaggerData } from './types'
import { transformDTO } from './utils/transform-response'

function App() {
  const [data, setData] = useState<SwaggerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)

      try {
        const fetchedData = await getSwaggerData()
        const parsedData = await transformDTO(fetchedData)
        setData(parsedData)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    //TODO: Consider using AbortController to cancel fetch api call before unmounting
  }, [])

  return (
    <PageWrapper loading={loading} error={error}>
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path=":id" element={<PathPage data={data} />} />
      </Routes>
    </PageWrapper>
  )
}

export default App
