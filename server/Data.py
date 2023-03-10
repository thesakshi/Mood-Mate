import firebase_admin
from firebase_admin import db
import pandas as pd
from config import FIREBASE_PATH, DATABASE_URL


def initialize_app():
	cred_obj = firebase_admin.credentials.Certificate(FIREBASE_PATH)
	default_app = firebase_admin.initialize_app(cred_obj, {
		'databaseURL': DATABASE_URL
		})

	ref = db.reference('/')
	return ref

def get_data(ref):
    
	json_format = ref.get()

	df = pd.DataFrame(json_format)
	return df


