# -*- coding: utf-8 -*-
"""nmit_district.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/16RZLaoKxe7TKCZnA3iV7b9L-QkIaKF5m

1.   Remove Extra columns
2.   ((total_individual_registered - total_inoculated) x cases x deaths)/(population x population x population)
"""

import numpy as np
import pandas as pd

df = pd.read_csv("cowin_vaccine_data_districtwise.csv")
cols = list(df.columns[:6]) + [col for i, col in enumerate(df.columns)
                               if (i > 5 and (i-6) % 10 in [0, 2, 3, 4])]
df = df[cols]
print(df)