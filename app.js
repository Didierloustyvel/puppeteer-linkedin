const puppeteer = require('puppeteer');

var exec = require('child_process').execFile;


var start_tor = function(){
    exec('Tor/tor.exe', function(err,data){
        console.log(err)
        console.log(data.toString())
    })
}

async function start_browser() {
    await start_tor();
    browser = await puppeteer.launch({
        headless: false,
        timeout : 0,
        defaultViewport: null,
        slowMo : 1000,
        // args [ '--proxy-server=127.0.0.1:9876' ],
        args: ['--no-sandbox', '--start-maximized', '--disable-setuid-sandbox', '--disable-infobars', '--window-position=0,0', '--ignore-certifcate-errors', '--ignore-certifcate-errors-spki-list',]
    })
    const page = await browser.newPage();
    await page.goto("http://www.mon-ip.com/", { timeout: 0, waitUntil: 'load' });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36');
    await page.goto("https://www.linkedin.com", { timeout: 0, waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.cookie = "li_at=AQEDAS3yEQQCEMRtAAABfNujCVQAAAF8_6-NVE0AH0RHbAxPwKp6mbOyMOf3vXk6Phs5qeRDW2PRlAiwpVRtkBOR4bw7x27Ss9sCuwrArg7oHEmNElICOqSde94LQh0WFnIC4sUaN-_Sb19a82QhOKpu" );
    await page.goto("https://www.linkedin.com", { timeout: 0, waitUntil: 'networkidle2' });
    await page.goto("https://www.linkedin.com/mynetwork/", { timeout: 0, waitUntil: 'networkidle2' });
    await page.waitForSelector('[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width"]')
    await page.evaluate(() => {
        Array.from(document.querySelectorAll('[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width"]'), e => e.click())
    });
}



start_browser()