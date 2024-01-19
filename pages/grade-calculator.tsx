import { useState } from 'react'

interface GradeCategory {
  name: string
}

interface SBGCategory extends GradeCategory {
  val: number
}

interface PointsCategory extends GradeCategory {
  val: number
  max: number
}

const STANDARDS_PERCENT = 0.95

const CITIZENSHIP_PERCENT = 0.05

const SEMESTER_A = {
  STANDARDS: 9,
}
const SEMESTER_B = {
  STANDARDS: 10,
}
const CURRENT_SEMESTER = SEMESTER_B

const SBGtoPercent = {
  'N/A': -1,
  '0': 0,
  '0.5': 0.25,
  '1': 0.55,
  '2': 0.74,
  '3': 0.89,
  '4': 1,
}

const Semester_Standards: SBGCategory[] = [
  ...[...Array(CURRENT_SEMESTER.STANDARDS).keys()].map((v) => ({
    name: `Standard ${v + 1}`,
    val: -1,
  })),
]

const Semester_Citizenship: PointsCategory = {
  name: 'Citizenship',
  val: 5,
  max: 5,
}

const calculateGrades = (rawGrades: SBGCategory[], citizenship: PointsCategory) => {
  const finalCitizenship = (CITIZENSHIP_PERCENT * citizenship.val) / citizenship.max
  const grades = rawGrades.filter((v) => v.val != -1)
  if (!grades.length) return finalCitizenship
  const finalStandardGrade =
    (STANDARDS_PERCENT * grades.reduce((acc, { val }) => acc + val, 0)) / grades.length
  const finalGrade = finalStandardGrade + finalCitizenship
  return finalGrade
}

const formatGrade = (rawGrade: number) =>
  Number(rawGrade).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })

const finalGradeSBG = (finalGrade: number) => {
  const sortedSBG = Object.entries(SBGtoPercent)
    .filter(([, v]) => v !== null)
    .sort(([, a], [, b]) => a - b)
  const foundSBG = sortedSBG.find(([_, percent]) => finalGrade <= percent + 0.005)
  return foundSBG?.[0] ?? 'N/A'
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState(Semester_Standards)
  const [citizenship, setCitizenship] = useState(Semester_Citizenship)
  const updateGrade = (e, key) =>
    setGrades(grades.map((v, i) => (i != key ? v : { ...v, val: Number(e.target.value) })))
  const updateCitizenship = (e, type) => setCitizenship({ ...citizenship, [type]: e.target.value })
  const finalGrade = calculateGrades(grades, citizenship)
  const formattedFinalGrade = formatGrade(finalGrade)
  const finalSBG = finalGradeSBG(finalGrade)
  const passing = finalGrade >= 0.6
  return (
    <div>
      <h1>Final Grade Calculator</h1>
      <p>
        Use the dropdowns below to adjust the grades for your standards and citizenship category.
        Please note that this calculator is not intended to replace your gradebook or communicating
        with your teacher. Due to certain factors, the grade calculator below may be around 1% off
        from your actual final grade, and as such, the calculator should only be used as a tool to
        help you understand what you need to do to achieve the grade level you desire.
      </p>
      <p>
        Based on what you've currently entered, your Expected Grade is:
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
            {Object.entries(SBGtoPercent)
              .sort(([_, a], [__, b]) => a - b)
              .map(([sbg_name, sbg_value]) => (
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
        <input
          type="number"
          size={4}
          max={citizenship.max}
          id="citizenship-points"
          value={citizenship.val}
          onChange={(e) => updateCitizenship(e, 'val')}
          className="text-gray-900"
        />
        <label htmlFor="citizenship-points" className="ml-5">
          Citizenship Points
        </label>
      </div>
      <div className="my-2">
        <input
          type="number"
          size={4}
          id="citizenship-total"
          value={citizenship.max}
          onChange={(e) => updateCitizenship(e, 'max')}
          className="text-gray-900"
        />
        <label htmlFor="citizenship-total" className="ml-5">
          Total Citizenship Points
        </label>
      </div>
    </div>
  )
}

export default GradeCalculator
