import { useEffect, useState } from 'react'
import { getSwaggerData } from './api-service'
import { SwaggerData } from './types'

function App() {
  const [data, setData] = useState<SwaggerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)

      try {
        const fetchedData = await getSwaggerData()
        setData(fetchedData)
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
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
      {data && <div>{data.info.title}</div>}
     </div>
  )
}

export default App
