import React, { useRef } from 'react'
import style from './datePicker.module.css'
import { useRouter } from 'next/router';

const DatePickerNew = ({title,subTitle,type,requried,placeholder, ...rest}) => {
  const router = useRouter();
  const { pathname } = router;
  const dateInputRef = useRef(null);

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click();
    }
  };
  return (
    <div style={{width :pathname?.includes("/edit-member") ? "80%" : "auto"}}>
    <p className={style.title}>{title}<span className={style.subtitle}> {subTitle}</span>{requried && <span className="requried"> *</span>}</p>
    <div className={style.inputField}>
  <input
    className={style.input}
    id="datepicker"
    type='date'
    max={new Date()?.toISOString().split('T')[0]}
    placeholder={placeholder}
    ref={dateInputRef}
    style={{backgroundColor : "#fff"}}
    {...rest}
  />
  <span
    className={style.calendarIcon}
    onClick={() => {
      openDatePicker()
    }}
  >
    📅
  </span>
</div>

  </div>
  )
}

export default DatePickerNew
