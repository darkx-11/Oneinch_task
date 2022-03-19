"# Oneinch_task"
1inch API to support multi-swap and multi-sell for the sweep-swap feature

Added app.js (in root dir), router.js (in Routes dir), oneInch.js (in controller dir) and oneInchMulti.js (in resolver directory) -**app.js** starts the server and configures router to use router.js for all routing requests. -**router.js** sets routes for multiswap and multiqoute and links them to respective functions in oneInch.js (in controller directory) -**oneInch.js** contains functions for handling the routes. It first reads the parameter arrays and perform checks to see if the paramters provided are valid. It then runs a loop if parameters are valid and contructs quote/swap params and calls the single swap/ quote function in oneInchMulti.js (in resolver directory) -**oneInchmulti.js** contains functions for performing single quote/swap and expects paramters object as an argument.

_Note- Only MultiQuote has been completed for now. Multiswap is under progress._
