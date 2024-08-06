import { useState } from "react";

const Add = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [userId] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const response = await fetch("http://localhost:8000/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-2 mb-14 max-w-[100%] flex flex-col items-center mt-[10%]">
      <div className="w-full max-w-[60%]">
        <h2 className="text-2xl font-bold text-center mb-4">Публикация</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Название</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Выберите фотографию
            </label>
            <input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
          </div>
          <button type="submit" className="btn btn-success w-full">
            Выполнить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
