export class BrowserHelper {
  /**
   * @return {screenSize: string, name: string, version: string, majorVersion: number, mobile: boolean, os: string, cookies: boolean}
   */
  public static infos(): {
    screenSize: string;
    name: string;
    version: string;
    majorVersion: number;
    mobile: boolean;
    os: string;
    cookies: boolean;
    } {
    const unknown = '-';

    // screen
    let screenSize = '';
    if (screen.width) {
      const width = screen.width ? screen.width : '';
      const height = screen.height ? screen.height : '';
      screenSize += '' + width + ' x ' + height;
    }

    // browser
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let browser = navigator.appName;
    let version = '' + parseFloat(navigator.appVersion);
    let majorVersion: number;
    let nameOffset;
    let verOffset;
    let ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) !== -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
    } else if ((verOffset = nAgt.indexOf('Edge')) !== -1) {
      // Edge
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
      // MSIE
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
      // Chrome
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
      // Safari
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
      // Firefox
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') !== -1) {
      // MSIE 11
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      // Other browsers
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) !== -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(' ')) !== -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(')')) !== -1) {
      version = version.substring(0, ix);
    }

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    const mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    let cookieEnabled = navigator.cookieEnabled;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testCookie';
      cookieEnabled = document.cookie.indexOf('testCookie') !== -1;
    }

    // system
    let os = unknown;
    const clientStrings = [
      {s: 'Windows 11', r: /(Windows 11.0|Windows NT 11.0)/},
      {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
      {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
      {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
      {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
      {s: 'Windows Vista', r: /Windows NT 6.0/},
      {s: 'Windows Server 2003', r: /Windows NT 5.2/},
      {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
      {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
      {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
      {s: 'Windows 98', r: /(Windows 98|Win98)/},
      {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
      {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s: 'Windows CE', r: /Windows CE/},
      {s: 'Windows 3.11', r: /Win16/},
      {s: 'Android', r: /Android/},
      {s: 'Open BSD', r: /OpenBSD/},
      {s: 'Sun OS', r: /SunOS/},
      {s: 'Linux', r: /(Linux|X11|Wayland)/},
      {s: 'iOS', r: /(iPhone|iPad|iPod)/},
      {s: 'Mac OS X', r: /Mac OS X/},
      {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s: 'QNX', r: /QNX/},
      {s: 'UNIX', r: /UNIX/},
      {s: 'BeOS', r: /BeOS/},
      {s: 'OS/2', r: /OS\/2/},
      {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/},
    ];
    for (const clientString of clientStrings) {
      const cs = clientString;
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    return {
      screenSize: screenSize,
      name: browser,
      version: version,
      majorVersion: majorVersion,
      mobile: mobile,
      os: os,
      cookies: cookieEnabled,
    };
  }
}
