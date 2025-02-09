import PropTypes from "prop-types"

function CheckboxRadio({register, errors, type, id, labelText, rules}){
  return (
    <div className="mb-3 form-check">
      <input
        {...register(id, rules)}
        type={type}
        className={`form-check-input ${errors.isCheckForm ? 'is-invalid' : ''}`}
        id={id}
      />
      <label className="form-check-label" htmlFor="isCheckForm">
        {labelText}
      </label>
      {
        errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
      }
    </div>
  )
}
CheckboxRadio.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  rules: PropTypes.object,
}

export default CheckboxRadio