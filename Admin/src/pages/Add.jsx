import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { backendurl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [prices, setPrices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Curry");
  const [image, setImage] = useState(null);
  const [popular, setPopular] = useState(false);

  const handleImagechange = (e) => {
    setImage(e.target.files[0]);
  };

  const addSizePrices = () => {
    setPrices([...prices, { size: "", price: "" }]);
  };

  const removeSizePrice = (index) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  const handleSizePriceChange = (index, field, value) => {
    const updated = prices.map((item, i) =>
      i === index
        ? { ...item, [field]: field === "size" ? value.toUpperCase() : value }
        : item
    );
    setPrices(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrices([]);
        setImage(null);
        setPopular(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 py-10 min-h-screen"> 
      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow flex flex-col gap-4"
        encType="multipart/form-data"
      >
        {/* Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="h5">Product Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="w-full px-3 py-2 ring-1 ring-slate-300 rounded"
            />
          </div>

          <div>
            <h5 className="h5">Category</h5>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 ring-1 ring-slate-300 rounded"
            >
              <option>Curry</option>
              <option>Pizza</option>
              <option>Rice</option>
              <option>Deserts</option>
              <option>Drinks</option>
              <option>Juice</option>
              <option>Fruits</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <h5 className="h5">Product Description</h5>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 ring-1 ring-slate-300 rounded"
            placeholder="Write product description..."
          />
        </div>

        {/* Image */}
        <div className="flex justify-center sm:justify-start">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_icon}
              className="w-24 h-24 object-cover rounded-lg border cursor-pointer"
              alt=""
            />
            <input type="file" id="image" hidden onChange={handleImagechange} />
          </label>
        </div>

        {/* Sizes & Prices */}
        <div>
          <h5 className="h5 mb-2">Size & Pricing</h5>

          {prices.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2"
            >
              <input
                type="text"
                placeholder="Size"
                value={item.size}
                onChange={(e) =>
                  handleSizePriceChange(index, "size", e.target.value)
                }
                className="px-3 py-2 ring-1 ring-slate-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleSizePriceChange(index, "price", e.target.value)
                }
                className="px-3 py-2 ring-1 ring-slate-300 rounded"
              />
              <button
                type="button"
                onClick={() => removeSizePrice(index)}
                className="text-red-500 text-xl flex items-center justify-center"
              >
                <TbTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSizePrices}
            className="flex items-center gap-2 text-sm bg-gray-200 px-3 py-2 rounded mt-2"
          >
            <FaPlus /> Add Size
          </button>
        </div>

        {/* Popular */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={popular}
            onChange={() => setPopular(!popular)}
          />
          <label>Add to popular</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white py-2 rounded w-full sm:w-44 mx-auto mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
