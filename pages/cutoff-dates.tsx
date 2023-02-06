const dates = [
  { date: '3-24-2023', text: 'Standards 1-3 Practice Assignments, Choice Boards, and Work.' },
  { date: '5-5-2023', text: 'Standards 4-6 Practice Assignments, Choice Boards, and Work.' },
  { date: '6-4-2023', text: 'Standards 7-10 Practice Assignments, Choice Boards, and Work.' },
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
            <b>{date}</b> - {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CutoffDates
