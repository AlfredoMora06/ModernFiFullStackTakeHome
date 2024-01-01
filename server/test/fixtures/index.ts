// Docs can be found at: http://city41.github.io/node-sql-fixtures/
// @ts-ignore
import sqlFixtures from 'sql-fixtures'

import {convertStringToValidNumber} from "../../src/utils/validation.js"
import {FixtureTable} from "./util/index.js"
import {db} from "../../src/data/db.js"
import tickerStatisticsFixtures from "./ticker_statistics.js"
import tradeHistoryFixtures from "./trade_history.js"
import tradeFixtures from "./trades.js"


// ** MUST BE ADDED IN ORDER OF FOREIGN KEY DEPENDENCIES
const fixtureTablesOrderedByDependency: FixtureTable[] = [
  tickerStatisticsFixtures,
  tradeHistoryFixtures,
  tradeFixtures,
]

// Allows us easy access to fixtures
let Fixtures: any = {}
export function getFixture(table: string, field?: string, value?: any): any {
  // some flexibility here, can get the entire table or just one row
  const item = field === undefined
    ? Fixtures[table]
    : Fixtures[table]?.find((row: any) => {
      if (typeof value === 'number') {
        return convertStringToValidNumber(row[field]) === value
      }
      return row[field] === value
    })
  if (item === undefined) throw new Error(`cant find this fixture, please double check inputs: ${table} ${field} ${value}`)
  return item
}

const SqlFixturesDataSpec: any[] = fixtureTablesOrderedByDependency.map(
  (ft) => {
    const dataSpec: {[key: string]: any[]} = {}
    dataSpec[ft.tableName] = Object.keys(ft.data).map((key: string) => ft.data[key])
    return dataSpec
  }
)

// Adds fixtures if no fixtures already exist
export async function addFixtures(): Promise<void> {
  // If Fixtures accessor hasnt been cleared yet, then we know it hasnt been flushed
  // -- if not, then we dont do anything
  if (Object.keys(Fixtures).length > 0) return
  // need to reset our Fixtures accessor first
  const fixtureFactory = new sqlFixtures(db)
  for (let dataSpec of SqlFixturesDataSpec) {
    await fixtureFactory.create(dataSpec).then(
      (sqlData: any) => {
        // add new sql data to object
        for (let tableName of Object.keys(sqlData)) {
          Fixtures[tableName] = sqlData[tableName]
        }
      }, // don't need to know if its successful
      (e: any) => {
        console.log('THERE WAS AN ERROR WITH SQL FIXTURES')
        console.log(Object.keys(dataSpec))
        console.log(e)
      }
    )
  }
}

export async function flushFixtures(): Promise<void> {
  // have to flush in reverse order of dependencies
  for (let fixtureTable of fixtureTablesOrderedByDependency.slice().reverse()) {
    // only flush if we should
    if (fixtureTable.alwaysFlush) {
      await db(fixtureTable.tableName).delete()
    }
  }
  // Flush fixtures accessor
  Fixtures = {}
}
