import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
// import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/AuthContext";
import { IoMdCloseCircle } from "react-icons/io";
import axiosInstance from "../../../Axios/useAxiosSecure";

const WorkerProfile = () => {
  const [show, setShow] = useState(false);
  const [nameModal, setShowUpdateModal] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const { currentUser, refetch } = useContext(AuthContext);

  useEffect(() => {
    if ((updateName || updateImage) && currentUser) {
      axiosInstance
        .patch(`/updateUserProfile?email=${currentUser?.email}`, {
          photo: updateImage,
          name: updateName,
        })
        .then(() => {
          setShowUpdateModal(false);
          setShow(false);
          Swal.fire({
            title: "Updated",
            text: "Profile updated successfully",
            icon: "success",
            showCancelButton: false,
            timer: 2000,
          });
        });
      refetch();
    }
  }, [currentUser, updateImage, updateName, refetch]);

  // Mutation for updating user
  // const updateUserMutation = useMutation(
  //   async ({ email, photo, name }) => {
  //     const res = await axios.patch(`/updateUserProfile?email=${email}`, {
  //       photo,
  //       name,
  //     });
  //     return res.data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log("User updated successfully:", data);
  //       Swal.fire("Success", "User profile updated successfully.", "success");
  //     },
  //     onError: (error) => {
  //       console.error("Failed to update user:", error);
  //       Swal.fire("Error", "Failed to update user profile.", "error");
  //     },
  //   }
  // );

  // Handle name update
  const handleUpdateName = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const newName = e.target.name.value;
    if (newName) {
      setUpdateName(newName);
      setShowUpdateModal(false);
    } else {
      Swal.fire(
        "Warning",
        "Please provide a name or image to update.",
        "warning"
      );
    }
  };

  // Image upload function remains same as before
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image.files[0];

    if (!imageFile) {
      Swal.fire("Warning", "Please select an image to upload.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_API_KEY
        }`,
        formData
      );
      setUpdateImage(response.data.data.display_url);
      Swal.fire("Success", "Image uploaded successfully.", "success");
      setShow(false);
    } catch (error) {
      console.error("Image upload failed", error);
      Swal.fire("Error", "Image upload failed. Please try again.", "error");
    }
  };

  return (
    <div className="">
      <div className="space-y-3">
        {/* Profile Image Section */}
        <div className="relative">
          <img
            src={currentUser?.photo}
            alt="user"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-white"
          />
          <span
            onClick={() => setShow(true)}
            className="absolute top-0 left-12 md:left-16 hover:scale-105 duration-300 p-1 rounded-full bg-transparent backdrop-blur-2xl border shadow-2xl text-xs cursor-pointer"
          >
            <FaPen />
          </span>
        </div>

        {/* Update Profile Image */}
        {show && (
          <div className="text-xs md:text-sm my-2">
            <div>
              <form
                onSubmit={handleImageUpload}
                className="flex flex-col gap-2"
              >
                <div>
                  <label className="inline-block cursor-pointer border py-2 w-full px-2 rounded-md">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                    />
                    Browse...
                  </label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <button
                    type="submit"
                    className="py-1 px-2 bg-btnColor hover:bg-primaryColor rounded-lg cursor-pointer shadow-amber-50 border text-xs"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="py-1 px-2 bg-red-500 text-white rounded-lg cursor-pointer shadow-amber-50 border text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Name */}
        <div className="space-y-2">
          {nameModal ? (
            <form onSubmit={handleUpdateName} className="flex flex-col gap-2">
              <input
                type="text"
                defaultValue={currentUser?.name}
                name="name"
                className="border-b focus:outline-hidden focus:border-primaryColor py-1"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="py-1 px-2 bg-btnColor text-white rounded-lg cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="text-red-500 text-xl cursor-pointer"
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            </form>
          ) : (
            <h3 className="flex flex-row gap-2 items-center text-left text-xl md:text-2xl">
              {currentUser?.name}
              <span
                onClick={() => setShowUpdateModal(true)}
                className=" text-sm cursor-pointer"
              >
                <FaPen />
              </span>
            </h3>
          )}
          <p className="text-xs text-gray-200">{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
