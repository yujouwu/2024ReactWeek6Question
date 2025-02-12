import { useState } from "react";

function Message(){
  const [message, setMessage] = useState({});

  return (
    <>
      <button type="button" onClick={() => {
        setMessage({
          type: 'success', // success, danger
          title: 'Success',
          text: '成功'
        });
        setTimeout(() => {
          setMessage({})
        }, 3000)
      }}>toast 測試</button>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container end-0 p-3" style={{top: '60px'}}>
          {
            message.title && (
              <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header text-white bg-${message.type}`}>
                  <strong className="me-auto">{message.title}</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                  {message.text}
                </div>
              </div>
            )
          }
          
        </div>
      </div>
    </>
  )
}

export default Message