import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    consulting: '',
    dateDay: '',
    appointmentsList: [],
    isActiveStarred: false,
  }

  toggleIsClicked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, starred: !eachAppointment.starred}
        }

        return eachAppointment
      }),
    }))
  }

  renderAppointmentItem = () => {
    const {appointmentsList} = this.state

    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        isClicked={this.toggleIsClicked}
      />
    ))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {consulting, dateDay} = this.state

    const newAppointmnet = {
      id: v4(),
      name: consulting,
      date: dateDay,
      starred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmnet],
      consulting: '',
      dateDay: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({consulting: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateDay: event.target.value})
  }

  renderStarredAppointments = () => {
    this.setState(prevState => ({isActiveStarred: !prevState.isActiveStarred}))
  }

  filterStarredAppointments = () => {
    const {appointmentsList} = this.state

    const filterAppointments = appointmentsList.filter(eachAppointment => {
      if (eachAppointment.starred === true) {
        return true
      }
      return false
    })

    return filterAppointments.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        isClicked={this.toggleIsClicked}
      />
    ))
  }

  render() {
    const {consulting, dateDay, isActiveStarred} = this.state

    return (
      <div className="home">
        <div className="card-container">
          <div className="card-2-container">
            <div className="text-container">
              <form>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="inputTitle" className="input-title">
                  {' '}
                  TITLE{' '}
                </label>
                <br />

                <input
                  id="inputTitle"
                  placeholder="Title"
                  className="input-title"
                  value={consulting}
                  onChange={this.onChangeTitleInput}
                />

                <br />
                <label className="parag" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  className="date-input"
                  id="dateInput"
                  value={dateDay}
                  onChange={this.onChangeDateInput}
                />
                <br />

                <button
                  type="submit"
                  className="btn"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="appointment-heading-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className="btn-star"
              onClick={this.renderStarredAppointments}
            >
              Starred
            </button>
          </div>
          <div className="cont">
            <ul className="list-container">
              {isActiveStarred
                ? this.filterStarredAppointments()
                : this.renderAppointmentItem()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
