import React from 'react'
import './ModalPrize.scss'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModalPrize } from '~/Redux/Modal/reducers'
const ModalPrize: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleClickClose = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModalPrize())
  }
  return (
    <div className='modal'>
      <div className='modal_overlay' onClick={handleClickClose}></div>
      <div className='modal_container'>
        <div className='modal_container_close' onClick={handleClickClose}>
          <img src='image/XIcon.webp' alt='OEG IMAGE' />
        </div>
        <h3 className='modal_container_title'>Thể lệ chương trình</h3>
        <span className='modal_container_title_span'>Dự Đoán Kết Quả</span>
        <p className='modal_container_subtitle'>
          Cuồng nhiệt Euro
          <span className='modal_container_subtitle_text'>Dự đoán hay - Quà liền tay</span>
        </p>

        <div className='modal_container_content'>
          <p className='modal_container_content_title'>Chi tiết minigame:</p>

          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>1. Thời gian</p>
            <span className='modal_container_content_wrapper_des'>
              Minigame sẽ diễn ra từ ngày 11/06/2024 đến ngày 15/07/2024.
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>2. Cách thức tham gia </p>
            <ul className='modal_container_content_wrapper_lists'>
              <li> - Cần đăng nhập tài khoản OEG. </li>
              <li> - Mỗi ngày, share thông tin sự kiện lên facebook sẽ nhận 5 điểm BXH</li>
              <li> - Dự đoán chính xác kết quả trận đấu nhận 30 điểm BXH.</li>
              <li> - Dự đoán chính xác kết quả trận đấu vòng 1/8 nhận 50 điểm BXH.</li>
              <li> - Dự đoán chính xác kết quả trận đấu vòng Tứ Kết nhận 75 điểm BXH.</li>
              <li> - Dự đoán chính xác kết quả trận đấu vòng Bán Kết nhận 150 điểm BXH.</li>
              <li> - Dự đoán sai kết quả trận đấu sẽ bị trừ 10 điểm BXH.</li>
            </ul>
          </div>
          <div className='modal_container_content_wrapper'>
            <p className='modal_container_content_wrapper_title'>3. Cơ chế phần thưởng</p>
            <span className='modal_container_content_wrapper_des'>
              <span className='modal_container_content_wrapper_des_bold'>Quà TOP BXH vòng</span>: Sau mỗi vòng dựa trên
              BXH điểm dự đoán sẽ phát thưởng Top 10 người chơi có điểm dự đoán cao nhất (Nếu bằng điểm số sẽ dựa trên
              thời gian dự đoán sớm nhất xếp trước). Quà Top BXH Vòng sẽ cập nhật sau 24h00 ngày kết thúc trận cuối cùng
              mỗi vòng
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <ul className='modal_container_content_wrapper_lists'>
              <li>
                <strong>Top 1</strong>: 500.000 Energy
              </li>
              <li>
                {' '}
                <strong>Top 2</strong>: 300.000 Energy
              </li>
              <li>
                {' '}
                <strong>Top 3</strong>: 200.000 Energy
              </li>
              <li>
                <strong>Top 4-5</strong>: 100.000 Energy
              </li>
              <li>
                {' '}
                <strong>Top 6-10</strong>: 50.000 Energy
              </li>
            </ul>
          </div>
          <div className='modal_container_content_wrapper'>
            <span className='modal_container_content_wrapper_des'>
              <span className='modal_container_content_wrapper_des_bold'>Quà TOP BXH Chung Cuộc</span>: Kết thúc sự kiện
              dự đoán sẽ phát thưởng Top 10 người chơi có điểm dự đoán cao nhất (Nếu bằng điểm số sẽ dựa trên thời gian
              dự đoán sớm nhất xếp trước) BXH chung cuộc tổng hợp sau 24h00 ngày 15/07.
            </span>
          </div>
          <div className='modal_container_content_wrapper'>
            <ul className='modal_container_content_wrapper_lists'>
              <li>
                {' '}
                <strong>Top 1</strong>: 01 Smart Tivi Samsung 4K 65 inch 65AU7002 UHD
              </li>
              <li>
                {' '}
                <strong>Top 2</strong>: 01 Máy Lọc không khí xiaomi pro
              </li>
              <li>
                {' '}
                <strong>Top 3</strong>: 01 Đồng hồ thông minh Xiaomi Redmi Watch 4
              </li>
              <li>
                {' '}
                <strong>Top 4-5</strong>: 500.000 Energy
              </li>
              <li>
                {' '}
                <strong>Top 6-10</strong>: 200.000 Energy
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

export default ModalPrize
