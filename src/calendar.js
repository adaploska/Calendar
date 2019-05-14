import React, { Component } from "react";
import moment from "moment";

import Slider from "react-slick";

let now = new Date();

class Calendar extends Component {
  constructor(props) {
    super();
    this.state = {
      weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      nowDateFormat: moment(now).format("DD-MM"),
      currentDate: moment(),
      cells: [],
      loading: false,
      days: [],
      current_index: "",
      current_date: moment().format(),
      showIconRight: false,
      showIconLeft: false
    };
  }
  componentDidMount() {
    const { currentDate, days } = this.state;
    let weekStart = currentDate.clone().startOf("week");
    for (let i = 0; i <= 6; i++) {
      days.push(
        moment(weekStart)
          .add(i, "days")
          .format()
      );
    }
    this.setState({
      days
    });
  }
  currentWeekHandle = () => {
    let now = moment();
    let actualWeek = [];
    let weekStart = now.clone().startOf("week");
    for (let i = 0; i <= 6; i++) {
      actualWeek.push(
        moment(weekStart)
          .add(i, "days")
          .format()
      );
    }
    this.setState({
      days: actualWeek,
      current_index: "",
      showIconRight: false,
      showIconLeft: false
    });
  };
  handleChange = (moment, elem) => {
    this.setState({
      moment: moment,
      loading: true,
      current_index: elem,
      current_date: this.state.current_date
    });
  };

  prevClick = () => {
    let prevWeek = [];
    const { currentDate } = this.state;

    var prev = moment(currentDate.startOf("week").subtract(1, "week"));
    prevWeek = [];
    for (let i = 0; i <= 6; i++) {
      prevWeek.push(
        moment(prev)
          .add(i, "days")
          .format()
      );
    }
    this.setState({
      days: prevWeek,
      current_index: "",
      showIconRight: false,
      showIconLeft: true
    });
  };
  nextClick = () => {
    let nextWeek = [];
    const { currentDate } = this.state;
    var next = moment(currentDate.startOf("week").add(1, "week"));
    for (let i = 0; i <= 6; i++) {
      nextWeek.push(
        moment(next)
          .add(i, "days")
          .format()
      );
    }
    this.setState({
      days: nextWeek,
      current_index: "",
      showIconRight: true,
      showIconLeft: false
    });
  };
  render() {
    const {
      nowDateFormat,
      days,
      current_index,
      current_date,
      showIconLeft,
      showIconRight
    } = this.state;
    const settings = {
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 7
    };
    return (
      <div>
        <table className="table">
          <thead className="table-secondary">
            <tr>
              {this.state.weekdaysShort.map((day, index) => (
                <th
                  style={{ width: "12%", padding: "3%" }}
                  scope="col"
                  key={`weeks-day-${index}`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <div className="col-12">
          <img
            src={require("./arrow-left.svg")}
            alt="arrow-left"
            onClick={this.prevClick}
            className="calendar-slider-left"
          />

          <Slider {...settings}>
            {days.map((elem, index) => (
              <div
                key={index}
                onClick={() => this.handleChange(elem, index)}
                className={
                  index === current_index
                    ? "active"
                    : "" ||
                      moment(elem).format("YYYY-MM-DD") ===
                        moment(current_date).format("YYYY-MM-DD")
                    ? "actual-date"
                    : ""
                }
              >
                {moment(elem).format("DD")}
              </div>
            ))}
          </Slider>
          <img
            src={require("./arrow-right.svg")}
            alt="arrow-right"
            onClick={this.nextClick}
            className="calendar-slider-right"
          />
        </div>
        <hr />

        <div className="row">
          <div className="col-3 text-right">
            {showIconLeft ? (
              <div onClick={this.currentWeekHandle}>
                <i class="fas fa-angle-double-right">Today</i>
              </div>
            ) : null}
          </div>
          <div className="col-6 text-center" onClick={this.currentWeekHandle}>
            Today {nowDateFormat}
          </div>
          <div className="col-3">
            {showIconRight ? (
              <div onClick={this.currentWeekHandle}>
                {" "}
                <i class="fas fa-angle-double-left" />
                Today
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
