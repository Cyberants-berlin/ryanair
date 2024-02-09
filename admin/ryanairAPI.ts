import { airports, fares, flights } from '@2bad/ryanair'
import { writeFileSync } from 'fs'

const from = 'BER' // Dublin airport
const to = ["ACE", "AGP", "ALC", "ATH", "BCN", "BGY", "BHX", "BLQ", "BRI", "BRU", "BUD", "CDT", "CFU", "CHQ", "CTA", "DBV", "DUB", "EDI", "EMA", "FAO", "FCO", "FUE", "HER", "IBZ", "KGS", "KRK", "KUN", "LIS", "LPA", "LUX", "MAD", "MAN", "MRS", "MXP", "OPO", "OTP", "PFO", "PMI", "PMO", "PSA", "RAK", "RHO", "RIX", "SKG", "SOF", "STN", "TFS", "TGD", "TLL", "TLV", "TRS", "TSF", "VCE", "VLC", "VNO", "ZAD"] 


// const trips = await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency, limit)
let allFlights = {}

for (let i =0 ;i< to.length;i++){
     let newDate = await flights.getDates(from, to[i])
    //  save newDate to allFlights
    allFlights[to[i]] = newDate
    console.log(i,"/",to.length)
}
writeFileSync('flights.json', JSON.stringify(allFlights, null, 2))

console.log('done')