const API_URL = "https://open.er-api.com/v6/latest/USD";

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const form = document.getElementById("converter-form");
const resultEl = document.getElementById("result");
const rateInfoEl = document.getElementById("rate-info");
const errorEl = document.getElementById("error");
const swapBtn = document.getElementById("swap");


const currencyFlags = {
  'AED': '🇦🇪', 'AFN': '🇦🇫', 'ALL': '🇦🇱', 'AMD': '🇦🇲', 'ANG': '🇳🇱', 'AOA': '🇦🇴', 'ARS': '🇦🇷', 'AUD': '🇦🇺', 'AWG': '🇦🇼', 'AZN': '🇦🇿',
  'BAM': '🇧🇦', 'BBD': '🇧🇧', 'BDT': '🇧🇩', 'BGN': '🇧🇬', 'BHD': '🇧🇭', 'BIF': '🇧🇮', 'BMD': '🇧🇲', 'BND': '🇧🇳', 'BOB': '🇧🇴', 'BRL': '🇧🇷', 'BSD': '🇧🇸', 'BTN': '🇧🇹', 'BWP': '🇧🇼', 'BYN': '🇧🇾', 'BZD': '🇧🇿',
  'CAD': '🇨🇦', 'CDF': '🇨🇩', 'CHF': '🇨🇭', 'CLP': '🇨🇱', 'CNY': '🇨🇳', 'COP': '🇨🇴', 'CRC': '🇨🇷', 'CUP': '🇨🇺', 'CVE': '🇨🇻', 'CZK': '🇨🇿',
  'DJF': '🇩🇯', 'DKK': '🇩🇰', 'DOP': '🇩🇴', 'DZD': '🇩🇿', 'EGP': '🇪🇬', 'ERN': '🇪🇷', 'ETB': '🇪🇹', 'EUR': '🇪🇺',
  'FJD': '🇫🇯', 'FKP': '🇫🇰', 'FOK': '🇫🇴', 'GBP': '🇬🇧', 'GEL': '🇬🇪', 'GGP': '🇬🇬', 'GHS': '🇬🇭', 'GIP': '🇬🇮', 'GMD': '🇬🇲', 'GNF': '🇬🇳', 'GTQ': '🇬🇹', 'GYD': '🇬🇾',
  'HKD': '🇭🇰', 'HNL': '🇭🇳', 'HRK': '🇭🇷', 'HTG': '🇭🇹', 'HUF': '🇭🇺',
  'IDR': '🇮🇩', 'ILS': '🇮🇱', 'IMP': '🇮🇲', 'INR': '🇮🇳', 'IQD': '🇮🇶', 'IRR': '🇮🇷', 'ISK': '🇮🇸',
  'JEP': '🇯🇪', 'JMD': '🇯🇲', 'JOD': '🇯🇴', 'JPY': '🇯🇵',
  'KES': '🇰🇪', 'KGS': '🇰🇬', 'KHR': '🇰🇭', 'KID': '🇰🇮', 'KMF': '🇰🇲', 'KRW': '🇰🇷', 'KWD': '🇰🇼', 'KYD': '🇰🇾', 'KZT': '🇰🇿',
  'LAK': '🇱🇦', 'LBP': '🇱🇧', 'LKR': '🇱🇰', 'LRD': '🇱🇷', 'LSL': '🇱🇸', 'LYD': '🇱🇾',
  'MAD': '🇲🇦', 'MDL': '🇲🇩', 'MGA': '🇲🇬', 'MKD': '🇲🇰', 'MMK': '🇲🇲', 'MNT': '🇲🇳', 'MOP': '🇲🇴', 'MRU': '🇲🇷', 'MUR': '🇲🇺', 'MVR': '🇲🇻', 'MWK': '🇲🇼', 'MXN': '🇲🇽', 'MYR': '🇲🇾', 'MZN': '🇲🇿',
  'NAD': '🇳🇦', 'NGN': '🇳🇬', 'NIO': '🇳🇮', 'NOK': '🇳🇴', 'NPR': '🇳🇵', 'NZD': '🇳🇿',
  'OMR': '🇴🇲',
  'PAB': '🇵🇦', 'PEN': '🇵🇪', 'PGK': '🇵🇬', 'PHP': '🇵🇭', 'PKR': '🇵🇰', 'PLN': '🇵🇱', 'PYG': '🇵🇾',
  'QAR': '🇶🇦',
  'RON': '🇷🇴', 'RSD': '🇷🇸', 'RUB': '🇷🇺', 'RWF': '🇷🇼',
  'SAR': '🇸🇦', 'SBD': '🇸🇧', 'SCR': '🇸🇨', 'SDG': '🇸🇩', 'SEK': '🇸🇪', 'SGD': '🇸🇬', 'SHP': '🇸🇭', 'SLE': '🇸🇱', 'SLL': '🇸🇱', 'SOS': '🇸🇴', 'SRD': '🇸🇷', 'SSP': '🇸🇸', 'STN': '🇸🇹', 'SYP': '🇸🇾', 'SZL': '🇸🇿',
  'THB': '🇹🇭', 'TJS': '🇹🇯', 'TMT': '🇹🇲', 'TND': '🇹🇳', 'TOP': '🇹🇴', 'TRY': '🇹🇷', 'TTD': '🇹🇹', 'TVD': '🇹🇻', 'TWD': '🇹🇼', 'TZS': '🇹🇿',
  'UAH': '🇺🇦', 'UGX': '🇺🇬', 'USD': '🇺🇸', 'UYU': '🇺🇾', 'UZS': '🇺🇿',
  'VES': '🇻🇪', 'VND': '🇻🇳', 'VUV': '🇻🇺',
  'WST': '🇼🇸',
  'XAF': '🇨🇫', 'XCD': '🇦🇬', 'XDR': '🌍', 'XOF': '🇧🇯', 'XPF': '🇵🇫', 'XSU': '🌍', 'XUA': '🌍',
  'YER': '🇾🇪',
  'ZAR': '🇿🇦', 'ZMW': '🇿🇲', 'ZWL': '🇿🇼'
};


function getCurrencyFlag(currencyCode) {
  return currencyFlags[currencyCode] || '🌐';
}


async function loadCurrencies() {
  try {
    clearError();
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error("Ошибка сети");

    const data = await res.json();
    if (data.result !== "success") throw new Error("Ошибка API");

    const base = data.base_code;  
    const rates = data.rates;    

    const currencies = Object.keys(rates).sort();
    if (!currencies.includes(base)) currencies.unshift(base);

    fillSelect(fromSelect, currencies, "USD");
    fillSelect(toSelect, currencies, "EUR");
  } catch (e) {
    showError("Не удалось загрузить список валют.");
    console.error(e);
  }
}

function fillSelect(select, list, defaultVal) {
  select.innerHTML = "";
  for (const code of list) {
    const opt = document.createElement("option");
    opt.value = code;
    const flag = getCurrencyFlag(code);
    opt.textContent = `${flag} ${code}`;
    if (code === defaultVal) opt.selected = true;
    select.appendChild(opt);
  }
}


async function convertCurrency(amount, from, to) {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Ошибка сети");
  const data = await res.json();

  if (data.result !== "success") throw new Error("Ошибка API");

  const rates = data.rates;

  if (!rates[from] || !rates[to]) throw new Error("Неизвестная валюта");

  const amountInUSD = amount / rates[from]; 
  const result = amountInUSD * rates[to];
  const rate = rates[to] / rates[from];

  return {
    result,
    rate,
    date: data.time_last_update_utc
  };
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();

  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || amount <= 0) {
    showError("Введите сумму больше 0");
    return;
  }

  if (from === to) {
    showError("Выберите разные валюты");
    return;
  }

  resultEl.textContent = "Конвертация...";
  rateInfoEl.textContent = "";

  try {
    const { result, rate, date } = await convertCurrency(amount, from, to);

    const fromFlag = getCurrencyFlag(from);
    const toFlag = getCurrencyFlag(to);
    
    resultEl.textContent = `${amount.toFixed(2)} ${fromFlag} ${from} = ${result.toFixed(2)} ${toFlag} ${to}`;

    rateInfoEl.textContent = `Course: 1 ${fromFlag} ${from} = ${rate.toFixed(4)} ${toFlag} ${to} (updated: ${date})`;

  } catch (err) {
    showError("Ошибка при загрузке курса");
    console.error(err);
  }
});


swapBtn.addEventListener("click", () => {
  const f = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = f;
});

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function clearError() {
  errorEl.classList.add("hidden");
  errorEl.textContent = "";
}

loadCurrencies();
