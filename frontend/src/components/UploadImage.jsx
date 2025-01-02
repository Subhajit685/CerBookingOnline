import React, { useContext, useState } from 'react';
import { captainContext } from '../context/CaptainContext';
import Spinner from './Spinner';

function UploadImage() {
    const {url, captain, setupload, setshowCaptain} = useContext(captainContext)
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setloading] = useState(false)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    setloading(true)
    try {
        const res = await fetch(`${url}/captain/uploadImage`,{
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id : captain?._id, image : profileImage})
        })

        const data = await res.json()
        if(data.success){
            setupload(false)
            setshowCaptain(true)
        }
    } catch (error) {
        console.log(error)
    }finally{
        setloading(false)
    }

  };

  const hendelCancel = () =>{
    setupload(false);
    setshowCaptain(true);
  }

  return (
    <div className="p-3 mt-3 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <div className='h-5 absolute top-3 right-3'><img src="/cancel.png" alt="" className='h-full cursor-pointer' onClick={hendelCancel}/></div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="mb-6">
          <label htmlFor="profileImage" className="block text-gray-700 font-medium mb-2">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {profileImage && (
            <div className="mt-4">
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full mx-auto object-cover object-center border-2 border-gray-300"
              />
            </div>
          )}
        </div>



        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {loading ? <Spinner/> : "Save Changes"}
        </button>
      </form>
      <button className='w-full flex justify-center items-center p-2 bg-black rounded-lg mt-3 text-white'>Edit Profile</button>
    </div>
  );
}

export default UploadImage;
