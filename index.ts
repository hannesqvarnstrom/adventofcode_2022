
import days from './days'
const day = process.argv[2] as keyof typeof days

const dayFn = days[day]
if (!dayFn) throw new Error('no such day')
const result = await dayFn.default()

console.log(`Result of ${String(day)}: ${result}`)