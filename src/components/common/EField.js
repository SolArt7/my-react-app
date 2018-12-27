import React from 'react';

const EField = (props) => {
    const {input, labelText, smallText, placeholder, className, meta: {touched, error}} = props;
    const errorText = touched && error && <small className="form-text text-danger">*{error}</small>;
    return (
        <div className="form-group">
            <label>{labelText}</label>
            <input {...input} placeholder={placeholder} className={className}/>
            {smallText && !errorText ? <small className="form-text text-muted">{smallText}</small> : null}
            {errorText}
        </div>
    );
};

export default EField;
