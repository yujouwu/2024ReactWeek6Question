import PropTypes from "prop-types"

function Textarea({register, errors, id, labelText, rules, ...props}){
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <textarea
        {...register(id, rules) }
        className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
        id={id}
        aria-describedby={id}
        {...props} // 傳遞額外屬性，如 rows, cols 等
      />
      {
        errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
      }
    </div>
  )
}
Textarea.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  id: PropTypes.string,
  labelText: PropTypes.string,
  rules: PropTypes.object,
}
export default Textarea