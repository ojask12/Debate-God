from userpost import getdebate, checkStatement
from flask import Flask, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/get-debate')
def get_debate():
    essay_id = request.args.get('essayid')
    
    return getdebate(essay_id)


@app.route('/check-statement')
def check_statement():
    statement = request.args.get('statement')
    
    return checkStatement(statement)