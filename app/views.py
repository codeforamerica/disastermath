"""
Flask Module Docs:  http://flask.pocoo.org/docs/api/#flask.Module

This file is used for both the routing and logic of your
application.
"""

from flask import Module, render_template, request
from forms import ExploreDataForm

views = Module(__name__, 'views')


@views.route('/')
def index():
    """Render website's index page."""
    return render_template('index.html')


@views.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')


@views.route('/research/')
def research():
    """Explore the US disaster case study."""
    return render_template('research.html')


@views.route('/research/methodology/')
def methodology():
    """Overview of methodology used."""
    return render_template('methodology.html')


@views.route('/data/')
def data():
    """Find which dataset you want to download."""
    return render_template('data.html')


# The functions below should be applicable to all Flask apps.

@views.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return views.send_static_file(file_dot_text)


@views.route('/qunit/')
def qunit():
    """Render a QUnit page for JavaScript tests."""
    return render_template('test_js.html')


@views.after_request
def add_header(response):
    """Add header to force latest IE rendering engine and Chrome Frame."""
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    return response


@views.app_errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404
