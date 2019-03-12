
VENV ?= ./venv

.PHONY: deps install
deps:
	test -x $(shell which virtualenv) || echo "virtualenv is required, install it."
	test ! -d $(VENV) && virtualenv $(VENV)

install: deps
	$(VENV)/bin/pip install -r requirements.txt
