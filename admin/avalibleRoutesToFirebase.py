import  firebase_admin
from  firebase_admin  import  credentials,  firestore
import  requests

cred  =  credentials.Certificate('ryanair/admin/ryanair-4cd15-firebase-adminsdk-kdyqz-8d89a1c3c7.json')
firebase_admin.initialize_app(cred)

db  =  firestore.client()


url  =  'https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/BER'
response  =  requests.get(url)
data  =  response.json()

def  save_data_to_firestore(routes):
        for  route  in  routes:
                arrival_airport  =  route['arrivalAirport']
                #  Prepare  document  data  according  to  the  schema
                document_data  =  {
                        'arrivalAirport':  {
                                'code':  arrival_airport['code'],
                                'name':  arrival_airport['name'],
                                'seoName':  arrival_airport['seoName'],
                                'aliases':  arrival_airport.get('aliases',  []),
                                'base':  arrival_airport['base'],
                                'city':  {
                                        'name':  arrival_airport['city']['name'],
                                        'code':  arrival_airport['city']['code'],
                                        #  macCode  is  not  provided  in  the  example;  add  it  if  available
                                        'macCode':  arrival_airport['city'].get('macCode',  '')
                                },
                                'region':  {
                                        'name':  arrival_airport['region']['name'],
                                        'code':  arrival_airport['region']['code']
                                },
                                'country':  {
                                        'code':  arrival_airport['country']['code'],
                                        'iso3code':  arrival_airport['country']['iso3code'],
                                        'name':  arrival_airport['country']['name'],
                                        'currency':  arrival_airport['country']['currency'],
                                        'defaultAirportCode':  arrival_airport['country']['defaultAirportCode'],
                                        'schengen':  arrival_airport['country']['schengen']
                                },
                                'coordinates':  {
                                        'latitude':  arrival_airport['coordinates']['latitude'],
                                        'longitude':  arrival_airport['coordinates']['longitude']
                                },
                                'timeZone':  arrival_airport['timeZone']
                        },
                        'recent':  route['recent'],
                        'seasonal':  route['seasonal'],
                        'operator':  route['operator'],
                        'tags':  route.get('tags',  [])
                }

                #  Create  or  update  the  document  in  Firestore
                doc_ref  =  db.collection('routes').document(arrival_airport['code'])
                doc_ref.set(document_data)


save_data_to_firestore(data)
print('Data  saved  to  Firestore')

