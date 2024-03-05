import React from 'react'

const FilterBar = (props) => {
//destructuring 
const {price, setPrice,setCategory}=props;

  return (
    //iss k andar price slider hai , category me men,women,electronic,jewellery,none ye sb me koi ek select krne pe filtered data show ho
    <div>
        <h1>Filter Bar</h1>

        <div>
            <span>price</span>{`<= ${price}`}
             {/* if a change something in my input range it will set the price */}
            <input type="range" min="100" max="50000" value={price} onChange={(e)=> setPrice(e.target.value)}/>
        </div>

        <div>
          <span>Category</span>

          //jaise he main iss radio input pe click or choose kru to ye jo category hai wo set ho jayega aur uss k according product niche show krega  
          <input type="radio" id='men' value="men" name='category' onClick={(e)=> setCategory("men")} />
        <label htmlFor="men">men</label>

          <input type="radio" id='women' value="women" name='category' onClick={(e)=> setCategory("women")} />
        <label htmlFor="women">women</label>

          <input type="radio" id='electric' value="electric" name='category' onClick={(e)=> setCategory("electric")} />
        <label htmlFor="men">electric</label>
        </div>

        <input type="jewellary" id='jewellary' value="jewellary" name='category' onClick={(e)=> setCategory("jewellary")} />
        <label htmlFor="men">jewellary</label>

        //main content product jisme bahut sarra product hai 
        so hmlog  yaha ek item ka card bna lenge , uss item card ko pass kr denge main content k andar
         
    </div>
  )
}

export default FilterBar