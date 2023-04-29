import axios from "axios";
import lodash from "lodash/fp.js";

const { get, map, pipe } = lodash;

export default async function cnbcMarket() {
    const { data } = await axios(
        "https://quote.cnbc.com/quote-html-webservice/" +
            "quote.htm?partnerId=2&requestMethod=quick&exthrs=1&noform=1&fund=1&" +
            "output=jsonp&symbols=.SPX|.IXIC|.FTSE|.N225|.HSI|.SSEC|.VIX|.GDAXI|" +
            "US10Y|US30Y|US5Y|US2Y|US3M|DE10Y-DE|JP10Y-JP|%40CL.1|%40NG.1" +
            "|%40GC.1|%40SI.1|%40W.1|%40HG.1|JPYUSD%3D|.DXY|JPY%3D|GBP%3D|" +
            "EUR%3D|USDCAD|AUD%3D|.RUT|.GSPTSE&callback=quoteHandler1"
    );

    return pipe(
        get("QuickQuoteResult.QuickQuote"),
        map((q) => ({
            symbol: q.symbol,
            name: q.name,
            value: q.last,
            change: q.change,
            changePcnt: q.change_pct,
        }))
    )(data);
}
