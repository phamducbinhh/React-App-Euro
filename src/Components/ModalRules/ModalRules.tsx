import React from 'react'
import './ModalRule.scss'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModal } from '~/Redux/Modal/reducers'
const ModalRules: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleClickClose = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModal())
  }
  return (
    <div className='modal'>
      <div className='modal_overlay' onClick={handleClickClose}></div>
      <div className='modal_container'>
        <div className='modal_container_close' onClick={handleClickClose}>
          <img src='image/XIcon.webp' alt='OEG IMAGE' />
        </div>
        <h3 className='modal_container_title'>Thể lệ chương trình</h3>
        <span className='modal_container_title_span'>Dự Đoán Đội Vô Địch</span>
        <p className='modal_container_subtitle'>
          Cuồng nhiệt Euro
          <span className='modal_container_subtitle_text'>Dự đoán hay - Quà liền tay</span>
        </p>

        <div className='modal_container_content'>
          <p className='modal_container_content_title'>Chi tiết minigame:</p>

          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>1. Thời gian</p>
            <span className='modal_container_content_wrapper_des'>
              Minigame sẽ diễn ra từ ngày 11/06/2024 đến 24h00 ngày 03/07/2024.
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>2. Cách thức tham gia </p>
            <ul className='modal_container_content_wrapper_lists'>
              <li> - Cần đăng nhập tài khoản OEG. </li>
              <li> - Lựa chọn dự đoán đội vô địch.</li>
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
              <li>
                <strong>Top 1</strong>: 01 Loa Harman Kardon Aura Studio 4
              </li>
              <li>
                {' '}
                <strong>Top 2</strong>: 500.000 Energy
              </li>
              <li>
                {' '}
                <strong>Top 3</strong>: 300.000 Energy
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

export default ModalRules
