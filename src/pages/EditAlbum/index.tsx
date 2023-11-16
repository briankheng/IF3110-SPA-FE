import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import { AlbumApi, CategoryApi } from "../../api";
import { AlbumRequest } from "../../types";
import { toast } from "react-toastify";

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await CategoryApi.getCategories();
        setOptions(
          categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );

        const album = await AlbumApi.getAlbum(id as string);
        setTitle(album.title);
        setDescription(album.description);
        setThumbnail(album.thumbnail);
        setCategoryIds(album.categories.map((category) => category.id));
        setSelectedOption(
          album.categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      } catch (error) {
        toast.error((error as any)?.message);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    let valid = true;
    let errors = {
      title: "",
      description: "",
      thumbnail: "",
    };

    if (title.trim().length === 0) {
      errors.title = "Title is required.";
      valid = false;
    }

    if (description.trim().length === 0) {
      errors.description = "Description is required.";
      valid = false;
    }

    if (thumbnail.trim().length === 0) {
      errors.thumbnail = "Thumbnail is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If all fields are filled
    if (validateForm()) {
      const request: AlbumRequest = {
        title,
        description,
        thumbnail,
        categoryIds,
      };

      try {
        await AlbumApi.updateAlbum(id as string, request);
        navigate(`/album/${id}`);
      } catch (error) {
        toast.error((error as any)?.message);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen w-full flex flex-col justify-center items-center">
      <div className="bg-light-gray w-1/2 my-10 px-10 py-10 xl:px-12 xl:py-16 rounded-lg text-white text-sm md:text-base xl:text-lg font-poppins">
        <p className="text-center text-lg md:text-xl xl:text-2xl font-semibold">
          Edit Album
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-10 gap-1 bg-light-gray px-5 md:px-7 pt-3 md:pt-5 pb-6 md:pb-8 rounded-lg text-xs md:text-base"
        >
          <label>
            Title<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue"
          />
          {errors.title && <p className="mt-2 text-red-500">{errors.title}</p>}

          <label className="mt-2">
            Description<span className="text-red-700">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-52 bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue resize-none"
          ></textarea>
          {errors.description && (
            <p className="mt-2 text-red-500">{errors.description}</p>
          )}

          <label className="mt-2">
            Thumbnail<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue"
          />
          {errors.thumbnail && (
            <p className="mt-2 text-red-500">{errors.thumbnail}</p>
          )}

          {/* Category */}
          <label className="mt-2">Category</label>
          <Select
            isMulti
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e as { value: number; label: string }[]);
              setCategoryIds(
                e.map((category) => {
                  return category.value;
                })
              );
            }}
            options={options}
            styles={{
              singleValue: (base) => ({ ...base, color: "white" }),
              valueContainer: (base) => ({
                ...base,
                color: "black",
                width: "100%",
              }),
              control: (base) => ({
                ...base,
                background: "#121212",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral0: "black",
                neutral30: "white",
                neutral10: "grey",
                neutral80: "white",
                primary25: "#ccc",
                primary: "white",
                primary50: "white",
                neutral90: "hotpink",
              },
            })}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-lime-600 rounded-lg mt-8 py-2 text-md font-bold hover:bg-lime-300"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAlbum;
