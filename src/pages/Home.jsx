import Card from "../components/Card/Card"

const Home = ({
  items,
  searchValue,
  onClearSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading
}) => {
  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onClickAdd={onAddToCart}
        onFavorite={onAddToFavorite}
        loading={isLoading}
        {...item}
      />
    ))
  }
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={onClearSearchValue} className="clear cu-p" src="/img/btn-remove.svg" alt="Close" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home