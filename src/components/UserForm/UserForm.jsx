import { useEffect, useState } from "react";
import InputField from "../General/InputField/InputField";
import axios from "axios";
import { Api } from "../../assets/Api";

export default function UserForm({ onFormSubmit }) {
    const [userSelect, setUserSelect] = useState({ amount: 0, type: null, difficulty: null, category: null });
    const [categories, setCategories] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(Api.question, { params: { ...userSelect } });
        onFormSubmit(response.data.results);
    };

    const getCategories = async () => {
        const response = await axios.get(Api.categories);
        setCategories(response.data.trivia_categories);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (attribute) => (event) => {
        const value = event.target.value === "" ? null : event.target.value;
        setUserSelect((prevState) => ({
            ...prevState,
            [attribute]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
                <InputField
                    type="radio"
                    label="Difficulty:"
                    name="difficulty"
                    value={userSelect.difficulty}
                    onChange={handleInputChange("difficulty")}
                    options={[
                        { value: null, label: "Any" },
                        { value: "easy", label: "Easy" },
                        { value: "medium", label: "Medium" },
                        { value: "hard", label: "Hard" },
                    ]}
                />
            </div>

            <div className="mb-3">
                <InputField
                    type="radio"
                    label="Type:"
                    name="type"
                    value={userSelect.type}
                    onChange={handleInputChange("type")}
                    options={[
                        { value: null, label: "Any" },
                        { value: "boolean", label: "True/False" },
                        { value: "multiple", label: "Multiple Choose" },
                    ]}
                />
            </div>

            <div className="mb-3">
                <InputField
                    type="select"
                    label="Category"
                    name="category"
                    value={userSelect.category}
                    onChange={handleInputChange("category")}
                    options={categories.map(({ id, name }) => (
                        { value: id, label: name }
                    ))}
                />
            </div>

            <div className="mb-3 w-25">
                <InputField
                    type="number"
                    label="Amount"
                    name="amount"
                    value={userSelect.amount}
                    onChange={handleInputChange("amount")}
                />
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
    );
}
