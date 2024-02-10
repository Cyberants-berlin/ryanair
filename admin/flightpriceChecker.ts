import { airports, fares, flights } from '@2bad/ryanair'
import { writeFileSync } from 'fs'

const datesToCheckArray = [
    {'start': '2024-02-09', 'end': '2024-02-11'},
    {'start': '2024-02-16', 'end': '2024-02-18'},
    {'start': '2024-02-23', 'end': '2024-02-25'},
    {'start': '2024-03-01', 'end': '2024-03-03'},
    {'start': '2024-03-08', 'end': '2024-03-10'},
    {'start': '2024-03-15', 'end': '2024-03-17'},
    {'start': '2024-03-22', 'end': '2024-03-24'},
    {'start': '2024-03-29', 'end': '2024-03-31'},
    {'start': '2024-04-05', 'end': '2024-04-07'},
    {'start': '2024-04-12', 'end': '2024-04-14'}
]


const from = 'BER' 
const to = ["ACE", "AGP", "ALC", "ATH", "BCN", "BGY", "BHX", "BLQ", "BRI", "BRU", "BUD", "CDT", "CFU", "CHQ", "CTA", "DBV", "DUB", "EDI", "EMA", "FAO", "FCO", "FUE", "HER", "IBZ", "KGS", "KRK", "KUN", "LIS", "LPA", "LUX", "MAD", "MAN", "MRS", "MXP", "OPO", "OTP", "PFO", "PMI", "PMO", "PSA", "RAK", "RHO", "RIX", "SKG", "SOF", "STN", "TFS", "TGD", "TLL", "TLV", "TRS", "TSF", "VCE", "VLC", "VNO", "ZAD"] 
const currency = 'EUR'
const limit = 10






let allFlights = {}

// loop over all to destinations
for (let i =0 ;i< to.length;i++){
    console.log("Checking destination", to[i])
    console.log(i,"/",to.length)

    let allFaresforDestination = {}
    // loop over all dates to check
    for (let j=0; j<datesToCheckArray.length; j++){
        console.log("Checking date", datesToCheckArray[j].start)
        // get fares for the current destination and date
        let newFare = await fares.findCheapestRoundTrip(from, to[i], datesToCheckArray[j].start, datesToCheckArray[j].end, currency, limit)
        // save newFare to allFaresforDestination
        allFaresforDestination[datesToCheckArray[j].start] = newFare
    }
    // save allFaresforDestination to allFlights
    allFlights[to[i]] = allFaresforDestination
    console.log("Finished destination", to[i])
    
}
// write allFlights to file
writeFileSync('flightFares.json', JSON.stringify(allFlights, null, 2))