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
     <div className="py-6 px-2 sm:px-6 max-w-6xl mx-auto">

    <h2 className="text-xl font-bold mb-4">All Products</h2>

    {/* Desktop Header */}
    <div className="hidden md:grid grid-cols-[80px_2fr_1fr_2fr_120px] bg-gray-100 p-3 rounded font-semibold">
      <div>Image</div>
      <div>Name</div>
      <div>Category</div>
      <div>Price</div>
      <div>Actions</div>
    </div>

    {/* Product List */}
    <div className="space-y-3 mt-3">
      {list.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-1 md:grid-cols-[80px_2fr_1fr_2fr_120px] gap-3 items-center bg-white shadow rounded p-3"
        >
          {/* Image */}
          <img
            src={item.image || upload_icon}
            className="w-16 h-16 rounded object-cover mx-auto md:mx-0"
          />

          {/* Name */}
          <div className="font-medium text-center md:text-left">
            {item.name}
          </div>

          {/* Category */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            {item.category}
          </div>

          {/* Prices */}
          <div className="text-sm text-center md:text-left">
            {Object.entries(item.price).map(([s, p]) => (
              <div key={s}>
                {s}: {currency}{p}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <TbEdit
              className="text-blue-500 cursor-pointer"
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
              className="text-red-500 cursor-pointer"
              onClick={() => removeProduct(item._id)}
            />
          </div>
        </div>
      ))}
    </div>

    {/* UPDATE MODAL */}
    {editItem && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-2">
        <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md space-y-3">

          <h3 className="text-lg font-bold">Update Product</h3>

          <input
            className="w-full border p-2 rounded"
            value={editItem.name}
            onChange={e => setEditItem({ ...editItem, name: e.target.value })}
            placeholder="Product name"
          />

          <input
            className="w-full border p-2 rounded"
            value={editItem.category}
            onChange={e => setEditItem({ ...editItem, category: e.target.value })}
            placeholder="Category"
          />

          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={prices}
            onChange={e => setPrices(e.target.value)}
            placeholder='[{"size":"S","price":100}]'
          />

          {/* Image */}
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-24 h-24 object-cover rounded"
            />
          )}

          {/* Popular */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={popular}
              onChange={e => setPopular(e.target.checked)}
            />
            Popular product
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className="px-4 py-2 border rounded"
              onClick={() => setEditItem(null)}
            >
              Cancel
            </button>

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
  )
}

export default List
