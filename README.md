Disaster Math
=============


Instructions
------------

First, you'll need to clone the repo.

    $ git clone git@github.com:codeforamerica/disastermath.git
    $ cd disastermath

Second, let's download `pip`, `virtualenv`, and the DotCloud CLI.

    $ sudo easy_install pip
    $ pip install virtualenv
    $ pip install dotcloud

Now, you can setup an isolated environment with `virtualenv`.

    $ virtualenv --no-site-packages env
    $ source env/bin/activate

Then, let's get the requirements installed in your isolated test
environment.

    $ pip install -r requirements.txt

Now, you can run the application locally.

    $ python bootstrap.py

To upload your application to DotCloud, you'll first need to do the
following:

    $ dotcloud create <my_application_name>
    $ dotcloud push <my_application_name> .

This should return a URL, and you can then view your application in
your web browser of choice.

And, to deactivate `virtualenv` (once you've finished coding), you
simply run the following command:

    $ deactivate
