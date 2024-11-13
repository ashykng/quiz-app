const InputField = ({ 
    type = "select",
    label,
    name,
    value,
    onChange,
    options = [],
    isRequired = false,
    isDisabled = false
}) => {

    const renderInput = () => {
        switch (type) {
            case "select":
                return (
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={isRequired}
                        disabled={isDisabled}
                        className="form-select"
                    >
                        <option value={null} isDisabled>Any</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <div className="form-check">
                        {options.map((option, index) => (
                            <div key={index} className="form-check-inline">
                                <input 
                                    type="radio" 
                                    className="form-check-input"
                                    name={name} 
                                    value={option.value} 
                                    checked={value === option.value} 
                                    onChange={onChange} 
                                    required={isRequired}
                                    disabled={isDisabled}
                                />
                                <label className="form-check-label">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "number":
                return (
                    <div>
                        <input
                            type="number"
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={isRequired}
                            disabled={isDisabled}
                            min={1}
                            max={50}
                            className="form-control"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label} {isRequired && <span className="text-danger">*</span>}
            </label>
            {renderInput()}
        </div>
    );
};

export default InputField;
