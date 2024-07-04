import React from 'react'

const TeamCheckBox: React.FC<any> = ({ team, isActive, isDisabled, isChecked, handleChange }) => (
  <li className='home_predict_board_left_item_select_inner_item'>
    <div className='home_predict_board_left_item_select_inner_item_left'>
      <span className='home_predict_board_left_item_select_inner_item_left_logo'>
        <img src={team.logo_url} alt={team.name} />
      </span>
      <span className='home_predict_board_left_item_select_inner_item_left_team'>{team.name}</span>
    </div>
    <div className='home_predict_board_left_item_select_inner_item_right'>
      <input
        type='checkbox'
        className={`home_predict_board_left_item_select_inner_item_right_checkbox ${isActive ? 'winner' : ''} ${isDisabled ? 'disable' : ''}`}
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  </li>
)

export default TeamCheckBox
