const dates = [
  { date: '2-9-2023', text: 'Mrs. Vetter' },
  { date: '2-23-2023', text: 'Mr. Goff' },
  { date: '3-2-2023', text: 'Mr. Goff' },
  { date: '3-9-2023', text: 'Mrs. Vetter' },
  { date: '5-4-2023', text: 'Mr. Goff' },
  { date: '5-18-2023', text: 'Mrs. Vetter' },
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
