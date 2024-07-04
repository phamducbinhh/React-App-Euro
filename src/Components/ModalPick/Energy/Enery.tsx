import React from 'react'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModalEnergy } from '~/Redux/Modal/reducers'
import './Energy.scss'

const ModalEnergy: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleClickClose = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModalEnergy())
  }
  return (
    <div className='modal_energy'>
      <div className='modal_energy_overlay' onClick={handleClickClose}></div>
      <div className='modal_energy_container'>
        <div className='modal_energy_container_close' onClick={handleClickClose}>
          <img src='image/XIcon.webp' alt='OEG IMAGE' />
        </div>
        <h3 className='modal_energy_container_title'>Cách sử dụng OEG Energy</h3>
        <div className='modal_energy_container_content'>
          <div className='modal_energy_container_content_wrapper'>
            <p className='modal_energy_container_content_wrapper_title' style={{ paddingBottom: '5px' }}>
              Energy là gì?
            </p>
            <span className='modal_energy_container_content_wrapper_des'>
              Energy là đơn vị quy đổi chung có thể nạp từ hệ thống thanh toán của OEG, được dùng để thanh toán các dịch
              vụ thuộc hệ sinh thái của OEG bao gồm:
            </span>

            <ul className='modal_energy_container_content_wrapper_items'>
              <li> - Nạp giờ chơi OEG Stadium.</li>
              <li> - Đặt máy tại OEG Stadium. </li>
              <li> - Mua thẻ game. </li>
              <li> - Nạp game trên hệ thống OEG. </li>
              <li> - Các dịch vụ khác thuộc OEG. </li>
            </ul>
          </div>
          <div className='modal_energy_container_content_wrapper'>
            <p className='modal_energy_container_content_wrapper_title'>Hướng dẫn các bước sử dụng Energy:</p>
            <ul className='modal_energy_container_content_wrapper_items'>
              <li>
                {' '}
                <span className='modal_energy_container_content_wrapper_title'>Bước 1</span>: Truy cập trang:{' '}
                <a
                  href='https://stadium.oeg.vn/'
                  target='_blank'
                  className='modal_energy_container_content_wrapper_link'
                >
                  https://stadium.oeg.vn/
                </a>{' '}
                và đăng nhập hoặc tạo tài khoản OEG.
              </li>
              <li>
                {' '}
                <span className='modal_energy_container_content_wrapper_title'>Bước 2</span>: Xác minh thông tin tài
                khoản:{' '}
                <ul>
                  <li> - Chọn "Cài đặt tài khoản".</li>
                  <li> - Chọn "Quản lý thông tin tài khoản".</li>
                  <li> - Nhập thông tin và xác thực email.</li>
                </ul>
              </li>
              <li>
                {' '}
                <span className='modal_energy_container_content_wrapper_title'>Bước 3</span>: Chọn "Mua giờ sử dụng dịch
                vụ" để tiến hành nạp.
              </li>
              <li>
                {' '}
                <span className='modal_energy_container_content_wrapper_title'>Bước 4</span>: Quy đổi & Kiểm tra mã thẻ
                đã mua
                <ul>
                  <li>
                    {' '}
                    - Chọn mệnh giá + số lượng thẻ giờ chơi mà bạn muốn mua {'->'} Chọn hình thức quy đổi bằng Energy.
                  </li>
                  <li>
                    - Kiểm tra mã thẻ đã mua: Chọn ID Tài Khoản {'->'} đơn hàng hoặc check mail để lưu lại mã thẻ.
                  </li>
                </ul>
              </li>
              <li>
                {' '}
                <span className='modal_energy_container_content_wrapper_title'>Bước 5</span>: Quy đổi giờ chơi
                <ul>
                  <li>
                    {' '}
                    - Cách 1: Tại màn hình đăng nhập tài khoản trên OEG Stadium, chọn "Nạp thẻ" sau đó nhập thông tin
                    thẻ {'->'} Nạp Tiền {'->'} Giờ chơi sẽ được quy đổi vào tài khoản của bạn.
                  </li>
                  <li>
                    - Cách 2: Sau khi đăng nhập, tại cửa sổ chức năng chọn "Khách hàng" {'->'} "Nạp thẻ" và nhập thông
                    tin thẻ {'->'} Nạp Tiền {'->'} Giờ chơi sẽ được quy đổi vào tài khoản của bạn.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className='modal_energy_container_content_wrapper'>
            <p className='modal_energy_container_content_wrapper_description'>
              Các vấn đề cần hỗ trợ xin vui lòng inbox trực tiếp về fanpage:{' '}
              <a
                href='https://www.messenger.com/t/102578769235237'
                target='_blank'
                className='modal_energy_container_content_wrapper_description_link'
              >
                Ocean Entertainment Group
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEnergy
