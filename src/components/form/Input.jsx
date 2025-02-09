import PropTypes from "prop-types"

function Input({register, errors, id, labelText, type, rules}){
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        {...register(id, rules) }
        type={type}
        className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
        id={id}
        aria-describedby={id}
      />
      {
        errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
      }
    </div>
  )
}
Input.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  id: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
  rules: PropTypes.object,
}
export default Input

