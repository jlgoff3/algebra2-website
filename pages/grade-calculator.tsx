import { useState } from 'react'

const STANDARD_PERCENT = 0.095
const CITIZENSHIP_PERCENT = 0.05

enum SBG {
  'N/A' = -1,
  '0 - No Evidence' = 0,
  '.5 - Limited Evidence' = 0.25,
  '1 - Beginning' = 0.55,
  '2 - Approaching' = 0.74,
  '3 - Proficient' = 0.89,
  '4 - Excelling' = 1
}

const SBGtoPercent = {
  'N/A': -1,
  '0': 0,
  '0.5': 0.25,
  '1': 0.55,
  '2': 0.74,
  '3': 0.89,
  '4': 1,
}

interface GradeCategory {
  name: string,
  weight: number
}

interface SBGCategory extends GradeCategory {
  val: number
}

interface PointsCategory extends GradeCategory {
  val: number,
  max: number
}

interface Gradebook {
  standards: SBGCategory[],
  citizenship: PointsCategory
}

let SemesterA_Standards: SBGCategory[] = [
  {
    name: 'Standard 1',
    weight: .11,
    val: -1
  },
  ...[...Array(8).keys()].map(v => ({
    name: `Standard ${v + 2}`,
    weight: .105,
    val: -1
  }))
]

const SemesterA_Citizenship: PointsCategory = {
  name: 'Citizenship',
  val: 5,
  max: 5,
  weight: CITIZENSHIP_PERCENT
}

const calculateGrades = (rawGrades: SBGCategory[], citizenship: PointsCategory) => {
  const grades = rawGrades.filter(v => v.val != -1)
  const partial =
    grades.reduce((acc, { val, weight }) => acc + (val * weight), 0) +
    CITIZENSHIP_PERCENT * citizenship.val / citizenship.max
  const correction_factor = grades.reduce((acc, {weight}) => acc + weight, CITIZENSHIP_PERCENT)
  const finalGrade = partial / correction_factor
  return finalGrade
}

const formatGrade = (rawGrade: number) =>
  Number(rawGrade).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })

const finalGradeSBG = (finalGrade: number) => {
  const sortedSBG = Object.entries(SBGtoPercent)
    .filter(([, v]) => v !== null)
    .sort(([, a], [, b]) => a - b)
  return sortedSBG.find(([_, percent]) => finalGrade <= percent)[0]
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState(SemesterA_Standards)
  const [citizenship, setCitizenship] = useState(SemesterA_Citizenship)
  const updateGrade = (e, key) => setGrades(grades.map((v, i) => i != key ? v : { ...v, val: Number(e.target.value) }))
  // TODO: Sanity check for numbers
  const updateCitizenship = (e, type) => setCitizenship({ ...citizenship, [type]: Number(e.target.value) })
  const finalGrade = calculateGrades(grades, citizenship)
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
      {grades.map((grade, key) => (
        <div key={`${grade.name}-div`} className="my-2">
          <select
            id={`${grade.name}-select`}
            value={grade.val}
            onChange={(e) => updateGrade(e, key)}
            className="text-gray-900"
          >
            {Object.entries(SBGtoPercent).sort(([_, a], [__, b]) => a - b).map(([sbg_name, sbg_value]) => (
              <option key={grade.name + sbg_name} value={sbg_value}>
                {sbg_name}
              </option>
            ))}
          </select>
          <label htmlFor={`${grade.name}-select`} className="ml-5">
            {grade.name}
          </label>
        </div>
      ))}
      <div className="my-2">
        <input id="citizenship-points" value={citizenship.val} onChange={e => updateCitizenship(e, 'val')} />
        <label htmlFor="citizenship-points" className="ml-5">
          Citizenship Points
        </label>
      </div>
      <div className="my-2">
        <input id="citizenship-total" value={citizenship.max} onChange={e => updateCitizenship(e, 'max')} />
        <label htmlFor="citizenship-total" className="ml-5">
          Total Points
        </label>
      </div>
    </div>
  )
}

export default GradeCalculator
