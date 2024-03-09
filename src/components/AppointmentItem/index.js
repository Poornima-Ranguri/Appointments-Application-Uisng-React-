import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isClicked} = props
  const {id, name, date, starred} = appointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starUrl = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isClicked(id)
  }

  return (
    <li className="list-Item" key={id}>
      <div className="list-container" key={id}>
        <div className="head-container">
          <p className="parag-consultant">{name}</p>
          <button type="button" className="btn" onClick={onClickStar}>
            <img src={starUrl} className="star-image" alt="star" />
          </button>
        </div>
        <p className="paragraph">{formattedDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
