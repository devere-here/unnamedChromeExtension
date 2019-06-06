import React from 'react'
import { convertTime, getRemainingTime } from '../helpers'
import style from './style.scss'

const UrlItem = ({ website }) => {
  const { timeUsed, allotedTime, url } = website
  const timeAllowance = convertTime(allotedTime)
  const timeRemaining = getRemainingTime(timeUsed, allotedTime)

  return (
    <li className={style.listItem}>
      <div className={style.url}>{url}</div>
      <div className={style.totalTime}>
        <span>{timeAllowance.hours}</span>:
        <span>{timeAllowance.minutes}</span>
      </div>
      <div className={style.totalTimeRemaining}>
        <span>{timeRemaining.hours}</span>:
        <span>{timeRemaining.minutes}</span>
      </div>
    </li>
  )
}

export default UrlItem
