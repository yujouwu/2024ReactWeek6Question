import PropTypes from "prop-types";

function Select({ register, errors, id, labelText, rules, children, disabled = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={id}>{labelText}</label>
      <select
        id={id}
        aria-label={id}
        className={`form-select ${errors[id] ? "is-invalid" : ""}`}
        {...register(id, rules)}
        disabled={disabled}
        
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors?.[id]?.message}</div>
      )}
    </div>
  );
}
Select.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  id: PropTypes.string,
  labelText: PropTypes.string,
  rules: PropTypes.object,
  children: PropTypes.array,
  disabled: PropTypes.bool
};
export default Select;
