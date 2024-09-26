import scipy.io
import json
import numpy as np

class MatConverter:
    def __init__(self, mat_object):
        self.mat_object = mat_object

    def convert_to_json(self, output_json_path):
        """Convert the .mat file data to .json."""
        if self.mat_object is None:
            print("No data to convert. Please load the .mat file first.")
            return

        try:
            # Convert numpy arrays and bytes to JSON-compatible formats
            data_for_json = {}
            for key, value in self.mat_object.items():
                if isinstance(value, bytes):
                    data_for_json[key] = value.decode()  # Convert bytes to string
                elif isinstance(value, (list, tuple)):
                    data_for_json[key] = list(value)
                elif isinstance(value, np.ndarray):
                    data_for_json[key] = value.tolist()  # Convert numpy arrays to lists
                else:
                    data_for_json[key] = value
            
            # Write data to JSON file
            with open(output_json_path, 'w') as json_file:
                json.dump(data_for_json, json_file, indent=4)
            print(f"Data successfully written to {output_json_path}")
        except Exception as e:
            print(f"Error converting to JSON: {e}")

# Usage
# def main():
#     # binary_file = '../encrypted_data/ABP,Mean,NumericQuality,Integer,IntelliVue,index'
#     mat_file = '../../decrypted_data/ABP,Dias,Numeric,Float,IntelliVue,data.mat'  # Path to the .mat file
#     json_output = '../../decrypted_data/ABP,Dias,Numeric,Float,IntelliVue,data.json'   # Path to save .json file
# 
#     converter = MatConverter(mat_file)
#     converter.load_mat_file()
# 
#     # Convert to JSON
#     converter.convert_to_json(json_output)
# 
# 
# if __name__ == "__main__":
#     main()