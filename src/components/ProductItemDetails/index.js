// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const whatIsShow = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class ProductItemDetails extends Component {
  state = {count: 1, apiStatus: whatIsShow.initial, eachProductItem: {}}

  componentDidMount() {
    this.getProductsId()
  }

  getProductsId = async () => {
    this.setState({apiStatus: whatIsShow.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrll = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrll, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(eachData => ({
          id: eachData.id,
          imageUrl: eachData.image_url,
          title: eachData.title,
          style: eachData.style,
          price: eachData.price,
          description: eachData.description,
          brand: eachData.brand,
          totalReviews: eachData.total_reviews,
          rating: eachData.rating,
          availability: eachData.availability,
        })),
      }
      this.setState({
        apiStatus: whatIsShow.success,
        eachProductItem: formattedData,
      })
    } else {
      this.setState({apiStatus: whatIsShow.failure})
    }
  }

  onClickDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onClickIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  renderSuccessView = () => {
    const {eachProductItem, count} = this.state
    const {similarProducts} = eachProductItem

    return (
      <div className="each-product-item-con">
        <div className="only-one-item-con">
          <img
            className="one-img"
            alt="product"
            src={eachProductItem.imageUrl}
          />

          <div className="item-details-con">
            <h1 className="item-head">{eachProductItem.title}</h1>
            <p className="item-price">{`Rs ${eachProductItem.price}/-`}</p>
            <div className="rating-review-con">
              <div className="rating-con">
                <p className="rating-num">{eachProductItem.rating}</p>
                <img
                  className="star-img"
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                />
              </div>
              <p className="review-con">
                {eachProductItem.totalReviews} Reviews
              </p>
            </div>
            <p className="description">{eachProductItem.description}</p>
            <span className="available">
              Available:
              <p className="stock">{eachProductItem.availability}</p>
            </span>
            <span className="available">
              Brand:
              <p className="stock">{eachProductItem.brand}</p>
            </span>
            <hr />
            <div className="count-con">
              <button
                data-testid="minus"
                onClick={this.onClickDecrement}
                type="button"
                className="minus"
              >
                <BsDashSquare />
              </button>
              <p className="count">{count}</p>
              <button
                data-testid="plus"
                onClick={this.onClickIncrement}
                type="button"
                className="minus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="add-card-button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-items-con">
          <h1 className="similar-item-head">Similar Products</h1>
          <ul className="unoredered-list">
            {similarProducts.map(each => (
              <SimilarProductItem eachItemDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onCLickContinueButton = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="product-faliure-con">
      <img
        className="product-failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />
      <h1 className="error-heading">Product Not Found</h1>
      <button
        onClick={this.onCLickContinueButton}
        type="button"
        className="continue-button"
      >
        Continue Shopping
      </button>
    </div>
  )

  renderAllproductItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case whatIsShow.success:
        return this.renderSuccessView()
      case whatIsShow.failure:
        return this.renderFailureView()
      case whatIsShow.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="sri-con">
        <Header />
        {this.renderAllproductItems()}
      </div>
    )
  }
}
export default ProductItemDetails
