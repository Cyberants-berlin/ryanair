import json
from datetime import datetime

# Path to your JSON file
file_path = 'flightFares.json'

# Reading the JSON file and converting its content to a Python object
with open(file_path, 'r') as file:
    data = json.load(file)

# Now `data` is a Python object containing the data from your JSON file
# Function to check if a date is a Friday or a Sunday
def is_valid_day(date_str):
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')
    weekday = date_obj.weekday()  # 0=Monday, 6=Sunday
    return weekday  # Return the weekday number

# Filter data to keep departures on Friday or Saturday and returns on Saturday or Sunday
filtered_data = {}
for key, values in data.items():
    filtered_flights = []
    for date, flights in values.items():
        for flight in flights:
            departure_day = is_valid_day(flight['departure']['day'])
            return_day = is_valid_day(flight['return']['day'])
            # Check if departure is on Friday (4) or Saturday (5) and return is on Saturday (5) or Sunday (6)
            if departure_day in [4, 5] and return_day in [5, 6]:
                filtered_flights.append(flight)
    if filtered_flights:
        filtered_data[key] = {date: filtered_flights}


# Writing the filtered data to a new JSON file
with open('filteredFlightsWithSaturday.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)

print('Filtered data written to filteredFlightsWithSaturday.json')