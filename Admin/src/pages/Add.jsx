import React, { useState } from 'react'
import upload_icon from '../assets/upload_icon.png'
import { TbTrash } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios'
import { backendurl } from "../App"
import { toast } from 'react-toastify';
const Add = ({ token }) => {
  const [prices, setPrices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Curry')
  const [image, setImage] = useState(null)
  const [popular, setPopular] = useState(false)
  const [sizes, setSizes] = useState([]);

  const handleImagechange = (e) => {
    setImage(e.target.files[0]);
  };
  const addSizePrices = () => {
    setPrices([...prices, { size: "", price: "" }])
  }
  const removeSizePrice = (index) => {
    setPrices(prices.filter((_, i) => i !== index))
  }
  const handleSizePriceChange = (index, field, value) => {
    const updatePrices = prices.map((item, i) => i === index ? { ...item, [field]: field === "size" ? value.toUpperCase() : value } : item)
    setPrices(updatePrices);
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name);
      formData.append("description", description);
      formData.append("prices", JSON.stringify(prices));
      formData.append("category", category);
      formData.append("popular", popular ? "true" : "false");
      formData.append("image", image);

      const response = await axios.post(
        backendurl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
       if(response.data.success){
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrices([])
        setImage(null)
        setPopular(false)
       }
       else{
        toast.error(response.data.message)
       }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return (
    <div className='px-2 sm:px-8 py-12 h-screen'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-3 medium-14 lg:w-[777px]' method='post' encType='multipart/form-data'>
        <div className="w-full">
          <h5 className="h5">Product Name</h5>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="write Here..." className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-light mt-1 w-full max-w-lg" />
        </div>
        <div className="w-full">
          <h5 className="h5">Product Description</h5>
          <textarea rows={5} onChange={(e) => setDescription(e.target.value)} value={description} placeholder="write Here..." className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-light mt-1 w-full max-w-lg" />
        </div>
        <div>
          {/* categories */}
          <div className='flex items-center gap-x-6'>
            <h5>Category</h5>
            <select name="" id="" onChange={(e) => setCategory(e.target.value)} value={category} className="px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light sm:w-full text-gray-30">
              <option value="Curry">Curry</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice">Rice</option>
              <option value="Deserts">Deserts</option>
              <option value="Drinks">Drinks</option>
              <option value="Juice">Juice</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>
          <div className='flex gap-2 pt-2'>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="upload"
                className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-light rounded-lg cursor-pointer'
              />
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImagechange}
                hidden
              />
            </label>
          </div>
        </div>
        {/* sizes */}
        <div>
          <h5>Size And pricing</h5>
          {prices.map((item, index) => (
            <div key={index} className='flex items-center gap-4 mt-2'>
              <input type="text" placeholder='(S,M,L)' className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light w-20 ' onChange={(e) => handleSizePriceChange(index, "size", e.target.value)} value={item.size} />
              <input type="number" placeholder='Price' min={0} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-light w-20  ' onChange={(e) => handleSizePriceChange(index, "price", e.target.value)} value={item.price} />
              <button
                type="button"
                className="text-red-500 !p-2 text-xl"
                onClick={() => removeSizePrice(index)}
              >
                <TbTrash />
              </button>
            </div>
          ))}
          <button className='btn-secondary !rounded !text-xs flexCentergap-x-2 mt-4 !px-3' type='button' onClick={addSizePrices}>
            <FaPlus />Add Sizing
          </button>
        </div>
        <div className='flexStart gap-2 my-2'>
          <input type="checkbox" onChange={() => setPopular(prev => !prev)} checked={popular} id='popular' />
          <label htmlFor="popular">Add to popular</label>
        </div>
        <button type='submit' className='btn-dark !rounded mt-3 max-w-44 sm:w-full'>Add to Product</button>
      </form>
    </div>
  )
}

export default Add
