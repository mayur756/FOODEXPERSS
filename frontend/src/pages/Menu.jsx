import React, { useContext, useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import {LuSettings2} from 'react-icons/lu'
import { shopcontext } from '../context/Shopcontext'
import { categories } from '../assets/data'
import Title from '../Components/Title'
import Item from '../Components/Item'
import Footer from '../Components/Footer'
export default function Menu() {
  const {foods} = useContext(shopcontext)
  const [category,setCategory]=useState([])
  const [sortType,setSortType]=useState("relevant")
  const [filterFoods,setFilteredFoods]=useState([])
  const [showCategory,setShowCategory]=useState(true)
  const [search,setSearch] = useState("")
  const [currentpage,setCurrentpage]=useState(1);
  const itemsPerPage=10;
  const applyFilter = () => {
  let filtered = [...foods]

  if (search) {
    filtered = filtered.filter(food =>
      food.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (category.length) {
  filtered = filtered.filter(food =>
    category
      .map(c => c.toLowerCase())
      .includes(food.category.toLowerCase())
  )
}

  return filtered
}
  const applySorting = (foodlist) => {
  const sortedFoods = [...foodlist]
  switch (sortType) {
    case "low":
      return sortedFoods.sort((a, b) =>{
        const aprice=Object.values(a.price)[0];
        const bprice=Object.values(b.price)[0];
        return aprice-bprice;
      }
      )
    case "high":
      return sortedFoods.sort((a, b) =>{
        const aprice=Object.values(a.price)[0];
        const bprice=Object.values(b.price)[0];
        return bprice-aprice;
      }
      )
    default:
      return sortedFoods
  }
}
  const  toggleShowCategories=()=>{
    setShowCategory(!showCategory);
  }
  useEffect(()=>{
      let filltered = applyFilter();
      let sorted=  applySorting(filltered)
      setFilteredFoods(sorted);
      setCurrentpage(1)
  },[category,sortType,foods,search]) 
  const toggleFilter = (value,setState)=>{
    setState((prev)=>prev.includes(value)?prev.filter((item)=>item !== value):[...prev,value]);
  };
  const getPaginatefoods=()=>{
    const startIndex=(currentpage-1)*itemsPerPage
    const endIndex=startIndex+itemsPerPage
    return filterFoods.slice(startIndex,endIndex)
  }
  const totalpage=Math.ceil(filterFoods.length/itemsPerPage)
  return (
    <>
      <section className="w-screen  mt-24 max-padd-container  ">
  {/* search box */}
  <div className="max-padd-container">
    <div className="flex justify-center">
      <div className="inline-flex items-center bg-deep rounded-full p-4 px-6 w-full max-w-2xl">
        <RiSearch2Line className="text-lg cursor-pointer" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search here"
          className="flex-1 bg-deep outline-none text-sm px-4"
        />
        <div onClick={toggleShowCategories  } className='flexCenter cursor-pointer text-lg  border-1 pl-2'>
             <LuSettings2 className="text-lg cursor-pointer" />
        </div>    
      </div>
    </div>
  </div>
  {/* categories filetr */}
    {showCategory && (
      <div className='my-1'>
        <h3 className='h4 mb-4 hidden sm:flex'>Select by Category</h3>
        <div className='flexCenter sm:flexStart flex-wrap gap-x-4 sm:gap-x-12 gap-y-4'>
        {categories.map((cat)=>(
          <label key={cat.name}>
              <input type="checkbox" value={cat.name} onChange={(e)=>toggleFilter(e.target.value,setCategory)} className='hidden peer'  />
              <div className='flexCenter gap-2 peer-checked:text-red-500 cursor-pointer bg-deep rounded-full pr-6'>
                <img src={cat.image} alt={cat.name} className='object-cover h-20 w-20' />
                <span className='medium-14'>{cat.name}</span>
              </div>
          </label>
        ))}
      </div>
      </div>
      
    )}
    {/* food container */}
    <div className='my-8 mb-20'>
      {/* title and sort */}
      <div className='flexBetween !items-center gap-7 flex-wrap pb-16 max-sm:flexCenter text-center max:sm:pb-24'>
        <Title title1={"Food"} title2={'Selection'} titlestyles={'!pb-0 xl:text-start'}/>
        <div className='flexCenter gap-x-2'>
          <span className='hidden sm:flex medium-16'>Sort By:</span>
          <select className='text-sm p-2.5 outline-none bg-deep text-gray-30 rounded ring-1 ring-slate-900/10' onChange={(e)=>setSortType(e.target.value)}>
            <option value={"relevant"}>Relevant</option>
            <option value={"low"}>Low</option>
            <option value={"high"}>High</option>
          </select>
        </div>
      </div>
      {/* foods */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 pl-11'>
         {getPaginatefoods().length>0 ?(getPaginatefoods().map((food)=>(
          <Item food={food} key={food._id}/>
         ))):(<p className='capitalize'>not foods found for selected filters</p>)}
      </div>
    </div>
    <div className='flexCenter mt-14 mb-10 gap-2 sm:gap-4'>
      <button disabled={currentpage == 1} onClick={()=>setCurrentpage((prev)=>prev-1)} className={`btn-secondary !py-1 !px-3 ${currentpage ===1 && "opacity-50 cursor-not-allowed"}`}>Preivous</button>
      {Array.from({length:totalpage},(_,index)=>(
        <button key={index+1} onClick={()=>setCurrentpage(index+1)} className={`btn-outline !py-1 !px-3 ${currentpage===index+1 && "bg-deep"}`}>{index+1}</button>
      ))}
      <button disabled={currentpage == totalpage} onClick={()=>setCurrentpage((prev)=>prev-1)} className={`btn-secondary !py-1 !px-3 ${currentpage ===totalpage && "opacity-50 cursor-not-allowed"}`}>Next</button>
    </div>
</section>
  <Footer/>
    </>
  )
}
