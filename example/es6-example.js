

// Modules
const ActiveTick 	= require('..').ActiveTick
const _ 			= require('underscore')
const config 		= require('./config.js')



// Create the AT Client
function createClient(){
	return new Promise((resolve, reject) => {
		const client = new ActiveTick(() => {
			console.log('Client Created..')
			resolve( client )
		})	
	})
}



// Connect to AT Servers
function connect( client ){
	return new Promise((resolve, reject) => {
		client.connect( config.api_key, config.username, config.password, () => {
			console.log('Connected..')
			resolve( client )
		})	
	})
}



// When we get stream data:
function onData( type, data ){
	console.log(`On data ( ${type} ):`, data)
}



// Subscribe completed
function subscribeCB( symbol, result ){
	console.log(`Subscribed to ${symbol}:`, result)
}



// Subscribe to symbols
createClient().then( connect ).then(( client ) => {
	console.log('Client Ready..')
	client.on( 'trade', onData.bind( this, 'trade' ) )
	client.on( 'quote', onData.bind( this, 'quote' ) )

	const symbols = [ 'AAPL', 'MSFT', 'NFLX', 'AMZN', 'GOOG', 'TSLA' ]

	// client.listRequest( 'ATConstituentListOptionChain', 'fb', ( res ) => {
	// 	console.log('Res?', res[12])
	// })

	// client.quoteDBRequest( symbols.join(','), 'QuoteFieldIncomeStatementBasicEPSFromContinuingOperations', ( res ) => {
	// 	console.log('Results:', JSON.stringify(res, null, 4))
	// })


	// Subscribe to each symbol:
	_.each( symbols, ( symbol ) => client.subscribe( symbol, subscribeCB.bind( this, symbol ) ) )



	// client.beginQuoteStream( symbols, 'StreamRequestSubscribe', ( res ) => {
	// 	console.log('rezzz', res)
	// })

})
