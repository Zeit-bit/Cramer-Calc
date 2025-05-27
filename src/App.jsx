import { useState } from "react"

const App = () => {
  const [size, setSize] = useState(3)
  const [matrix, setMatrix] = useState(null)
  const [augmentation, setAugmentation] = useState(null)
  const [solve, setSolve] = useState(false)

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

  const HandleSolve = () => {}

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

      <div className="flex flex-col gap-5 border-4 p-5">
        <div className="flex gap-4">
          {renderingMatrix}
          {renderingAugmentation}
        </div>
        <button
          onClick={() => {
            setSolve(true)
          }}
          className="flex items-center justify-center border-2 p-2 hover:border-blue-700 hover:bg-gray-800 hover:text-white active:bg-blue-500"
        >
          Solve
        </button>
      </div>

      <div className="m-5 border-4 p-2">
        {solve ? <Solution matrix={matrix} /> : <h2>Pasos</h2>}
      </div>
    </div>
  )
}

const Solution = ({ matrix }) => {
  const expMatrix = JSON.stringify(
    matrix.map((row) => row.map((col) => Number(col))),
  )

  return (
    <div>
      <h2>Pasos</h2>
      <p>{expMatrix}</p>
    </div>
  )
}

export default App
