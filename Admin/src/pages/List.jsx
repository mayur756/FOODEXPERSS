import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App'
import { toast } from 'react-toastify'
import { TbTrash, TbEdit } from 'react-icons/tb'
import upload_icon from '../assets/upload_icon.png'

function List({ token }) {
  const [list, setList] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [prices, setPrices] = useState("")
  const [image, setImage] = useState(null)
  const [popular, setPopular] = useState(false)

  const fetchlist = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) setList(res.data.products)
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch products")
    }
  }

  const removeProduct = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/product/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Product removed")
      fetchlist()
    } catch (err) {
      console.error(err)
      toast.error("Failed to remove product")
    }
  }

  const updateProduct = async () => {
    try {
      if (!editItem) return;

      const formData = new FormData()
      formData.append("id", editItem._id)
      formData.append("name", editItem.name)
      formData.append("category", editItem.category)
      formData.append("popular", popular)

      // Parse prices JSON
      let parsedPrices;
      try {
        parsedPrices = JSON.parse(prices)
      } catch {
        toast.error("Invalid prices JSON format")
        return
      }
      const pricesArray = parsedPrices.map(p => ({ size: p.size, price: Number(p.price) }))
      formData.append("prices", JSON.stringify(pricesArray))

      if (image) formData.append("image", image)

      const res = await axios.patch(
        `${backendurl}/api/product/update/${editItem._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (res.data.success) {
        toast.success("Product updated successfully")
        fetchlist()
        setEditItem(null)
        setImage(null)
        setPrices("")
        setPopular(false)
      } else {
        toast.error(res.data.message || "Update failed")
      }
    } catch (error) {
      console.log(error.response?.data || error.message)
      toast.error("Update failed")
    }
  }

  useEffect(() => {
    if (token) fetchlist()
  }, [token])

  return (
    <div className="py-12 px-2 sm:px-8">
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-[1fr_3fr_2fr_2fr_1fr] px-2 py-1 bg-light font-bold text-sm mb-3 rounded'>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Actions</h5>
        </div>
      </div>

      <div>
        {list.map(item => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_2fr_2fr_1fr] gap-2 p-2 bg-light mb-2 rounded items-center"
          >
            <img
              src={item.image || upload_icon}
              className="w-12 h-12 rounded object-cover"
            />
            <div>{item.name}</div>
            <div>{item.category}</div>
            <div>
              {Object.entries(item.price).map(([s, p]) => (
                <div key={s}>{s}: {currency}{p}</div>
              ))}
            </div>
            <div className="flex gap-3">
              <TbEdit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  setEditItem(item)
                  setPopular(item.popular)
                  setPrices(
                    JSON.stringify(
                      Object.entries(item.price).map(([size, price]) => ({
                        size,
                        price
                      }))
                    )
                  )
                }}
              />
              <TbTrash
                className="cursor-pointer text-red-500"
                onClick={() => removeProduct(item._id)}
              />
            </div>
          </div>
        ))}

        {/* UPDATE MODAL */}
        {editItem && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[400px] space-y-3">

              <h3 className="font-bold">Update Product</h3>

              <input
                className="border p-2 w-full"
                value={editItem.name}
                onChange={e => setEditItem({ ...editItem, name: e.target.value })}
              />

              <input
                className="border p-2 w-full"
                value={editItem.category}
                onChange={e => setEditItem({ ...editItem, category: e.target.value })}
              />

              <textarea
                className="border p-2 w-full"
                value={prices}
                onChange={e => setPrices(e.target.value)}
              />

              {/* IMAGE UPLOAD */}
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded mt-2"
                />
              )}

              {/* POPULAR CHECKBOX */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={popular}
                  onChange={e => setPopular(e.target.checked)}
                />
                Popular Product
              </label>

              <div className="flex justify-end gap-3">
                <button onClick={() => setEditItem(null)}>Cancel</button>
                <button
                  onClick={updateProduct}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
