import { useState } from 'react'

const STANDARD_PERCENT = 0.095
const CITIZENSHIP_PERCENT = 0.05

const SBGtoPercent = {
  'N/A': null,
  '0': 0,
  '0.5': 0.25,
  '1': 0.55,
  '2': 0.74,
  '3': 0.89,
  '4': 1,
}

const defaultGrades = {
  'Standard 1': 'N/A',
  'Standard 2': 'N/A',
  'Standard 3': 'N/A',
  'Standard 4': 'N/A',
  'Standard 5': 'N/A',
  'Standard 6': 'N/A',
  'Standard 7': 'N/A',
  'Standard 8': 'N/A',
  'Standard 9': 'N/A',
  'Standard 10': 'N/A',
}

const calculateGrades = (rawGrades: typeof defaultGrades, citizenship) => {
  const grades = Object.entries(rawGrades).filter((v) => v !== null)
  const partial =
    STANDARD_PERCENT * grades.reduce((acc, [_, grade]) => acc + SBGtoPercent[grade], 0) +
    CITIZENSHIP_PERCENT * citizenship
  const correction_factor = STANDARD_PERCENT * grades.length + CITIZENSHIP_PERCENT
  const finalGrade = partial * correction_factor
  console.log(finalGrade)
  return finalGrade
}

const formatGrade = (rawGrade: number) =>
  Number(rawGrade).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })

const finalGradeSBG = (finalGrade: number) => {
  const sortedSBG = Object.entries(SBGtoPercent)
    .filter(([, v]) => v !== null)
    .sort(([, a], [, b]) => a - b)
  return 1 /* sortedSBG.find(([_, percent]) => finalGrade <= percent)[0] */
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState(defaultGrades)
  const updateGrade = (e, key) => setGrades({ ...grades, ...{ [key]: e.target.value } })
  const finalGrade = calculateGrades(grades, 100)
  const formattedFinalGrade = formatGrade(finalGrade)
  const finalSBG = finalGradeSBG(finalGrade)
  const passing = finalGrade >= 0.6
  return (
    <div>
      <h1>Final Grade Calculator</h1>
      {/* <p>
        Use the dropdowns below to adjust the grades for your standards and citizenship category. Please note that this calculator is not intended to replace your gradebook or communicating with your teacher. Due to certain factors, the grade calculator below may be around 1% off from your actual final grade, and as such, the calculator should only be used as a tool to help you understand what you need to do to achieve the grade level you desire.
      </p> */}
      <p>
        Based on what you've currently entered, your Expected Final Grade is:
        <br />
        <h5 className="text-lg">
          SBG {finalSBG} ({formattedFinalGrade}), which is
          <strong className={passing ? '!text-green-600' : '!text-red-600'}>
            {passing ? ' passing' : ' failing'}
          </strong>
          .
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
      <div className="my-2">
        <input id="citizenship-points" />
        <label htmlFor="citizenship-points" className="ml-5">
          Citizenship Points
        </label>
      </div>
      <div className="my-2">
        <input id="citizenship-total" />
        <label htmlFor="citizenship-total" className="ml-5">
          Total Points
        </label>
      </div>
    </div>
  )
}

export default GradeCalculator
