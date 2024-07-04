import React, { useEffect, useState, useCallback, memo } from 'react'
import './Space.scss'
import Plus from '../Icons/Plus'
import Card from './Card'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { getListFeatureSpace } from '~/Redux/Football'
import LoadingComponent from '../Loading'

const Space: React.FC = memo(() => {
  const dispatch = useAppDispatch()

  const listFeatureSpace = useAppSelector((state) => state.football.listFeatureSpace)

  const totalItems = listFeatureSpace.totalItems

  const [limit, setLimit] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      await dispatch(
        getListFeatureSpace({
          search: '#Euro 2024',
          limit: limit
        })
      )
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLoadMore = useCallback(() => {
    setLimit((prevLimit) => prevLimit + 5)
  }, [])

  return (
    <div className='space_wrapper'>
      <div className='space_wrapper_title'>
        <p>EURO 2024 CÓ GÌ HOT</p>
      </div>
      <div className='space_wrapper_inner'>
        <div className='space_wrapper_inner_main'>
          {listFeatureSpace?.items?.map((item: any, index: number) => <Card key={index} {...item} />)}

          {totalItems > limit && (
            <div className='space_wrapper_inner_main_action' onClick={handleLoadMore}>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <>
                  <span>Xem thêm</span>
                  <span>
                    <Plus />
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Space
