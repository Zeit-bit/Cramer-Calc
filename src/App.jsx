import { useState } from "react"
import { MathJaxContext, MathJax } from "better-react-mathjax"

const App = () => {
  const [size, setSize] = useState(3)
  const [matrix, setMatrix] = useState(null)
  const [augmentation, setAugmentation] = useState(null)
  const [solve, setSolve] = useState(false)
  const [stepByStep, setStepByStep] = useState(true)

  const CreateEmptyMatrix = (size) => {
    const matrix = new Array()
    for (let i = 0; i < size; i++) {
      matrix.push(new Array())
      while (matrix[i].length < size) matrix[i].push("")
    }
    return matrix
  }

  const CreateEmptyAugmentation = (size) => {
    const augmentation = new Array()
    for (let i = 0; i < size; i++) {
      augmentation.push("")
    }
    return augmentation
  }

  const MapMatrix = (matrix) => {
    return (
      <div className="flex size-94 flex-col gap-2 border-4 p-2">
        {matrix.map((row, rIndex) => (
          <div key={`row-${rIndex}`} className="flex grow gap-2">
            {row.map((col, cIndex) => (
              <input
                className="size-full border-2 text-center"
                type="text"
                key={`row-${rIndex}_col-${cIndex}`}
                value={col}
                placeholder="0"
                required
                onChange={(e) => {
                  HandleMatrix(e, rIndex, cIndex)
                }}
              ></input>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const MapAugmentation = (augmentation) => {
    return (
      <div
        className="flex h-94 flex-col gap-2 border-4 p-2"
        style={{ width: `${376 / size + 2 * 4}` + "px" }}
      >
        <div className="flex grow flex-col gap-2">
          {augmentation.map((row, rIndex) => (
            <input
              className="size-full border-2 text-center"
              type="text"
              key={`a_row-${rIndex}`}
              value={row}
              placeholder="0"
              required
              onChange={(e) => {
                HandleAugmentation(e, rIndex)
              }}
            ></input>
          ))}
        </div>
      </div>
    )
  }

  const HandleMatrix = (e, rIndex, cIndex) => {
    const input = e.target.value
    if (
      Number(input).toString() === "NaN" &&
      !(input[0] === "-" && input.length <= 1)
    ) {
      console.log("invalid")
      return
    }
    const matrixCopy = matrix.map((row) => [...row])
    matrixCopy[rIndex][cIndex] = input
    setMatrix(matrixCopy)
  }

  const HandleAugmentation = (e, rIndex) => {
    const input = e.target.value
    if (
      Number(input).toString() === "NaN" &&
      !(input[0] === "-" && input.length <= 1)
    ) {
      console.log("invalid")
      return
    }
    const augmentationCopy = [...augmentation]
    augmentationCopy[rIndex] = input
    setAugmentation(augmentationCopy)
  }

  const HandleSize = (opt) => {
    const newSize = size + opt
    if (newSize < 2 || newSize > 5) return
    setSize(newSize)
    setMatrix(null)
    setAugmentation(null)
  }

  const HandleSolve = (e) => {
    e.preventDefault()
    setSolve(true)
  }

  const HandleRandomMatrix = () => {
    const matrix = new Array()
    for (let i = 0; i < size; i++) {
      matrix.push(new Array())
      while (matrix[i].length < size)
        matrix[i].push(Math.floor(Math.random() * 100 + 1))
    }
    const augmentation = new Array()
    for (let i = 0; i < size; i++) {
      augmentation.push(Math.floor(Math.random() * 100 + 1))
    }
    setMatrix(matrix)
    setAugmentation(augmentation)
  }

  const emptyMatrix = CreateEmptyMatrix(size)
  const emptyAugmentation = CreateEmptyAugmentation(size)

  !matrix ? setMatrix(emptyMatrix) : null
  !augmentation ? setAugmentation(emptyAugmentation) : null

  const renderingMatrix = MapMatrix(matrix ? matrix : emptyMatrix)
  const renderingAugmentation = MapAugmentation(
    augmentation ? augmentation : emptyAugmentation,
  )

  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="mt-5 border-4 p-2 text-3xl font-bold">
        [ Cramer Calculator ]
      </h1>
      {!solve && (
        <>
          <div className="m-2 mt-8 flex h-8 gap-2">
            <button
              onClick={() => HandleSize(-1)}
              className="flex aspect-square items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500"
            >
              -
            </button>

            <div className="w-20 border-2 text-center">{size}</div>

            <button
              onClick={() => HandleSize(1)}
              className="flex aspect-square items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500"
            >
              +
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="mb-2 flex h-8 items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500"
              onClick={HandleRandomMatrix}
            >
              Random matrix
            </button>
            <button
              className="mb-2 flex h-8 items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500"
              onClick={() => HandleSize(0)}
            >
              Clear matrix
            </button>
          </div>

          <div className="flex flex-col gap-5 border-4 p-5">
            <form onSubmit={(e) => HandleSolve(e)}>
              <div className="flex gap-4">
                {renderingMatrix}
                {renderingAugmentation}
              </div>
              <button className="m-auto mt-5 flex w-full items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500">
                Solve
              </button>

              <input
                type="checkbox"
                checked={stepByStep}
                onChange={() => setStepByStep(!stepByStep)}
              />
              <label> Step by step</label>
            </form>
          </div>
        </>
      )}
      {solve ? (
        <Solution
          matrix={matrix}
          augmentation={augmentation}
          GoBack={() => setSolve(false)}
          stepByStep={stepByStep}
        />
      ) : null}
    </div>
  )
}

const Solution = ({ matrix, augmentation, GoBack, stepByStep }) => {
  const integerMatrix = matrix.map((r) => r.map((c) => parseFloat(c)))
  const integerAugmentation = augmentation.map((r) => parseFloat(r))
  const deltasInfo = []

  const Matrix2Latex = (matrix) => {
    let latex = ""
    const rows = matrix.map((r) => {
      let update = ""
      for (let i = 0; i < matrix.length; i++) {
        update += `${r[i]}${i < matrix.length - 1 ? " & " : ""}`
      }
      return update
    })

    for (let i = 0; i < matrix.length; i++) {
      latex += `${rows[i]}${i < matrix.length - 1 ? " \\\\ " : ""}`
    }

    return `\\left| \\begin{matrix} ${latex} \\end{matrix} \\right|`
  }

  const AugmentedMAtrix2Latex = (matrix, augmentation) => {
    let latex = ""
    const rows = matrix.map((r, rI) => {
      let update = ""
      for (let i = 0; i < matrix.length; i++) {
        update += `${r[i]}${" & "}`
      }
      update += augmentation[rI]
      return update
    })

    for (let i = 0; i < matrix.length; i++) {
      latex += `${rows[i]}${i < matrix.length - 1 ? " \\\\ " : ""}`
    }

    let formatAugmentation = ""
    for (let i = 0; i < matrix.length + 2; i++) {
      formatAugmentation += `${i == matrix.length ? "|" : "r"}`
    }
    return `\\left[ \\begin{array}{${formatAugmentation}} ${latex} \\end{array} \\right]`
  }

  const GetDet = (matrix, path, name = "") => {
    const classStyle = "border p-2 ml-10 mr-10 mt-2 md-2"
    const makeKey = () => path.join("-")

    if (matrix.length === 1) {
      return (
        <div className={classStyle}>
          <MathJax>{`\\[${name} ${Matrix2Latex(matrix)} = ${matrix[0][0]}\\]`}</MathJax>
        </div>
      )
    }
    if (matrix.length === 2) {
      const result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
      const steps = `${matrix[0][0]} * ${matrix[1][1]} - ${matrix[0][1]} * ${matrix[1][0]}`
      return [
        result,
        <div className={classStyle}>
          <MathJax>{`\\[${name} ${Matrix2Latex(matrix)} = ${steps} = ${result}\\]`}</MathJax>
        </div>,
      ]
    }
    if (matrix.length === 3) {
      const result =
        matrix[0][0] * matrix[1][1] * matrix[2][2] +
        matrix[1][0] * matrix[2][1] * matrix[0][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] -
        (matrix[0][2] * matrix[1][1] * matrix[2][0] +
          matrix[1][2] * matrix[2][1] * matrix[0][0] +
          matrix[0][1] * matrix[1][0] * matrix[2][2])
      const steps = `
        (${matrix[0][0]} * ${matrix[1][1]} * ${matrix[2][2]} +
        ${matrix[1][0]} * ${matrix[2][1]} * ${matrix[0][2]} +
        ${matrix[0][1]} * ${matrix[1][2]} * ${matrix[2][0]}) -
        (${matrix[0][2]} * ${matrix[1][1]} * ${matrix[2][0]} +
          ${matrix[1][2]} * ${matrix[2][1]} * ${matrix[0][0]} +
          ${matrix[0][1]} * ${matrix[1][0]} * ${matrix[2][2]})`
      console.log(`${makeKey()}`)
      return [
        result,
        <div className={classStyle} key={`${makeKey()}`}>
          <MathJax>{`\\[${name} ${Matrix2Latex(matrix)} = ${steps} = ${result} \\]`}</MathJax>
        </div>,
      ]
    }

    let steps = `\\[${name} ${Matrix2Latex(matrix)} = `
    const children = []
    let result = 0

    const removedRow = matrix.filter((_, rI) => rI != 0)
    for (let i = 0; i < matrix.length; i++) {
      const sign = i % 2 === 0 ? +1 : -1
      const minor = removedRow.map((r) => r.filter((_, cI) => cI != i))
      steps += `${sign === +1 ? "+" : "-"} ${matrix[0][i]} ${Matrix2Latex(minor)}`
      const [childrenResult, childrenJSX] = GetDet(minor, [...path, String(i)])
      children.push(childrenJSX)
      result += sign * matrix[0][i] * childrenResult
    }
    steps += `= ${result} \\]`

    console.log(`${makeKey()}`)
    return [
      result,
      <DetStep key={`${makeKey()}`} latex={steps} children={children} />,
    ]
  }

  const GetSolutionMatrixes = (matrix, augmentation) => {
    const arrayOfMatrix = []
    for (let i = 0; i < matrix.length; i++) {
      arrayOfMatrix.push(
        matrix.map((r, rI) =>
          r.map((c, cI) => (cI === i ? augmentation[rI] : c)),
        ),
      )
    }
    return arrayOfMatrix
  }

  const solutionMatrixes = GetSolutionMatrixes(
    integerMatrix,
    integerAugmentation,
  )

  deltasInfo.push(GetDet(integerMatrix, ["Delta"], "\\Delta = "))
  const cramerStepsToRender = solutionMatrixes.map((m, mI) => {
    const deltaInfo = GetDet(m, [`DeltaX${mI + 1}`], `\\Delta x${mI + 1} =`)
    deltasInfo.push(deltaInfo)
    return (
      <CramerStep
        key={`CramerStep-${mI}`}
        name={`\\Delta x${mI + 1} =`}
        matrix={m}
        deltaInfo={deltaInfo}
        Matrix2Latex={Matrix2Latex}
      />
    )
  })

  const deltas = deltasInfo.map((pair) => pair[0])
  const soluciones = deltas.map((d, dI) =>
    dI != 0 ? (
      <CramerDeltaStep
        key={`sol-${dI}`}
        delta={deltas[0]}
        deltaX={d}
        xIndex={dI}
      />
    ) : null,
  )

  return (
    <>
      <button
        className="mt-5 border pr-2 pl-2 hover:bg-gray-200 active:bg-gray-400"
        onClick={GoBack}
      >
        Back
      </button>
      <div className="m-5 min-w-9/12 overflow-scroll border-4 p-2">
        <MathJaxContext>
          <h2 className="border p-2 font-bold">Input</h2>
          <CramerInput
            matrix={integerMatrix}
            augmentation={integerAugmentation}
            AugmentedMAtrix2Latex={AugmentedMAtrix2Latex}
          />

          {stepByStep ? (
            <>
              <h2 className="border p-2 font-bold">Steps</h2>
              <CramerStep
                matrix={integerMatrix}
                deltaInfo={deltasInfo[0]}
                Matrix2Latex={Matrix2Latex}
                name={"\\Delta ="}
              />
              {deltas[0] !== 0 ? (
                <>
                  {cramerStepsToRender}
                  <h2 className="mt-4 border p-2 font-bold">Solutions</h2>
                  {soluciones}
                </>
              ) : (
                <CantSolve />
              )}
            </>
          ) : (
            <>
              {deltas[0] !== 0 ? (
                <>
                  <h2 className="mt-4 border p-2 font-bold">Solutions</h2>
                  {soluciones}
                </>
              ) : (
                <CantSolve />
              )}
            </>
          )}
        </MathJaxContext>
      </div>
    </>
  )
}

const CantSolve = () => {
  return (
    <div className="m-2 mt-4 border p-2 text-center">
      <h2>
        <strong>No se puede resolver</strong> porque el{" "}
        <strong>determinante</strong> de la matriz original es{" "}
        <strong>cero</strong>
      </h2>
    </div>
  )
}

const CramerDeltaStep = ({ delta, deltaX, xIndex }) => {
  const result = deltaX / delta
  return (
    <MathJax>
      {`\\[
            x${xIndex} = \\frac{\\Delta x${xIndex}}{\\Delta} = ${result}
        \\]`}
    </MathJax>
  )
}

const CramerInput = ({ matrix, augmentation, AugmentedMAtrix2Latex }) => {
  return (
    <MathJax>
      {`\\[
            ${AugmentedMAtrix2Latex(matrix, augmentation)}
          \\]`}
    </MathJax>
  )
}

const CramerStep = ({ matrix, deltaInfo, Matrix2Latex, name }) => {
  //const [deltaResult, deltaRender] = GetDet(matrix, 1, name)
  const [deltaResult, deltaRender] = deltaInfo
  const [showDelta, setShowDelta] = useState(false)
  return (
    <>
      <MathJax>
        {`\\[
            ${name} ${Matrix2Latex(matrix)} = ${deltaResult}
          \\]`}
      </MathJax>

      <button
        className="border pr-2 pl-2 hover:bg-gray-200 active:bg-gray-400"
        onClick={() => setShowDelta(!showDelta)}
      >
        {!showDelta ? "show details" : "hide details"}
      </button>
      {showDelta && deltaRender}
    </>
  )
}

const DetStep = ({ latex, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-2 mr-10 ml-10 border p-2">
      <MathJax>{latex}</MathJax>
      <button
        onClick={() => setOpen(!open)}
        className="mb-2 border px-2 hover:bg-gray-200 active:bg-gray-400"
      >
        {open ? "hide details" : "show details"}
      </button>
      {open && children}
    </div>
  )
}

export default App
