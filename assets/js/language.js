// https://codepen.io/erikkjon88/pen/MGWzwV
var LanguageArray = {
	'en-gb': {
		'CrypTokenWallet': 'CrypToken Wallet',
		'Home': 'Home',
		'About': 'About',
		'Contact': 'Contact',
		'Disclaimer': 'Disclaimer',
		'PrivacyPolicy': 'Privacy Policy',
		'GenerateWalletAddress': 'Generate Wallet Address',
		'ConnectToWallet': 'Connect To Wallet',
	},
	'id-id': {
		'CrypTokenWallet': 'CrypToken Wallet',
		'Home': 'Beranda',
		'About': 'Tentang',
		'Contact': 'Kontak',
		'Disclaimer': 'Penafian',
		'PrivacyPolicy': 'Kebijakan Pribadi',
		'GenerateWalletAddress': 'Hasilkan Alamat Dompet',
		'ConnectToWallet': 'Hubungkan Ke Dompet',
	}
};

$(document).ready(function() {
	// The default language is English
	var lang = 'en-gb';
	$('.lang').each(function(index, element) {
		$(this).text(LanguageArray[lang][$(this).attr('key')]);
	});
});

// get/set the selected language
$('.translate').click(function() {
	var lang = $(this).attr('id');
	$('.lang').each(function(index, element) {
		$(this).text(LanguageArray[lang][$(this).attr('key')]);
	});
});
