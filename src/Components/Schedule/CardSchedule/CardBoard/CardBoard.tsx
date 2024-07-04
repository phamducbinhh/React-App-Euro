import React from 'react'

const CardBoard: React.FC<any> = ({ team, score }) => {
  return (
    <div className='Schedule_wrapper_inner_card_matches_team'>
      <div className='Schedule_wrapper_inner_card_matches_team_left'>
        <div className='Schedule_wrapper_inner_card_matches_team_left_images'>
          <img src={team.logo_url} alt={team.name} />
        </div>
        <span className='Schedule_wrapper_inner_card_matches_team_left_title'>{team.name}</span>
      </div>
      <div className='Schedule_wrapper_inner_card_matches_team_right'>
        <span>{score}</span>
      </div>
    </div>
  )
}

export default CardBoard
