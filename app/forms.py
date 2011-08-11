"""
WTForms Documentation:    http://wtforms.simplecodes.com/
Flask WTForms Patterns:   http://flask.pocoo.org/docs/patterns/wtforms/
Flask-WTF Documentation:  http://packages.python.org/Flask-WTF/

Forms for your application can be stored in this file.
"""

from flaskext.wtf import Form, SubmitField, TextField, SelectField

from select_fields import YEAR_LIST, COUNTRY_CODES, DISASTER_TYPES


class ExploreDataForm(Form):
    """A form for requesting data to explore disasters in countries."""
    year = SelectField('Year', choices=YEAR_LIST)
    country = SelectField('Country', choices=COUNTRY_CODES)
    disaster_type = SelectField('Disaster Type', choices=DISASTER_TYPES)
    submit = SubmitField('Submit')
