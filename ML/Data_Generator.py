import random
import numpy as np
import pandas as pd
latitude=[]
longitude=[]
for i in range(30):
    latitude.append(random.uniform(12.967488,12.969))
    longitude.append(random.uniform(79.154118,79.1682))
latitude=np.array(latitude)
longitude=np.array(longitude)
d={'col1':latitude,'col2':longitude}
data=pd.DataFrame(data=d)
data.to_csv('Random.csv')