import React, { Component } from 'react';

class AgeCalculator extends Component {
  constructor() {
    super();
    this.state = {
      dateOfBirth: '',
      age: null,
      validFormats: ['dd/mm/yyyy', 'dd/mm/yy', 'dd-mm-yyyy', 'dd-mm-yy'],
    };
  }

  handleChange = (e) => {
    const dateOfBirth = e.target.value;
    this.setState({ dateOfBirth });
  };

  calculateAge = () => {
    const { dateOfBirth, validFormats } = this.state;

    // Regular expressions for the valid date formats
    const formatRegex = [
      /^(\d{2})\/(\d{2})\/(\d{4})$/,
      /^(\d{2})\/(\d{2})\/(\d{2})$/,
      /^(\d{2})-(\d{2})-(\d{4})$/,
      /^(\d{2})-(\d{2})-(\d{2})$/,
    ];

    for (let i = 0; i < validFormats.length; i++) {
      const regex = formatRegex[i];
      if (regex.test(dateOfBirth)) {
        const [, day, month, year] = dateOfBirth.match(regex);
        const dob = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        );

        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        if (
          today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        ) {
          this.setState({ age: age - 1 });
        } else {
          this.setState({ age });
        }
        return;
      }
    }

    // Invalid date format
    this.setState({ age: null });
  };

  render() {
    const { dateOfBirth, age, validFormats } = this.state;

    return (
      <div>
        <h2>Age Calculator</h2>
        <input
          type="text"
          placeholder={`Enter date of birth (${validFormats.join(', ')})`}
          value={dateOfBirth}
          onChange={this.handleChange}
        />
        <button onClick={this.calculateAge}>Calculate Age</button>
        {age !== null ? (
          <p>Your age is {age} years.</p>
        ) : (
          <p>Invalid date format. Please enter a valid date.</p>
        )}
      </div>
    );
  }
}

export default AgeCalculator;

