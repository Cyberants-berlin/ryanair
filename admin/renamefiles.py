import os

def rename_images(base_path):
    for city in os.listdir(base_path):
        city_path = os.path.join(base_path, city)
        if os.path.isdir(city_path):
            # Check and delete .gitignore if it exists
            gitignore_path = os.path.join(city_path, '.gitignore')
            if os.path.isfile(gitignore_path):
                os.remove(gitignore_path)
                print(f"Deleted {gitignore_path}")

            i = 1
            for filename in os.listdir(city_path):
                file_path = os.path.join(city_path, filename)
                if os.path.isfile(file_path) and file_path.endswith('.jpg'):
                    new_filename = f"{city.lower()}_{i}.jpg"
                    new_file_path = os.path.join(city_path, new_filename)
                    os.rename(file_path, new_file_path)
                    i += 1
                    print(f"Renamed {file_path} to {new_file_path}")

# Set the base path to your cityImages folder
base_path = '/home/rene/typescript/ryanair/ryanair/public/cityImages'
rename_images(base_path)
