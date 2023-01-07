import './search.css'

const Search = ({ onChangeData }) => {
  return (
    <input
      className='searchInput' 
      type="text" 
      placeholder="Buscar..."
      onChange={onChangeData}
    />
  )
}

export default Search;