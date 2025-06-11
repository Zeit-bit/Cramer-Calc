import { Link } from "react-router-dom"

const Quickguide = () => {
  const style = "m-10 border p-5"
  const titleStyle = "font-bold"
  return (
    <>
      {/* -- 1. What Cramer’s Rule Is -- */}
      <Link to={"/"}>
        <button className="mt-5 ml-10 border pr-2 pl-2 hover:bg-gray-200 active:bg-gray-400">
          Go back
        </button>
      </Link>
      <div className={style}>
        <h2 className={titleStyle}>Overview of Cramer’s Rule</h2>
        <p>
          Cramer’s Rule is a direct method for solving a system of <em>n</em>{" "}
          linear equations with <em>n</em> unknowns expressed in matrix form{" "}
          <strong>A&nbsp;x&nbsp;=&nbsp;b</strong>. It provides each unknown{" "}
          <code>
            x<sub>i</sub>
          </code>{" "}
          as a quotient of two determinants:
          <br />
          <code>
            x<sub>i</sub> = Δx<sub>i</sub> / Δ
          </code>
        </p>
      </div>

      {/* -- 2. When the Method Works (and When It Doesn’t) -- */}
      <div className={style}>
        <h2 className={titleStyle}>Prerequisites &amp; Limitations</h2>
        <ul>
          <li>
            The coefficient matrix <strong>A</strong> must be{" "}
            <strong>square</strong>: the system needs exactly the same number of
            equations and unknowns (<em>n&nbsp;×&nbsp;n</em>).
          </li>
          <li>
            The determinant of <strong>A</strong>, written{" "}
            <code>Δ&nbsp;=&nbsp;det(A)</code>, must be <strong>non-zero</strong>
            . If <code>Δ&nbsp;=&nbsp;0</code>, the system is either dependent
            (infinitely many solutions) or inconsistent (no solution), and
            Cramer’s Rule cannot be applied.
          </li>
        </ul>
      </div>

      {/* -- 3. Step-by-Step Procedure -- */}
      <div className={style}>
        <h2 className={titleStyle}>Step-by-Step Solution</h2>
        <ol>
          <li>
            <strong>Compute the main determinant.</strong>
            <br />
            Find <code>Δ&nbsp;=&nbsp;det(A)</code>.
          </li>
          <li>
            <strong>Create the column-replaced matrices.</strong>
            <br />
            For each unknown{" "}
            <code>
              x<sub>i</sub>
            </code>
            , build a new matrix
            <strong>
              &nbsp;A<sub>i</sub>
            </strong>{" "}
            by replacing the <em>i-th</em> column of
            <strong>&nbsp;A</strong> with the constant vector <strong>b</strong>
            .
          </li>
          <li>
            <strong>Compute each auxiliary determinant.</strong>
            <br />
            <code>
              Δx<sub>i</sub> = det(A<sub>i</sub>)
            </code>{" "}
            for every <em>i</em>.
          </li>
          <li>
            <strong>Find the unknowns.</strong>
            <br />
            Use{" "}
            <code>
              x<sub>i</sub> = Δx<sub>i</sub> / Δ
            </code>{" "}
            for <em>i&nbsp;=&nbsp;1&nbsp;…&nbsp;n</em>.
          </li>
        </ol>
      </div>

      {/* -- 4. Determinant of a 2×2 Matrix -- */}
      <div className={style}>
        <h2 className={titleStyle}>
          Determinant of a&nbsp;2&nbsp;×&nbsp;2 Matrix
        </h2>
        <p>
          For <code>A&nbsp;=&nbsp;[[a,&nbsp;b],&nbsp;[c,&nbsp;d]]</code> the
          determinant is
          <code>&nbsp;det(A)&nbsp;=&nbsp;ad&nbsp;−&nbsp;bc</code>.
        </p>
        <img
          className="h-90 border"
          src="./images/2by2.png"
          alt="2by2-example"
        />
      </div>

      {/* -- 5. Determinant of a 3×3 Matrix: Rule of Sarrus -- */}
      <div className={style}>
        <h2 className={titleStyle}>
          Determinant of a&nbsp;3&nbsp;×&nbsp;3 Matrix — Sarrus’ Triangle
        </h2>
        <p>
          For{" "}
          <code>
            A&nbsp;=&nbsp;[[a,&nbsp;b,&nbsp;c],&nbsp;[d,&nbsp;e,&nbsp;f],&nbsp;[g,&nbsp;h,&nbsp;i]]
          </code>
          :
        </p>
        <pre>{`
Δ = a·e·i + b·f·g + c·d·h   −   c·e·g + b·d·i + a·f·h
`}</pre>
        <p>
          The “triangle” mnemonic: write the first two columns again to the
          right, draw downward (positive) and upward (negative) diagonals, then
          subtract the upward sum from the downward sum.
        </p>
        <img
          className="h-90 border"
          src="./images/sarrus.png"
          alt="sarrus-example"
        />
      </div>

      {/* -- 6. Determinant of Any Size: Cofactor Expansion -- */}
      <div className={style}>
        <h2 className={titleStyle}>Determinant via Cofactor Expansion</h2>
        <p>
          For an <em>n&nbsp;×&nbsp;n</em> matrix, choose any row or column and
          expand:
        </p>
        <pre>{`
det(A) = Σ (-1)^{i+j} · a_{ij} · det(M_{ij})
`}</pre>
        <p>
          where{" "}
          <code>
            M<sub>ij</sub>
          </code>{" "}
          is the minor obtained by deleting row&nbsp;<em>i</em> and column&nbsp;
          <em>j</em>. Repeat recursively until reaching 2&nbsp;×&nbsp;2
          determinants. This method works for all sizes, although it becomes
          computationally expensive for large <em>n</em>.
        </p>
        <img
          className="h-90 border"
          src="./images/cofactors.png"
          alt="cofactors-example"
        />
      </div>

      {/* -- 7. Putting It All Together -- */}
      <div className={style}>
        <h2 className={titleStyle}>Summary</h2>
        <p>
          1.&nbsp;Confirm that the coefficient matrix is square and{" "}
          <code>det(A)&nbsp;≠&nbsp;0</code>.
          <br />
          2.&nbsp;Compute <code>Δ</code> using an appropriate determinant
          technique.
          <br />
          3.&nbsp;Form each{" "}
          <code>
            A<sub>i</sub>
          </code>
          , find{" "}
          <code>
            Δ<sub>i</sub>
          </code>
          , and divide by <code>Δ</code> to obtain every unknown.
          <br />
          4.&nbsp;If <code>Δ&nbsp;=&nbsp;0</code>, stop — Cramer’s Rule cannot
          solve the system.
        </p>
      </div>
    </>
  )
}

export default Quickguide
