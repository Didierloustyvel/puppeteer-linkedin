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
        headless: true,
        timeout : 0,
        defaultViewport: null,
        slowMo : 0,
        args: ['--no-sandbox', '--start-maximized', '--disable-setuid-sandbox', '--disable-infobars', '--window-position=0,0', '--ignore-certifcate-errors', '--ignore-certifcate-errors-spki-list',]
    })
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36');

    await page.goto("https://www.linkedin.com", { timeout: 0, waitUntil: 'domcontentloaded' });
    // await page.evaluate(() => document.cookie = "li_at=AQEDAS3yEQQEPWgxAAABfNXfzDsAAAF8-exQO00Ahojcycm-bRT89RE2hF070b7jR6XF-L1rbUF8Zi6liqumY8OCVlg0qDyiv-kxSWDHj9IVnZsjPdhOl86fzyEmCBi0-_VWO71FsXKi4p6tLQWC-Hpm" );
    // await page.goto("https://www.linkedin.com", { timeout: 0, waitUntil: 'domcontentloaded' });
    await page.goto("http://www.mon-ip.com/", { timeout: 0, waitUntil: 'domcontentloaded' });
    await page.goto("https://www.linkedin.com", { timeout: 0, waitUntil: 'domcontentloaded' });
    await page.goto("https://www.whatismybrowser.com/fr/detect/what-is-my-user-agent", { timeout: 0, waitUntil: 'domcontentloaded' });

}


start_browser()