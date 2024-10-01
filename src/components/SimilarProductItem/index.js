// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachItemDetails} = props
  const {id, imageUrl, title, brand, price, rating} = eachItemDetails
  return (
    <li className="similar-product-list">
      <img
        className="similar-img"
        alt={`similar product ${id}`}
        src={imageUrl}
      />
      <h1 className="similar-head">{title}</h1>
      <p className="similar-brand">by {brand}</p>
      <div className="price-rating-con">
        <p className="item-price">{`Rs ${price}/-`}</p>
        <div className="rating-con">
          <p className="rating-num">{rating}</p>
          <img
            className="star-img"
            alt="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
