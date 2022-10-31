import React, { Component } from "react";
import ReactDOM from "react-dom";
import moment from "moment-jalaali"; // Notice here !
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";
import { DatetimePicker } from "imrc-datetime-picker";
import { DatetimePickerTrigger } from "imrc-datetime-picker";
import { Input } from "antd";

moment.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true,
});

class PersianDatePickerComponent extends Component {
  state = {
    isFa: true,
    isSolar: true,
    isOpen: false,
  };

  constructor(props) {
    super(props);

    // Make sure it's locale is set to english,
    // because you've used moment.loadPersian() function, before.
    const defaultMoment = moment();
    moment.locale();

    this.state = {
      moment: defaultMoment,
    };
    const { isFa } = this.state;
    const newIsFa = !isFa;
    this.state.moment.locale(newIsFa ? "fa" : "en");
    this.setState({ isFa: newIsFa });
    this.setState({
      isSolar: !this.state.isSolar,
    });
  }

  handleChange = (moment) => {
    this.setState({ moment });
    this.props.onSelect(moment);
    const inputElement = document.getElementById("date-picker-fa");
    inputElement.click();
  };

  handleToggleSolar = () => {
    this.setState({
      isSolar: !this.state.isSolar,
    });
  };

  handleLangChange = () => {
    const { isFa } = this.state;
    const newIsFa = !isFa;
    this.state.moment.locale(newIsFa ? "fa" : "en");
    this.setState({ isFa: newIsFa });
  };

  render() {
    const { moment, isSolar, isFa } = this.state;
    const dateFormat = "jYYYY/jMM/jDD";

    return (
      <DatetimePickerTrigger
        isSolar={true}
        lang={"fa"}
        moment={this.state.moment}
        onChange={this.handleChange}
        closeWidgets={true}
        showTimePicker={false}
      >
        <Input
          type="text"
          id={"date-picker-fa"}
          value={moment.format(dateFormat)}
          readOnly
        />
      </DatetimePickerTrigger>
    );
  }
}
export default PersianDatePickerComponent;
