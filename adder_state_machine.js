const XB_INSTRUCTIONS = new Map([
  ["s1", ["0", "R", "s2"]],
  // 00
  ["s2", ["1", "S", "s3"]],
  // 01
  ["s3", ["0", "L", "s4"]],
  // 00
  ["s4", ["1", "R", "s5"]],
  // 10
  ["s5", ["1", "S", "s6"]],
  // 11
  ["s6", ["0", "L", "s1"]],
  // 10
])

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const renderTape = async (
  state,
  tape,
  head,
  isChanging = false,
  waitTime = 444,
) => {
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

const simulate = async (tape, head, state, instructions) => {
  await renderTape(state, tape, head)
  while (true) {
    await renderTape(state, tape, head)
    const [newSym, dir, newState] = instructions.get(state)
    await renderTape(state, tape, head, true, 200)
    tape[head] = newSym
    await renderTape(state, tape, head, false)
    head += dir === "R" ? 1 : dir === "S" ? 0 : -1
    state = newState
    await renderTape(state, tape, head)
  }
}

const tape = ["0", "0"]
let head = 0
let state = "s1"

simulate(tape, head, state, XB_INSTRUCTIONS)
