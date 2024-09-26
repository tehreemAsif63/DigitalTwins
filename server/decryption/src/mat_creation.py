from scipy.io import savemat
import os
import pathlib


class MatCreation:
    """
    Class to create the mat files using all the extracted values from the binary files.
    """
    def __init__(self, data_qual_str, data_qual_time, measurement, start_date_time, time_vector, units, files):
        self.data_qual_str = data_qual_str
        self.data_qual_time = data_qual_time
        self.measurement = measurement
        self.start_date_time = start_date_time
        self.time_vector = time_vector
        self.units = units
        self.files = files

    def save_mat(self):
        # Change directory to mat
        mat_path = os.path.join(pathlib.Path(__file__).parent.resolve(), "mat", "")
        os.chdir(mat_path)

        # Iterate over all the files and create a mat file with the corresponding values
        for i in range(len(self.files)):
            mat_dict = {'data_qual_str': self.data_qual_str[self.files[i]],
                        'data_qual_time': self.data_qual_time[self.files[i]],
                        'measurement_data': self.measurement[self.files[i]],
                        'start_date_time': self.start_date_time[0],
                        'time_vector': self.time_vector[self.files[i]],
                        'units': self.units[self.files[i]]}

            savemat(f'{self.files[i][5:] + ".mat"}', mat_dict)
            print(f'Mat File Created: {self.files[i][5:] + ".mat"}')

        # Change directory back to main
        os.chdir(os.path.normpath(os.getcwd() + os.sep + os.pardir))
