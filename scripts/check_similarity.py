import pandas as pd
import nltk as nltk
import spacy

boys = pd.read_csv('scripts/data/final_boys.csv')
girls = pd.read_csv('scripts/data/final_girls.csv')

print(boys.head())