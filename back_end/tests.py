import unittest
import sys
sys.path.append('..')
from datetime import datetime
import sirius_orbit_monitor as som
import numpy as np

class TestSOM(unittest.TestCase):

    def test_load_json(self):
        for axis in ['X', 'Y']:
            for magnet in ['C', 'D', 'Q', 'S']:
                data = som.load_json(magnet+"_kick"+axis)
                self.assertIsNotNone(data)

    def test_corr_per_group(self):
        test_data = som.load_json("C_kickX")
        data_cod = test_data['groups']['CH']['SI-01C1:MA-CH']
        cod_test = data_cod['codx'] + data_cod['cody']
        corr = som.corr_per_group(cod_test, test_data['groups'], {}, 'X')
        self.assertIsNotNone(corr)

    def test_calc_corr(self):
        test_data = som.load_json("C_kickX")
        data_cod = test_data['groups']['CH']['SI-01C1:MA-CH']
        cod_test = data_cod['codx'] + data_cod['cody']
        corr = som.calc_correlation(self, cod_test, ['C_kick'], True)
        self.assertIsNotNone(corr)

    def test_get_time(self):
        start, end = som.get_time("2020-03-05T10:11:43.123Z", "2020-03-05T15:11:43.123Z")
        self.assertIsInstance(start, datetime)
        self.assertIsInstance(end, datetime)

    def test_normalize(self):
        norm_array = som.normalized_array([1, 7, 4, 5, 10])
        norm = np.linalg.norm(norm_array)
        self.assertEqual(norm, 1)

    def test_read_signatures(self):
        sign = som.read_signatures(self, ['SI-01C3:MA-CH', 'X', 'C'], True)
        self.assertIsNotNone(sign)

if __name__ == '__main__':
    unittest.main()
