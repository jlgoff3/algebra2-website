const dates = [
  { date: '2-23-2024', text: 'Standards 1-3' },
  { date: '4-12-2024', text: 'Standards 4-6' },
  { date: '5-26-2024', text: 'Standards 7-10' },
]

const CutoffDates = () => {
  return (
    <div>
      <h1>Cutoff Dates</h1>
      The following dates are the final dates to turn in some assignments. At 11:59pm on the given
      date, the teacher-graded Practice Assignments, Choice Boards, and Test Work will close.
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
