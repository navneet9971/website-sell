import React from 'react'
import { useLocation } from 'react-router-dom'

const BuyCodePage = () => {
const location = useLocation();
const { Data,  userId, productId, img, } = location.state || {};

console.log(Data)
// console.log(price)
console.log(userId)
console.log(productId)
console.log(img)

  return (
    <div>BuyCodePage</div>
  )
}

export default BuyCodePage