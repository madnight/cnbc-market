import test from 'ava'
import cnbcMarket from "./index.js"

test('main', async t => {
    const r = await cnbcMarket()

    t.true(r.map(x => x.symbol).includes("US10Y"))
    t.true(r.map(x => x.symbol).includes(".GDAXI"))

    t.true(r.map(x => x.name).includes("EUR/USD"))
    t.true(r.map(x => x.name).includes("S&P 500 Index"))
    t.true(r.map(x => x.name).includes("NASDAQ Composite"))
})
