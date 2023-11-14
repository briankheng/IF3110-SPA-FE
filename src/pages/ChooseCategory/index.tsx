import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryApi } from "../../api";
import { Category } from "../../types";

const ChooseCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const category = await CategoryApi.getCategories();
                setCategories(category);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSelectCategory = (id : string) => {
        navigate("/category?id=" + id);
    };

    return (
        <main className="bg-black text-white flex flex-col w-full min-h-screen px-10 p-5 pt-10">
            <div className="h-full">
                <h1 className="text-3xl">Choose Category that You Want to Know More</h1>
            </div>
            <div
                className="w-full h-full mt-8 mb-8 flex flex-wrap justify-center items-center"
                style={{ gap: '2rem' }}
            >
                {categories.map((data) => (
                    <div
                        key={data.id}
                        className="h-full bg-gray-700 space-y-3 p-5 rounded-xl transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                        style={{ flex: '0 0 calc(25% - 100px)' }}
                        onClick={() => {handleSelectCategory(data.id.toString())}}
                    >
                        <div className="w-full h-full">
                            <h1>{data.name}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ChooseCategory;