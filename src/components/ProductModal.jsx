// 外部 node_modules 資源
import PropTypes from 'prop-types';

function ProductModal({
  modalType,
  modalData,
  onCloseModal,
  onModalImageFileChange,
  onModalInputChange,
  onMoreImageInputChange,
  onModalImageAdd,
  onModalImageRemove,
  onModalNutritionalsChange,
  onProductModalAction,
}){
  

  return (
    // Modal
    <div
      id="productModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      // ref={productModalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div
            data-bs-theme="dark"
            className={`modal-header ${
              modalType === "delete" ? "text-bg-danger" : "text-bg-dark"
            }`}
          >
            <h1 className="modal-title fs-5" id="productModalLabel">
              {modalType === "edit"
                ? "Edit Product"
                : modalType === "delete"
                ? "刪除產品"
                : "Create New Product"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onCloseModal()}
            ></button>
          </div>
          <div className="modal-body">
            {modalType === "delete" ? (
              <p className="h4 text-center">
                確定要刪除
                <span className="text-danger">{modalData.title}</span>嗎？
              </p>
            ) : (
              <div className="row">
                <div className="col-md-4">
                  {/* Main image */}
                  <div className="mb-2 border p-3 rounded">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        Main Image
                      </label>
                      <input name="imageUrl" className="form-control" type="file" id="formFile" onChange={(e) => onModalImageFileChange(e)}/>
                      <div className="text-center m-1">OR</div>
                      <input
                        name="imageUrl"
                        value={modalData.imageUrl}
                        onChange={onModalInputChange}
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        placeholder="Please input image url"
                        disabled={modalData.imageUrl ? true : false}
                      />                       
                    </div>
                    {
                      modalData.imageUrl && (
                        <>
                          <img
                            src={modalData.imageUrl}
                            alt={`${modalData.title} 主圖`}
                            className="img-fluid"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-danger w-100 mt-2"
                            onClick={() => onModalImageRemove("mainImage")}
                          >
                            Cancel image
                          </button>
                        </>
                      )
                    }
                  </div>
                  {/* More images */}
                  <div className="mb-2 border p-3 rounded">
                    <h6>More Images (Maximum 5)</h6>
                    {modalData.imagesUrl?.map((url, index) => (
                      <div
                        key={index}
                        className={`py-3 ${index > 0 ? "border-top" : ""}`}
                      >
                        <div className={`mb-3`}>
                          <label
                            htmlFor={`moreImages-${index + 1}`}
                            className="form-label"
                          >
                            {index + 1}
                          </label>
                          <input name="imagesUrl" className="form-control" type="file" id="formFile" onChange={(e) => onModalImageFileChange(e, index)}/>
                          <div className="text-center m-1">OR</div>
                          <input
                            name="imagesUrl"
                            value={url}
                            onChange={(e) =>
                              onMoreImageInputChange(e, index)
                            }
                            type="text"
                            className="form-control"
                            id={`moreImages-${index + 1}`}
                            placeholder={`Image url ${index + 1}`}
                            disabled={url ? true : false}
                          />
                        </div>
                        {url && (
                          <>
                            <img
                              src={url}
                              alt={`moreImages-${index + 1}`}
                              className="img-fluid"
                            />
                          </>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100 mt-2"
                          onClick={() => onModalImageRemove("moreImages", index)}
                        >
                          {`Cancel image ${index + 1}`}
                        </button>
                      </div>
                    ))}
                    {
                      (modalData.imagesUrl === undefined || (modalData.imagesUrl?.length < 5 &&
                        modalData.imagesUrl[
                          modalData.imagesUrl.length - 1
                        ] !== "")) && (
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100"
                          onClick={onModalImageAdd}
                        >
                          Add more image
                        </button>
                      )
                    } 
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      name="title"
                      value={modalData.title}
                      onChange={onModalInputChange}
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Please enter the title"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      name="category"
                      value={modalData.category}
                      onChange={onModalInputChange}
                      type="text"
                      className="form-control"
                      id="category"
                      placeholder="Please enter the category"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label">
                      Unit
                    </label>
                    <input
                      name="unit"
                      value={modalData.unit}
                      onChange={onModalInputChange}
                      type="text"
                      className="form-control"
                      id="unit"
                      placeholder="Please enter the unit"
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="origin_price" className="form-label">
                          Origin Price
                        </label>
                        <input
                          name="origin_price"
                          value={modalData.origin_price}
                          onChange={onModalInputChange}
                          type="number"
                          className="form-control"
                          id="origin_price"
                          placeholder="Please enter the origin_price"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          name="price"
                          value={modalData.price}
                          onChange={onModalInputChange}
                          type="number"
                          className="form-control"
                          id="price"
                          placeholder="Please enter the price"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={modalData.description}
                      onChange={onModalInputChange}
                      className="form-control"
                      id="description"
                      placeholder="Please enter the description"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="allergens" className="form-label">
                      Allergens
                    </label>
                    <textarea
                      name="allergens"
                      value={modalData.allergens}
                      onChange={onModalInputChange}
                      className="form-control"
                      id="allergens"
                      placeholder="Please enter the allergens"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">
                      Ingredients
                    </label>
                    <textarea
                      name="ingredients"
                      value={modalData.ingredients}
                      onChange={onModalInputChange}
                      className="form-control"
                      id="ingredients"
                      placeholder="Please enter the ingredients"
                      rows={4}
                    ></textarea>
                  </div>
                  <fieldset className="mb-3">
                    <legend className="fs-6">Nutritionals</legend>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Per 100g</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalData.nutritionalInfo.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <label htmlFor={item.name}>{item.name}</label>
                            </td>
                            <td>
                              <input
                                name={item.name}
                                value={item.value}
                                onChange={(e) =>
                                  onModalNutritionalsChange(e, index)
                                }
                                id={item.name}
                                type="number"
                                className="form-control"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </fieldset>
                  <div className="form-check">
                    <input
                      name="is_enabled"
                      checked={modalData.is_enabled}
                      onChange={onModalInputChange}
                      className="form-check-input"
                      type="checkbox"
                      id="isEnabled"
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      Enabled
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onCloseModal()}
            >
              取消
            </button>
            {
              modalType === "delete" ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onProductModalAction}
                >
                  刪除
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onProductModalAction}
                >
                  確認
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
ProductModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.shape({
    allergens: PropTypes.string,
    category: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string,
    "description(en)": PropTypes.string,
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.string,
    is_enabled: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    nutritionalInfo: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    })),
    origin_price: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    price: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    title: PropTypes.string,
    "title(en)": PropTypes.string,
    unit: PropTypes.string,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onModalImageFileChange: PropTypes.func.isRequired,
  onModalInputChange: PropTypes.func.isRequired,
  onMoreImageInputChange: PropTypes.func.isRequired,
  onModalImageAdd: PropTypes.func.isRequired,
  onModalImageRemove: PropTypes.func.isRequired,
  onModalNutritionalsChange: PropTypes.func.isRequired,
  onProductModalAction: PropTypes.func.isRequired,
}
export default ProductModal