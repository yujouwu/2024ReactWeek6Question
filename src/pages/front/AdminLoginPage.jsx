// 外部 node_modules 資源
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";

// 內部 src 資源


// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminLoginPage(){
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    // reset,
  } = useForm({
    defaultValues: {
      username: 'example@example.com',
      password: 'password'
    },
    mode: 'onTouched'
  })

  const handleAdminLogin = async (data) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/signin`, data);
      const { expired, token } = response.data;

      // document.cookie = `hexToken=zzzzzzzz; expires=${new Date(expired)}; SameSite=None; Secure`;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}; SameSite=None; Secure`;
      axios.defaults.headers.common["Authorization"] = `${token}`;

      console.log(response);
      // alert(response.data.message)
      navigate('/admin/products')
    } catch (error) {
      console.dir(error);
      alert(`登入失敗: ${error.response.data.error.message}`);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleAdminLogin(data)
  })

  return (
    <>
    <div className="d-flex flex-column justify-content-center my-5">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-5">
          請先登入 <i className="bi bi-box-arrow-in-left"></i>
        </h1>
        <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
          <Input
            register={register}
            errors={errors}
            id="username"
            labelText="Email address"
            type="text"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format'
              }
            }}
          >
          </Input>
          <Input
            register={register}
            errors={errors}
            id="password"
            labelText="Password"
            type="password"
            rules={{
              required: "Password is required",
            }}
          >
          </Input>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
AdminLoginPage.propTypes = {
  
}
export default AdminLoginPage