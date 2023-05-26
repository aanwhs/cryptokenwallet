var Mnemonic
var Password
var WalletPrivateKey
var WalletAddress
var ChainID
var NodeURL
var NodeProvider
var TokenContractAddress
var ContractAbiFragment



function GetCookie(cookieName) {
	let cookie = {}
	document.cookie.split(';').forEach(function(el) {
		let [key,value] = el.split('=')
		cookie[key.trim()] = value
	})
	return cookie[cookieName]
}

function LogInWallet() {
	const ExpiredCookies = new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()
	document.cookie = 'ConnectToWalletUsing' + '=' + ConnectToWalletUsing + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
	if (ConnectToWalletUsing === 'Private Key') {
		document.cookie = 'WalletPrivateKey' + '=' + WalletPrivateKey + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL' + '=' + NodeURL + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
	} else if (ConnectToWalletUsing === 'Mnemonic') {
		document.cookie = 'Mnemonic' + '=' + Mnemonic + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'Password' + '=' + Password + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL' + '=' + NodeURL + ';' + 'expires=' + ExpiredCookies + ';' + 'SameSite=None; Secure'
	} else {
		LogOutWallet()
	}
}

function LogOutWallet() {
	document.getElementById('ConnectToWalletUsingPrivateKey').style.display = 'block'
	document.getElementById('LoadWalletMenu').style.display = 'none'
	document.getElementById('LogOutWalletMenu').style.display = 'none'
	document.getElementById('PrivateKeyWalletDashboard').style.display = 'none'
	document.getElementById('SingleSend').style.display = 'none'
	// document.getElementById('SingleSendToken').style.display = 'none'
	
	if (GetCookie('ConnectToWalletUsing') === 'Private Key') {
		document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		document.cookie = 'WalletPrivateKey =' + GetCookie('WalletPrivateKey') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
	} else if (GetCookie('ConnectToWalletUsing') === 'Mnemonic') {
		document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		document.cookie = 'Mnemonic =' + GetCookie('Mnemonic') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		document.cookie = 'Password =' + GetCookie('Password') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
	} else {
		// document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		// document.cookie = 'Mnemonic =' + GetCookie('Mnemonic') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		// document.cookie = 'Password =' + GetCookie('Password') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		// document.cookie = 'WalletPrivateKey =' + GetCookie('WalletPrivateKey') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
		// document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + 'Expires=Thu, 01 Jan 1991 00:00:0 GMT;' + 'SameSite=None; Secure'
	}
}

function LoadWallet() {
	const ExpiredCookies = new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()
	if (GetCookie('ConnectToWalletUsing') === 'Private Key') {
		document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'WalletPrivateKey =' + GetCookie('WalletPrivateKey') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		LoadWalletUsingPrivateKey()
	} else if (GetCookie('ConnectToWalletUsing') === 'Mnemonic') {
		document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'Mnemonic =' + GetCookie('Mnemonic') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'Password =' + GetCookie('Password') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		// LoadWalletUsingMnemonic()
	} else {
		// document.cookie = 'ConnectToWalletUsing =' + GetCookie('ConnectToWalletUsing') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		// document.cookie = 'Mnemonic =' + GetCookie('Mnemonic') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		// document.cookie = 'Password =' + GetCookie('Password') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		// document.cookie = 'WalletPrivateKey =' + GetCookie('WalletPrivateKey') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
		// document.cookie = 'NodeURL =' + GetCookie('NodeURL') + ';' + ExpiredCookies + ';' + 'SameSite=None; Secure'
	}
}

async function LoadWalletUsingPrivateKey() {
	document.getElementById('ConnectToWalletUsingPrivateKey').style.display = 'none'
	document.getElementById('LoadWalletMenu').style.display = 'inline-block'
	document.getElementById('LogOutWalletMenu').style.display = 'inline-block'
	document.getElementById('PrivateKeyWalletDashboard').style.display = 'block'
	document.getElementById('SingleSend').style.display = 'block'
	// document.getElementById('SingleSendToken').style.display = 'block'
	
	WalletPrivateKey = GetCookie('WalletPrivateKey')
	NodeURL = GetCookie('NodeURL')
	
	// const NodeProvider = ethers.getDefaultProvider()
	NodeProvider = new ethers.providers.JsonRpcProvider(NodeURL)
	
	let GetNetwork = await NodeProvider.getNetwork()
	let NetworkChainName = await GetNetwork.name
	document.getElementById('NetworkChainName').innerText = NetworkChainName
	let NetworkChainID = await GetNetwork.chainId
	document.getElementById('NetworkChainID').innerText = NetworkChainID
	
	let BlockNumberCheck = await NodeProvider.getBlockNumber()
	// document.getElementById('BlockNumberCheck').innerText = BlockNumberCheck
	
	let ProviderGetBlock = await NodeProvider.getBlock(BlockNumberCheck)
	
	let GetGasLimit = await ProviderGetBlock.gasLimit
	document.getElementById('GetGasLimit').innerText = GetGasLimit
	document.getElementById('GetGasLimit').innerText += ' wei'
	let GetGasUsed = await ProviderGetBlock.gasUsed
	// document.getElementById('GetGasUsed').innerText = GetGasUsed
	// document.getElementById('GetGasUsed').innerText += ' wei'
	// wei			0
	// kwei			3
	// mwei			6
	// gwei			9
	// szabo		12
	// finney		15
	// ether		18
	// GasLimit (units) * GasPrice (gwei)
	// 21,000 * 200 = 4,200,000 gwei or 0.0042 ETH
	// (21000 * (200 * 10**9)) / (10**18) = 0.0042
	
	var wallet = new ethers.Wallet(WalletPrivateKey, NodeProvider)
	WalletAddress = wallet.address
	document.getElementById('WalletAddress').innerHTML = WalletAddress
	
	var WalletBalance = await NodeProvider.getBalance(WalletAddress)
	WalletBalance = ethers.utils.formatEther(WalletBalance)
	var OneWei = 1/(10**18)
	var OneGwei = 1/(10**9)
	var OneEther = 1/(10**0)
	// if (WalletBalance >= OneWei && WalletBalance < OneGwei) {
		// document.getElementById('WalletBalance').innerText = WalletBalance/(10**18) + ' ' + NetworkChainName + ' wei'
	// } else if (WalletBalance >= OneGwei && WalletBalance < OneEther) {
		// document.getElementById('WalletBalance').innerText = WalletBalance/(10**9) + ' ' + NetworkChainName + ' gwei'
	// } else if (WalletBalance >= OneEther) {
		// document.getElementById('WalletBalance').innerText = WalletBalance + ' ' + NetworkChainName
	// } else {
		document.getElementById('WalletBalance').innerText = WalletBalance + ' ' + NetworkChainName
	// }
	
	var GasPriceCheck = await wallet.getGasPrice()
	document.getElementById('GasPriceCheck').innerText = GasPriceCheck/(10**9)
	document.getElementById('GasPriceCheck').innerText += ' gwei'
	
	if (NetworkChainID === 1) {
		// Ethereum Mainnet
		// 1 (0x1)
	} else if (NetworkChainID === 61) {
		// Ethereum Classic Mainnet
		// 61 (0x3d)
	} else if (NetworkChainID === 56) {
		// Binance Smart Chain Mainnet
		// 56 (0x38)
		const BTCB = {
			address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const ETH = {
			address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const ETC = {
			address: '0x3d6545b08693daE087E957cb1180ee38B9e3c25E',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const WBNB = {
			address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const BSCUSD = {
			address: '0x55d398326f99059fF775485246999027B3197955',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const XRP = {
			address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const ADA = {
			address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const DOGE = {
			address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const MATIC = {
			address: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const TRX = {
			address: '0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const LTC = {
			address: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
		const UNI = {
			address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
			abi: [
				'function name() view returns (string)',
				'function symbol() view returns (string)',
				'function balanceOf(address _owner) public view returns (uint256 balance)',
				'function transfer(address dst, uint256 _value) public returns (bool success)'
			],
		}
	} else if (NetworkChainID === 97) {
		// Binance Smart Chain Testnet
		// 97 (???)
	} else if (NetworkChainID === 137) {
		// Polygon Mainnet logoPolygon Mainnet
		// 137 (0x89)
	} else if (NetworkChainID === 42161) {
		// Arbitrum One
		// 42161 (0xa4b1)
	} else if (NetworkChainID === 1116) {
		// Core Blockchain Mainnet
		// 1116 (0x45c)
	} else {
		//
	}
}



// Connection To Wallet Using Mnemonic



// Connection To Wallet Using Private Key
function ConnectToWalletUsingPrivateKey() {
	SetPrivateKey = document.getElementById('SetPrivateKey')
	SetPrivateKey = SetPrivateKey.value
	
	SetNodeURL = document.getElementById('SetNodeURL')
	SetNodeURL = SetNodeURL.value
	
	ConnectToWalletUsing = 'Private Key'
	// Mnemonic
	// Password
	WalletPrivateKey = SetPrivateKey
	NodeURL = SetNodeURL
	
	LogInWallet()
	LoadWalletUsingPrivateKey()
}



// Single Send
async function SingleSend() {
	
	WalletPrivateKey = GetCookie('WalletPrivateKey')
	NodeURL = GetCookie('NodeURL')
	
	// const NodeProvider = ethers.getDefaultProvider()
	NodeProvider = new ethers.providers.JsonRpcProvider(NodeURL)
	
	let GetNetwork = await NodeProvider.getNetwork()
	let NetworkChainName = await GetNetwork.name
	let NetworkChainID = await GetNetwork.chainId
	
	let BlockNumberCheck = await NodeProvider.getBlockNumber()
	let ProviderGetBlock = await NodeProvider.getBlock(BlockNumberCheck)
	let GetGasLimit = await ProviderGetBlock.gasLimit
	let GetGasUsed = await ProviderGetBlock.gasUsed
	
	let wallet = new ethers.Wallet(WalletPrivateKey, NodeProvider)
	WalletAddress = wallet.address
	
	var WalletBalance = await NodeProvider.getBalance(WalletAddress)
	WalletBalance = ethers.utils.formatEther(WalletBalance)
	
	var GasPriceCheck = await wallet.getGasPrice()
	
	SetToWalletAddress = document.getElementById('SetToWalletAddress')
	SetToWalletAddress = SetToWalletAddress.value
	
	SetSendAmount = document.getElementById('SetSendAmount')
	SetSendAmount = SetSendAmount.value
	
	// Create a transaction object
	const tx = {
		from: WalletAddress,
		to: SetToWalletAddress,
		value: ethers.utils.parseEther(SetSendAmount),
		gasLimit: ethers.utils.hexlify(GetGasLimit),
		gasPrice: ethers.utils.hexlify(GasPriceCheck)
	}
	// Send a transaction
	try {
		await wallet.sendTransaction(tx).then((SendTransactions) => {
			alert('Transaction Hash: ' + SendTransactions.hash)
		})
	} catch (error) {
		alert('Failed to Send!!!')
	}
	
	LoadWallet()
}



// Single Send Token
async function SingleSendToken() {
	
	WalletPrivateKey = GetCookie('WalletPrivateKey')
	NodeURL = GetCookie('NodeURL')
	
	// const NodeProvider = ethers.getDefaultProvider()
	NodeProvider = new ethers.providers.JsonRpcProvider(NodeURL)
	
	let GetNetwork = await NodeProvider.getNetwork()
	let NetworkChainName = await GetNetwork.name
	let NetworkChainID = await GetNetwork.chainId
	
	let BlockNumberCheck = await NodeProvider.getBlockNumber()
	let ProviderGetBlock = await NodeProvider.getBlock(BlockNumberCheck)
	let GetGasLimit = await ProviderGetBlock.gasLimit
	let GetGasUsed = await ProviderGetBlock.gasUsed
	
	let wallet = new ethers.Wallet(WalletPrivateKey, NodeProvider)
	WalletAddress = wallet.address
	
	var WalletBalance = await NodeProvider.getBalance(WalletAddress)
	WalletBalance = ethers.utils.formatEther(WalletBalance)
	
	var GasPriceCheck = await wallet.getGasPrice()
	
	SetToWalletAddress = document.getElementById('SetToWalletAddress')
	SetToWalletAddress = SetToWalletAddress.value
	
	SetSendAmount = document.getElementById('SetSendAmount')
	SetSendAmount = SetSendAmount.value
	
	SetTokenContractAddress = document.getElementById('SetTokenContractAddress')
	SetTokenContractAddress = SetTokenContractAddress.value
	TokenContractAddress = SetTokenContractAddress
	
	ContractAbiFragment = [
		// Read-Only Functions
		'function name() view returns (string)',
		'function symbol() view returns (string)',
		'function decimals() view returns (uint8)',
		'function balanceOf(address owner) view returns (uint256)',
		
		// Authenticated Functions
		'function transfer(address to, uint amount) returns (bool)',
		
		// Events
		'event Transfer(address indexed from, address indexed to, uint amount)'
	]
	
	var ContractForSingleSendToken = new ethers.Contract(TokenContractAddress, ContractAbiFragment, wallet);

	
	// Create a transaction object
	// Send a transaction
	try {
		ContractForSingleSendToken.transfer(SetToWalletAddress, SetSendAmount).then((SendTransactions) => {
			alert('Transaction Hash: ' + SendTransactions.hash)
		})
	} catch (error) {
		alert('Failed to Send!!!')
	}
	
	LoadWallet()
}