import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import download from '../../images/download.png';
import { StoreContext } from '../../context/Context';
import { toast } from 'react-toastify';
import { Oval } from "react-loader-spinner";

const Add_Product = () => {

  const { apiURL } = useContext(StoreContext)
  const [isLoading, setisLoading] = useState(false)
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [formdata, setformdata] = useState({
    name: '',
    description: '',
    price: '',
    offer_price: '',
    stock: ''
  })

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const FileChangeHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages(newImages);
    setPreview(newImages[0]?.url || download);
  };


  const handleImageClick = (index) => {
    setPreview(images[index].url);
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setisLoading(true)
    const formData = new FormData();
    images.forEach((img, index) => {
      formData.append("images", img.file);
    });
    for (const key in formdata) {
      formData.append(key, formdata[key]);
    }
    try {
      const responce = await axios.post(`${apiURL}/api/product/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })
      toast.success(responce.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
    setformdata({
      name: '',
      description: '',
      price: '',
      offer_price: '',
      stock: ''
    })
    setImages([])
    setPreview(null)
    setisLoading(false)
  };

  return (
    <>
      {
        isLoading && <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50">
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      }
      <div className="mt-4 pb-10">
        <div className="font-bold w-full text-[1.5rem] ml-[3rem]">
          <h1>Add Product</h1>
        </div>
        <form className="ml-[3rem] mt-4" onSubmit={SubmitHandler}>
          <label htmlFor="email" className='font-bold'>Product Images</label>
          <div className='flex gap-1'>
            <label htmlFor="images">
              <img
                src={preview || download}
                alt="upload_image"
                className="w-[12rem] h-[15rem] cursor-pointer border mt-2"
              />
            </label>
            <input
              type="file"
              id="images"
              onChange={FileChangeHandler}
              multiple
              hidden
            />
            <div className="w-[5rem] h-[15rem] flex flex-col overflow-auto gap-y-2 scroll mt-2">
              {images.length > 0 &&
                images.map((item, index) => (
                  <img
                    key={index}
                    src={item.url}
                    alt={`Uploaded ${index}`}
                    className="w-[5rem] h-[7rem] border-[1px] border-slate-300 cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  />
                ))}
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor="email" className='font-bold'>Product Name</label>
            <input
              type="text"
              name='name'
              value={formdata.name}
              onChange={ChangeHandler}
              className='outline-none border border-black rounded-[5px] py-1 w-[25rem] pl-4'
              required
            />
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor="text" className='font-bold'>Product Description</label>
            <textarea
              type="text"
              name='description'
              value={formdata.description}
              onChange={ChangeHandler}
              className={`w-[25rem] h-[10rem] resize-none border border-black outline-none rounded-[5px] pl-4 font-normal items-start text-black`}
            />
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor="email" className='font-bold'>Product Original Price</label>
            <input
              type="number"
              name='price'
              value={formdata.price}
              onChange={ChangeHandler}
              className='outline-none border border-black rounded-[5px] py-1 w-[25rem] pl-4'
              required
            />
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor="email" className='font-bold'>Product Discounted Price</label>
            <input
              type="number"
              name='offer_price'
              value={formdata.offer_price}
              onChange={ChangeHandler}
              className='outline-none border border-black rounded-[5px] py-1 w-[25rem] pl-4'
              required
            />
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor="email" className='font-bold'>Product Stock</label>
            <input
              type="number"
              name='stock'
              value={formdata.stock}
              onChange={ChangeHandler}
              className='outline-none border border-black rounded-[5px] py-1 w-[25rem] pl-4'
              required
            />
          </div>
          <div className='mt-4'>
            <button className='w-[25rem] py-1 rounded-[5px] bg-yellow-500 font-bold'>Continue</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add_Product;