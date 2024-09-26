import pathlib
import os


class FolderExtraction:
    """
    Class to extract the data, index and settings file from the overall data folder. This is done since only these
    files are needed to extract the necessary values.
    """
    def __init__(self, folder):
        self.folder = folder

    def extract_folders(self):
        data_files, index_files, settings_files, data_qual_time, data_qual_str, patient_information = [], [], [], [], [], []
        data_path = os.path.join(pathlib.Path(__file__).parent.resolve(), "../encrypted_data", "")
        directory = os.fsencode(data_path)

        # Iterate over all the files in the data directory and check the filename.
        # Based on the filenames separate the necessary files into their associated list.
        # This way we can easily iterate over all the files of a certain type in binary_extraction.
        for file in os.listdir(directory):
            filename = self.folder + os.fsdecode(file)
            if os.fsdecode("NumericQuality") in filename and filename.endswith(",data"):
                data_qual_str.append(filename)
            elif os.fsdecode("Float") in filename and filename.endswith(",data"):
                if os.fsdecode("NumericQuality") in filename:
                    continue
                if os.fsdecode("Alert") in filename:
                    continue
                if os.fsdecode("MarkEvent") in filename:
                    continue
                data_files.append(filename)
            elif os.fsdecode("NumericQuality") in filename and filename.endswith(",index"):
                data_qual_time.append(filename)
            elif os.fsdecode("Float") in filename and filename.endswith(",index"):
                index_files.append(filename)
            elif os.fsdecode("Float") in filename and filename.endswith(",settings"):
                settings_files.append(filename)
            elif filename.endswith(".info"):
                patient_information.append(filename)

        return data_files, index_files, settings_files, data_qual_time, data_qual_str, patient_information
