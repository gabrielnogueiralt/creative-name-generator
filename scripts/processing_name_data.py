# Imports
from lib2to3.pgen2 import token
from collections import defaultdict
import pandas as pd
import unidecode
import nltk as nltk
from scipy import spatial
from nltk.corpus import stopwords
import numpy as np
import spacy
import re

# Get Data
boys = pd.read_csv('scripts/data/boys.csv')
girls = pd.read_csv('scripts/data/girls.csv')

brute_boys = boys['meaning']
brute_girls = girls['meaning']

# Pre-processing
simple_boys = [unidecode.unidecode(txt) for txt in brute_boys]
simple_girls = [unidecode.unidecode(txt) for txt in brute_girls]

nlp = spacy.load("pt_core_news_lg", disable=['ner', 'parser'])

def cleaning(doc):
    txt = [token.lemma_ for token in doc if not token.is_stop]
    if len(txt) > 2:
        return ' '.join(txt)

brief_cleaning_boys = (re.sub("[^A-Za-z']+", ' ', str(row)).lower() for row in simple_boys)
brief_cleaning_girls = (re.sub("[^A-Za-z']+", ' ', str(row)).lower() for row in simple_girls)

cleaning_boys = [cleaning(doc) for doc in nlp.pipe(brief_cleaning_boys, batch_size=1000)]
cleaning_girls = [cleaning(doc) for doc in nlp.pipe(brief_cleaning_girls, batch_size=1000)]

boys['clean'] = cleaning_boys
girls['clean'] = cleaning_girls

boys['w2v'] = [doc.vector for doc in nlp.pipe(cleaning_boys, batch_size=1000)]
girls['w2v'] = [doc.vector for doc in nlp.pipe(cleaning_girls, batch_size=1000)]

# print(boys['clean'][0])
# print(boys['clean'][4])
# print(spatial.distance.cosine(boys['w2v'][0], boys['w2v'][0]))

boys.to_csv('scripts/data/final_boys.csv', sep='\t', encoding='utf-8')
girls.to_csv('scripts/data/final_girls.csv', sep='\t', encoding='utf-8')



