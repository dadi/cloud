This is for running Postman API Tests through Jenkins!

Shell command is:
`newman run test/collection.json -e test/environment.json -r cli,junit,html`

If tests need updating the `test/collection.json` will need to be updated.

If environment variables need updating the `test/environment.json` will need to be updated.
