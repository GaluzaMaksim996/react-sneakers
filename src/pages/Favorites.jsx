import React from "react"
import AppContext from "../context"
import Card from "../components/Card/Card"

const Favorites = () => {
  const { favorites, onAddToFavorite } = React.useContext(AppContext)
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранные</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
          <Card
            key={item.title}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={(obj) => onAddToFavorite(obj)}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
