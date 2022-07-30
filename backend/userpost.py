import numpy as np
import pandas as pd
import pickle
from keras.models import load_model


def getdebate(essay_id):
    train = pd.read_csv('train.csv')
    temp = train.essay_id.value_counts().reset_index()
    temp = temp[temp['essay_id'] > 6]
    essays = temp['index'].to_list()
    filtered_essays = [essay for essay in essays if essay != essay_id]
    indx = np.random.randint(0, len(filtered_essays)-2)
    temp = train[train['essay_id'] == filtered_essays[indx]]
    temp['user'] = 0
    temp = temp.rename(columns={'discourse_text': 'text', 'discourse_type': 'type', 'discourse_effectiveness': 'form'})

    return {'data': temp.to_dict(orient='records')}


def checkStatement(statement):
    with open('tokenizer2.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    model = load_model("debate_model_new3.h5")

    pred = model.predict(tokenizer.texts_to_sequences([statement]))

    forms = ['Adequate', 'Effective', 'Ineffective']

    if len(statement.split()) < 4:
        return {'data': forms[-1]}

    return {'data': forms[np.argmax(pred)]}