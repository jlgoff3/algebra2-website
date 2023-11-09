const dates = [
  { date: '10-13-2023', text: 'Standards 1-3' },
  { date: '11-10-2023', text: 'Standards 4-5' },
  { date: '11-17-2023', text: 'Standards 6' },
  { date: '12-13-2023', text: 'Standards 7-9' },
]

const CutoffDates = () => {
  return (
    <div>
      <h1>Cutoff Dates</h1>
      The following dates are the final dates to turn in some assignments. At 11:59pm on the given
      date, the teacher-graded Practice Assignments, Choice Boards, and Work will close.
      <ul>
        {dates.map(({ date, text }) => (
          <li key={date}>
            <b>{date}</b> - {text} Practice Assignments, Choice Boards, and Work.
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CutoffDates
