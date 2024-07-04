import React from 'react'
import './ModalMiniGame.scss'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModalMinigame } from '~/Redux/Modal/reducers'
const ModalMinigame: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleClickClose = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModalMinigame())
  }
  return (
    <div className='modal'>
      <div className='modal_overlay' onClick={handleClickClose}></div>
      <div className='modal_container'>
        <div className='modal_container_close' onClick={handleClickClose}>
          <img src='image/XIcon.webp' alt='OEG IMAGE' />
        </div>
        <h3 className='modal_container_title'>Thể lệ chương trình</h3>
        <span className='modal_container_title_span'>MINIGAME CHUNG KẾT EURO </span>
        <p className='modal_container_subtitle'>
          Xem Euro cùng
          <span className='modal_container_subtitle_text'>OKI nhận thưởng</span>
        </p>

        <div className='modal_container_content'>
          <p className='modal_container_content_title'>Chi tiết minigame:</p>

          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>1. Thời gian</p>
            <span className='modal_container_content_wrapper_des'>
              Minigame sẽ diễn ra từ ngày 8/7/2024 đến ngày 14/7/2024
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>2. Cách thức tham gia </p>
            <ul className='modal_container_content_wrapper_lists'>
              <li> - Cần đăng nhập tài khoản OEG. </li>
              <li> - Lựa chọn dự đoán có diễn ra hiệp phụ hay không?</li>
              <li> - Dự đoán số người có cùng lựa chọn.</li>
            </ul>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>3. Cơ chế phần thưởng</p>
            <span className='modal_container_content_wrapper_des'>
              <span className='modal_container_content_wrapper_des_bold'>Quà TOP 3 dự đoán chính xác</span>: 3 người có
              dự đoán chính xác đội vô địch & dự đoán số người đúng hoặc gần đúng nhất sẽ nhận thưởng
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <ul className='modal_container_content_wrapper_lists'>
              <span className='modal_container_content_wrapper_des_bold'>TOP 3 dự đoán hiệp phụ</span>
              <li>
                <strong>Top 1</strong>: 500.000 Energy & 100 điểm BXH Tổng
              </li>
              <li>
                {' '}
                <strong>Top 2</strong>: 300.000 Energy & 50 điểm BXH Tổng
              </li>
              <li>
                {' '}
                <strong>Top 3</strong>: 200.000 Energy & 30 điểm BXH Tổng
              </li>
            </ul>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>
              Lưu ý: Hạn nhận thưởng cuối cùng vào ngày 22/07/2024, sau thời gian này toàn bộ phần thưởng chưa nhận sẽ
              bị hủy. Mọi quyết định cuối cùng thuộc về BTC{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalMinigame
