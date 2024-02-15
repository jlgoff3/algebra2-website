const dates = [
  { date: '2-1-2024', text: 'Mrs. Vetter' },
  { date: '2-8-2024', text: 'Mr. Goff' },
  { date: '2-29-2024', text: 'Mrs. Vetter' },
  { date: '3-14-2024', text: 'Mr. Goff' },
  { date: '5-9-2024', text: 'Mrs. Vetter' },
  { date: '5-16-2024', text: 'Mr. Goff' },
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
