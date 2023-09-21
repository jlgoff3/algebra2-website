const dates = [
  { date: '9-21-2023', text: 'Mr. Goff' },
  { date: '10-12-2023', text: 'Mrs. Vetter' },
  { date: '10-26-2023', text: 'Mr. Goff' },
  { date: '11-9-2023', text: 'Mrs. Vetter' },
  { date: '11-30-2023', text: 'Mr. Goff' },
  { date: '12-14-2023', text: 'Mrs. Vetter' },
]

const Tutoring = () => {
  return (
    <div>
      <h1>Tutoring Dates</h1>
      The following dates are when one or both Algebra 2 teachers are scheduled to be at the H.S.
      Homework Help sessions.
      <ul>
        {dates.map(({ date, text }) => (
          <li key={date}>
            <b>{date}</b> - {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tutoring
