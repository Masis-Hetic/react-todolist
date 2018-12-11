import React, {Component} from 'react';
import './CountDown.css';

// import PropTypes from 'prop-types'

class Countdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			days: 0,
			hours: 0,
			min: 0,
			sec: 0,
		}
	}

	componentDidMount() {
		// update every second
		this.interval = setInterval(() => {
			const date = Countdown.calculateCountdown(this.props.date);
			date ? this.setState(date) : this.stop();
		}, 1000);
	}

	componentWillReceiveProps() {
		// update every second
		this.interval = setInterval(() => {
			const date = Countdown.calculateCountdown(this.props.date);
			date ? this.setState(date) : this.stop();
		}, 1000);
	}

	componentWillUnmount() { this.stop();	}

	static calculateCountdown(endDate) {
		let diff = Date.parse(new Date(endDate)) - new Date();

		// clear countdown when date is reached
		if (diff <= 0) return false;

		const timeLeft = {
			years: 0,
			days: 0,
			hours: 0,
			min: 0,
			sec: 0,
			millisec: 0,
		};

		timeLeft.sec = Math.floor((diff / 1000) % 60);
		timeLeft.min = Math.floor((diff / 1000 / 60) % 60);
		timeLeft.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));

		return timeLeft;
	}

	stop() { clearInterval(this.interval); }

	static addLeadingZeros(value) {
		value = String(value);
		while (value.length < 2) {
			value = '0' + value;
		}
		return value;
	}

	render() {
		const countDown = this.state;

		return (
			<div className="countdown">
        <span className="countdown-col">
          <span className="countdown-col-element">
              <strong>{Countdown.addLeadingZeros(countDown.days)}</strong>
              <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

				<span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{Countdown.addLeadingZeros(countDown.hours)}</strong>
            <span>Hours</span>
          </span>
        </span>


				<span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{Countdown.addLeadingZeros(countDown.min)}</strong>
            <span>Min</span>
          </span>
        </span>

				<span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{Countdown.addLeadingZeros(countDown.sec)}</strong>
            <span>Sec</span>
          </span>
        </span>
			</div>
		);
	}
}

// Countdown.propTypes = {
// 	date: PropTypes.string.isRequired
// };

Countdown.defaultProps = {
	date: new Date()
};

export default Countdown;