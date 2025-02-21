import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function NotFoundPage(){
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [navigate])

  return (
    <>
      <div className="container">
        <p className="h1">Ooops.</p>
        <h1 className="fs-4 fw-normal">PAGE NOT FOUND</h1>
      </div>
    </>
  )
}
export default NotFoundPage