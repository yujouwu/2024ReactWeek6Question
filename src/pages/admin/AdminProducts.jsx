// 外部 node_modules 資源
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

// 內部 src 資源
import Pagination from '../../components/Pagination';
import ProductModal from "../../components/ProductModal";
import AdminLayout from "../../layout/AdminLayout";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalData = {
  allergens: "",
  category: "",
  content: "",
  description: "",
  "description(en)": "",
  imageUrl: "",
  imagesUrl: [],
  ingredients: "",
  is_enabled: false,
  nutritionalInfo: [
    {
      name: "Calories (kcal)",
      value: "",
    },
    {
      name: "Protein (g)",
      value: "",
    },
    {
      name: "Fat (g)",
      value: "",
    },
    {
      name: "Carbohydrates (g)",
      value: "",
    },
    {
      name: "Sugar (g)",
      value: "",
    },
    {
      name: "Sodium (mg)",
      value: "",
    },
  ],
  origin_price: "",
  price: "",
  title: "",
  "title(en)": "",
  unit: "",
};

function AdminProducts(){
  // Modal 相關
  
  const productModalRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(defaultModalData);

  const openModal = (product, type) => {
    setModalType(type);
    setModalData(product);

    productModalRef.current.show();
    // clearImageFileInputValue();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  // 處理 Modal 內通用的輸入欄位
  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setModalData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 處理 Modal 內特定的 nutritionalInfo 欄位
  const handleModalNutritionalsChange = (e, index) => {
    const { value } = e.target;

    setModalData((prevData) => ({
      ...prevData,
      nutritionalInfo: prevData.nutritionalInfo.map((item, i) =>
        i === index ? { ...item, value: Number(value) } : item
      ),
    }));
  };

  // 處理 Modal 內圖片相關欄位
  const handleMoreImageInputChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...modalData.imagesUrl];
    newImages[index] = value;
    setModalData((prevData) => ({
      ...prevData,
      imagesUrl: newImages,
    }));
  };

  const handleModalImageAdd = () => {
    const newImages = modalData.imagesUrl === undefined ? [""] : [...modalData.imagesUrl, ""];

    setModalData((prevData) => ({
      ...prevData,
      imagesUrl: newImages,
    }));
  };

  const handleModalImageRemove = (imageType, index) => {
    if(imageType === "mainImage"){
      setModalData((prevData) => ({
        ...prevData,
        imageUrl: "",
      }));
    }else{
      const newImages = [...modalData.imagesUrl];
      // newImages.pop();
      newImages.splice(index, 1)
      setModalData((prevData) => ({
        ...prevData,
        imagesUrl: newImages,
      }));
    }
  };

  const handleModalImageFileChange = async (e, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', file);
    try {
      const response = await axios.post(`${BASE_URL}/api/${API_PATH}/admin/upload`, formData);
      const uploadedImageUrl = response.data.imageUrl;
      if(e.target.name === "imageUrl"){
        setModalData({
          ...modalData,
          imageUrl: uploadedImageUrl
        })
      }else if(e.target.name === "imagesUrl"){
        const newImages = [...modalData.imagesUrl];
        newImages[index] = uploadedImageUrl;
        setModalData((prevData) => ({
          ...prevData,
          imagesUrl: newImages,
        }));
      }
    } catch (error) {
      console.dir(error);
      alert(error.response.data.message)
    } finally{
      e.target.value ='';
    }
  }
  
  // 產品 API 相關
  // const [tempProduct, setTempProduct] = useState({});
  // const [mainImage, setMainImage] = useState(null);
  const [products, setProducts] = useState([]);
  const getProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.dir(error);
      alert(`取得產品失敗: ${error.response.data.message}`);
    }
  };

  const createProduct = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${API_PATH}/admin/product`, {
        data: {
          ...modalData,
          origin_price: Number(modalData.origin_price),
          price: Number(modalData.price),
          is_enabled: modalData.is_enabled ? 1 : 0,
        }
      });
      alert(response.data.message);
      return true;
    } catch (error) {
      console.dir(error);
      const errorMessage = error.response.data.message.join(", ");    
      alert(`新增失敗: ${errorMessage}`);
      return false;
    }
  };

  const editProduct = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/api/${API_PATH}/admin/product/${modalData.id}`, {
        data: {
          ...modalData,
          origin_price: Number(modalData.origin_price),
          price: Number(modalData.price),
          is_enabled: modalData.is_enabled ? 1 : 0,
        }
      });
      alert(response.data.message);
      return true;
    } catch (error) {
      console.dir(error);
      alert(`更新失敗: ${error.response.data.message}`);
      return false;
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/${API_PATH}/admin/product/${modalData.id}`);
      alert(response.data.message);
      return true;
    } catch (error) {
      console.dir(error);
      alert(`刪除失敗: ${error.response.data.message}`);
      return false;
    }
  }

  // 原本寫法
  // const handleProductModalAction = async () => {
  //   let actionSuccess = false;

  //   switch (modalType) {
  //     case "create":
  //       actionSuccess = await createProduct();
  //       break;
  //     case "edit":
  //       actionSuccess = await editProduct();
  //       break;
  //     case "delete":
  //       actionSuccess = await deleteProduct();
  //       break;
  //     default:
  //       throw new Error("unknown modalType");
  //   }

  //   if (actionSuccess) {
  //     closeModal();
  //     getProducts();
  //   }
  // };

  // 助教給予的建議
  const handleProductModalAction = async () => {
    const actionMap = {
      create: createProduct,
      edit: editProduct,
      delete: deleteProduct,
    };
  
    const action = actionMap[modalType];
    if (!action) {
      alert("unknown modalType");
      return;
    }
  
    const actionSuccess = await action();
  
    if (actionSuccess) {
      closeModal();
      getProducts();
    }
  };

  const checkAdminLogin = async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/check`);
      getProducts();
      // setIsAuth(true);
    } catch (error) {
      console.dir(error);
      alert(error.response.data.message);
    }
  };

  // 使用 useEffect 監聽 tempProduct 的變化
  // useEffect(() => {
  //   if (tempProduct) {
  //     setMainImage(tempProduct.imageUrl); // 當 tempProduct 更新後執行
  //   }
  // }, [tempProduct]);


  // 進入頁面時，確認是否有登入
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;

    // 建立 Modal 實體
    productModalRef.current = new Modal("#productModal");

    checkAdminLogin();
  }, []);

  // Pagination
  const [pagination, setPagination] = useState({});

  return (
    <>
      <AdminLayout />
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openModal(defaultModalData, "create")}
              >
                Create New Product
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {
                        product.is_enabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)
                      }
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => openModal(product, "edit")}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => openModal(product, "delete")}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={pagination} getProducts={getProducts}/>
        </div>
      </div>

      <ProductModal 
        modalType={modalType}
        modalData={modalData}
        onCloseModal={closeModal}
        onModalImageFileChange={handleModalImageFileChange}
        onModalInputChange={handleModalInputChange}
        onMoreImageInputChange={handleMoreImageInputChange}
        onModalImageAdd={handleModalImageAdd}
        onModalImageRemove={handleModalImageRemove}
        onModalNutritionalsChange={handleModalNutritionalsChange}
        onProductModalAction={handleProductModalAction}
      />
    </>
  )
}

export default AdminProducts