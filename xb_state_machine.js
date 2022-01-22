const XB_INSTRUCTIONS = new Map([
  ["s1", ["X", "R", "s2"]],
  ["s2", ["B", "L", "s3"]],
  ["s3", ["B", "R", "s4"]],
  ["s4", ["B", "L", "s1"]],
])

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const renderTape = async (state, tape, head, isChanging = false, waitTime = 444) => {
  await wait(waitTime)
  console.clear()
  const text = [
    ...tape.slice(0, head),
    isChanging ? "␣" : tape[head],
    ...tape.slice(head + 1),
  ].join("")
  console.log(`${state}: ${text}`)
  console.log("^".padStart(head + 1 + 4, " "))
}

const simulate = async (instructions) => {
  const tape = ["B", "B"]
  let head = 0
  let state = "s1"

  while (true) {
    await renderTape(state, tape, head)
    const [newSym, dir, newState] = instructions.get(state)
    await renderTape(state, tape, head, true, 100)
    tape[head] = newSym
    await renderTape(state, tape, head, false)
    head += dir === "R" ? 1 : -1
    state = newState
    await renderTape(state, tape, head)
  }
}

simulate(XB_INSTRUCTIONS)
