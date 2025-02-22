import { Link } from "react-router-dom"

function EmptyBasket(){
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{minHeight: 'calc(100vh - 200px)'}}>
        <p className="h4 mb-0">Your basket is empty.</p>
        <Link to='/products' className="btn btn-primary rounded-pill w-50 mt-5">CONTINUE SHOPPING</Link>
      </div>
    </>
  )
}
export default EmptyBasket