import { useState } from 'react'

const SBGtoPercent = {
  '0': 0,
  '0.5': 0.25,
  '1': 0.55,
  '2': 0.74,
  '3': 0.89,
  '4': 1,
}

const defaultGrades = {
  'Standard 1': '0',
  'Standard 2': '0',
  'Standard 3': '0',
  'Standard 4': '0',
  'Standard 5': '0',
  'Standard 6': '0',
  'Standard 7': '0',
  'Standard 8': '0',
  'Standard 9': '0',
  'Standard 10': '0',
  Citizenship: '0',
}

const calculateGrades = (rawGrades: typeof defaultGrades) => {
  const grades = Object.entries(rawGrades)
  const [_, citizenship] = grades.pop()
  return (
    0.095 * grades.reduce((acc, [_, grade]) => acc + SBGtoPercent[grade], 0) +
    0.05 * SBGtoPercent[citizenship]
  )
}

const formatGrade = (rawGrade: number) =>
  Number(rawGrade).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })

const finalGradeSBG = (finalGrade: number) => {
  const sortedSBG = Object.entries(SBGtoPercent).sort(([_, a], [__, b]) => a - b)
  return sortedSBG.find(([_, percent]) => finalGrade <= percent)[0]
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState(defaultGrades)
  const updateGrade = (e, key) => setGrades({ ...grades, ...{ [key]: e.target.value } })
  const finalGrade = calculateGrades(grades)
  const formattedFinalGrade = formatGrade(finalGrade)
  const finalSBG = finalGradeSBG(finalGrade)
  const passing = finalGrade >= .6
  return (
    <div>
      <h1>Final Grade Calculator</h1>
      <p>
        Use the dropdowns below to adjust the grades for your standards and citizenship category.
        Based on what you've currently entered, your Expected Final Grade is:
        <br />
        <h5 className="text-lg">
          SBG {finalSBG} ({formattedFinalGrade}), which is <strong className={passing ? "!text-green-600" : "!text-red-600"}>{passing ? 'passing' : 'failing'}</strong>.
        </h5>
      </p>
      {Object.entries(grades).map(([key, grade]) => (
        <div key={key} className="my-2">
          <select
            id={key}
            value={grade}
            onChange={(e) => updateGrade(e, key)}
            className="text-gray-900"
          >
            {Object.keys(SBGtoPercent).map((sbg) => (
              <option key={key + sbg} value={sbg}>
                {sbg}
              </option>
            ))}
          </select>
          <label htmlFor={key} className="ml-5">
            {key}
          </label>
        </div>
      ))}
    </div>
  )
}

export default GradeCalculator
