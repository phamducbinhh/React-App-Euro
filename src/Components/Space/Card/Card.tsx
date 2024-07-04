import React, { Fragment } from 'react'
import { redirectConfig } from '~/Configs/endPoint'
import { useLastChangedTime } from '~/Hooks/useLastChangedTime'

const Card: React.FC<any> = ({ thumbnail, title, short_desc, news_category, show_at, path }) => {
  return (
    <Fragment>
      <a href={`${redirectConfig.News}/${path}`} target='_blank' className='space_wrapper_inner_main_item_card'>
        <div className='space_wrapper_inner_main_item_card_heading'>
          <h4>{title}</h4>
        </div>
        <div className='space_wrapper_inner_main_item_card_body'>
          <div className='space_wrapper_inner_main_item_card_body_images'>
            <img src={`${thumbnail}?w=200`} alt='oeg-euro' />
          </div>
          <div className='space_wrapper_inner_main_item_card_body_text'>
            <div className='space_wrapper_inner_main_item_card_body_text_title'>
              <h4>{title}</h4>
              <p>{short_desc}</p>
            </div>
            <div className='space_wrapper_inner_main_item_card_body_text_desc'>
              <span>{news_category?.title}</span>
              <span>{useLastChangedTime(show_at)}</span>
            </div>
          </div>
        </div>
      </a>
    </Fragment>
  )
}

export default Card
