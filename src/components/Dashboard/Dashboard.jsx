import { useState } from "react";
import UserForm from "../UserForm/UserForm";
import QuestionForm from "../QuestionForm/QuestionForm";

export default function Dashboard() {
    const [res, setRes] = useState(null);

    return (
        <>
            <UserForm onFormSubmit={(data) => setRes(data)} />
            {res && <QuestionForm data={res} />}
        </>
    );
}
