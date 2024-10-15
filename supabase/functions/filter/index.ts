function setCORSHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with specific origin if needed
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-client-info, apikey",
  );
  return response;
}

interface LocationData {
  country: string;
  region: string;
  city: string;
  country_code: string;
}

async function getLocation(ip: string): Promise<LocationData> {
  const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const responseData = await response.json();

  return {
    country: responseData.country,
    region: responseData.region,
    city: responseData.city,
    country_code: responseData.country_code,
  };
}

// Function to get OS from User-Agent
function getOSFromUserAgent(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS")) return "Mac OS";
  if (userAgent.includes("X11")) return "UNIX";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "";
}

// Function to check if the request is from a bot
function isBot(userAgent: string): boolean {
  const botKeywords = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "indexer",
    "archiver",
    "slurp",
    "dataminr",
    "pingdom",
    "lighthouse",
    "googlebot",
    "dataprovider.com",
    "yandexbot",
    "bingbot",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest",
    "applebot",
    "Yeti",
    "slackbot",
    "vkShare",
    "W3C_Validator",
    "redditbot",
    "Applebot",
    "WhatsApp",
    "flipboard",
    "tumblr",
    "bitlybot",
    "SkypeUriPreview",
    "nuzzel",
    "Discordbot",
    "Google Page Speed",
    "Qwantify",
    "pinterestbot",
    "Bitrix link preview",
    "XING-contenttabreceiver",
    "Chrome-Lighthouse",
    "TelegramBot",
    "PlayStore-Google",
    // New bot keywords added below
    "2ip",
    "360 Monitoring",
    "360Spider",
    "Abonti",
    "Aboundexbot",
    "AccompanyBot",
    "Acoon",
    "AdAuth",
    "Adbeat",
    "AddThis.com",
    "ADMantX",
    "ADmantX Service Fetcher",
    "Adsbot",
    "Adscanner",
    "AdsTxtCrawler",
    "adstxtlab.com",
    "aHrefs Bot",
    "AhrefsSiteAudit",
    "aiHitBot",
    "Alexa Crawler",
    "Alexa Site Audit",
    "Allloadin Favicon Bot",
    "AlltheWeb",
    "Amazon AdBot",
    "Amazon Bot",
    "Amazon ELB",
    "Amazon Route53 Health Check",
    "Analytics SEO Crawler",
    "Ant",
    "Anthropic AI",
    "ApacheBench",
    "Applebot",
    "AppSignalBot",
    "Arachni",
    "archive.org bot",
    "ArchiveBot",
    "ArchiveBox",
    "Asana",
    "Ask Jeeves",
    "AspiegelBot",
    "Automattic Analytics",
    "Awario",
    "Backlink-Check.de",
    "BacklinkCrawler",
    "Baidu Spider",
    "Barkrowler",
    "Barracuda Sentinel",
    "BDCbot",
    "Better Uptime Bot",
    "BingBot",
    "Birdcrawlerbot",
    "BitlyBot",
    "BitSight",
    "Blekkobot",
    "BLEXBot Crawler",
    "Bloglovin",
    "Blogtrottr",
    "BoardReader Blog Indexer",
    "Botify",
    "BrandVerity",
    "BrightBot",
    "Browsershots",
    "BUbiNG",
    "Buck",
    "BuiltWith",
    "Bytespider",
    "Castro 2",
    "Catchpoint",
    "CATExplorador",
    "ccBot crawler",
    "CensysInspect",
    "Charlotte",
    "ChatGPT",
    "ChatGPT-User",
    "CheckHost",
    "CheckMark Network",
    "Chrome Privacy Preserving Prefetch Proxy",
    "Cincraw",
    "CISPA Web Analyzer",
    "ClaudeBot",
    "Clickagy",
    "Cliqzbot",
    "CloudFlare Always Online",
    "CloudFlare AMP Fetcher",
    "Cloudflare Custom Hostname Verification",
    "Cloudflare Diagnostics",
    "Cloudflare Health Checks",
    "Cloudflare SSL Detector",
    "Cốc Cốc Bot",
    "Cocolyzebot",
    "Collectd",
    "colly",
    "CommaFeed",
    "COMODO DCV",
    "Comscore",
    "ContentKing",
    "Cookiebot",
    "Crawldad",
    "Crawlson",
    "CriteoBot",
    "CrowdTangle",
    "CSSCheck",
    "CyberFind Crawler",
    "Cyberscan",
    "Cypress",
    "Datadog Agent",
    "DataForSeoBot",
    "datagnionbot",
    "Datanyze",
    "Dataprovider",
    "Daum",
    "deepnoc",
    "Detectify",
    "Diffbot",
    "Discobot",
    "Discord Bot",
    "Disqus",
    "Domain Research Project",
    "DomainAppender",
    "DomainCrawler",
    "Domains Project",
    "DomainStatsBot",
    "DotBot",
    "Dotcom Monitor",
    "DuckAssistBot",
    "DuckDuckBot",
    "DuckDuckGo Bot",
    "ducks.party",
    "Easou Spider",
    "eCairn-Grabber",
    "EMail Exractor",
    "EmailWolf",
    "Embedly",
    "evc-batch",
    "Everyfeed",
    "ExaBot",
    "ExactSeek Crawler",
    "Example3",
    "Exchange check",
    "EyeMonit",
    "eZ Publish Link Validator",
    "Ezooms",
    "Facebook Crawler",
    "Facebook External Hit",
    "Faveeo",
    "Feedbin",
    "FeedBurner",
    "Feedly",
    "Feedspot",
    "Femtosearch",
    "Fever",
    "Flipboard",
    "fragFINN",
    "FreeWebMonitoring",
    "FreshRSS",
    "Functionize",
    "GDNP",
    "Generic Bot",
    "Genieo Web filter",
    "Ghost Inspector",
    "Gigablast",
    "Gigabot",
    "Gluten Free Crawler",
    "Gmail Image Proxy",
    "Gobuster",
    "Goo",
    "Google Apps Script",
    "Google Favicon",
    "Google PageSpeed Insights",
    "Google Partner Monitoring",
    "Google Search Console",
    "Google Stackdriver Monitoring",
    "Google StoreBot",
    "Google Structured Data Testing Tool",
    "Googlebot",
    "Googlebot News",
    "Gowikibot",
    "GPTBot",
    "Grammarly",
    "Grapeshot",
    "Gregarius",
    "GTmetrix",
    "Hatena Bookmark",
    "Hatena Favicon",
    "Headline",
    "Heart Rails Capture",
    "Heritrix",
    "Heureka Feed",
    "HTTPMon",
    "httpx",
    "HuaweiWebCatBot",
    "HubPages",
    "HubSpot",
    "ICC-Crawler",
    "ichiro",
    "IDG/IT",
    "Iframely",
    "IIS Site Analysis",
    "ImageSift",
    "Inetdex Bot",
    "InfoTigerBot",
    "Inktomi Slurp",
    "inoreader",
    "Interactsh",
    "InternetMeasurement",
    "IONOS Crawler",
    "IP-Guide Crawler",
    "IPIP",
    "IPS Agent",
    "IsItWP",
    "JobboerseBot",
    "K6",
    "KeyCDN Tools",
    "Keys.so",
    "KlarnaBot",
    "KomodiaBot",
    "Kouio",
    "Kozmonavt",
    "l9explore",
    "l9tcpid",
    "Larbin web crawler",
    "LCC",
    "Lighthouse",
    "Linespider",
    "Linkdex Bot",
    "LinkedIn Bot",
    "LinkpadBot",
    "LinkPreview",
    "LinkWalker",
    "LTX71",
    "Lumar",
    "Lycos",
    "MaCoCu",
    "Magpie-Crawler",
    "MagpieRSS",
    "Mail.Ru Bot",
    "MakeMerryBot",
    "Marginalia",
    "masscan",
    "masscan-ng",
    "Mastodon Bot",
    "Meanpath Bot",
    "MegaIndex",
    "MeltwaterNews",
    "MetaInspector",
    "MetaJobBot",
    "MicroAdBot",
    "Microsoft Preview",
    "Mixnode",
    "MJ12 Bot",
    "Mnogosearch",
    "MojeekBot",
    "Monitor Backlinks",
    "Monitor.Us",
    "MoodleBot Linkchecker",
    "Morningscore Bot",
    "Munin",
    "MuscatFerret",
    "Nagios check_http",
    "NalezenCzBot",
    "nbertaupete95",
    "Neevabot",
    "Netcraft Survey Bot",
    "netEstate",
    "NetLyzer FastProbe",
    "Netpeak Checker",
    "NetResearchServer",
    "NetSystemsResearch",
    "NetTrack",
    "Netvibes",
    "NETZZAPPEN",
    "NewsBlur",
    "NewsGator",
    "Newslitbot",
    "NiceCrawler",
    "Nimbostratus Bot",
    "NLCrawler",
    "Nmap",
    "Notify Ninja",
    "Nutch-based Bot",
    "Nuzzel",
    "OAI-SearchBot",
    "oBot",
    "Octopus",
    "Odin",
    "Omgili bot",
    "Onalytica",
    "OnlineOrNot Bot",
    "Openindex Spider",
    "OpenLinkProfiler",
    "OpenWebSpider",
    "Orange Bot",
    "Outbrain",
    "OWLer",
    "Page Modified Pinger",
    "Pageburst",
    "PagePeeker",
    "PageThing",
    "Panscient",
    "PaperLiBot",
    "PayPal IPN",
    "PerplexityBot",
    "Petal Bot",
    "Phantomas",
    "phpMyAdmin",
    "Picsearch bot",
    "PingAdmin.Ru",
    "Pingdom Bot",
    "Pinterest",
    "PiplBot",
    "Plesk Screenshot Service",
    "Plukkie",
    "Pocket",
    "PocketParser",
    "PodUptime",
    "Pompos",
    "PritTorrent",
    "Project Patchwatch",
    "Project Resonance",
    "PRTG Network Monitor",
    "Quantcast",
    "QuerySeekerSpider",
    "Quora Bot",
    "Quora Link Preview",
    "Qwantify",
    "Rainmeter",
    "RamblerMail Image Proxy",
    "Reddit Bot",
    "RedekenBot",
    "RenovateBot",
    "ReqBin",
    "Research Scan",
    "Riddler",
    "Robozilla",
    "RocketMonitorBot",
    "Rogerbot",
    "ROI Hunter",
    "RuxitSynthetic",
    "SabsimBot",
    "SafeDNSBot",
    "Scamadviser External Hit",
    "ScoutJet",
    "Scraping Robot",
    "Scrapy",
    "Screaming Frog SEO Spider",
    "ScreenerBot",
    "Sectigo DCV",
    "Seekport",
    "Sellers.Guide",
    "Semantic Scholar Bot",
    "Semrush Bot",
    "SEMrush Reputation Management",
    "SemrushBot",
    "Sensika Bot",
    "Sentry Bot",
    "Senuto",
    "Seobility",
    "SEOENGBot",
    "SEOkicks",
    "SEOkicks-Robot",
    "seolyt",
    "Serendeputy Bot",
    "Serenety",
    "Server Density",
    "Seznam Bot",
    "Seznam Email Proxy",
    "Seznam Zbozi.cz",
    "sfFeedReader",
    "ShopAlike",
    "Shopify Partner",
    "ShopWiki",
    "SilverReader",
    "SimplePie",
    "Sirdata",
    "SISTRIX Crawler",
    "SISTRIX Optimizer",
    "Site24x7 Website Monitoring",
    "Siteimprove",
    "SitemapParser-VIPnytt",
    "SiteScore",
    "SiteSucker",
    "Sixy.ch",
    "Skype URI Preview",
    "Slackbot",
    "SMTBot",
    "Snap URL Preview Service",
    "Sogou Spider",
    "Soso Spider",
    "Sparkler",
    "Spawning AI",
    "SpazioDati",
    "Speedy",
    "Spinn3r",
    "Spotify",
    "Sprinklr",
    "Sputnik Bot",
    "Sputnik Image Bot",
    "sqlmap",
    "SSL Labs",
    "start.me",
    "Statista",
    "StatusCake",
    "Stract",
    "Sublinq",
    "SurdotlyBot",
    "Survey Bot",
    "Swiftbot",
    "Swisscows Favicons",
    "Synapse",
    "t3versions",
    "Tag Inspector",
    "TelegramBot",
    "Tenable.asm",
    "The Knowledge AI",
    "The Trade Desk Content",
    "theoldreader",
    "ThinkChaos",
    "TigerBot",
    "Timpibot",
    "TinEye",
    "TinEye Crawler",
    "Tiny Tiny RSS",
    "TLSProbe",
    "TraceMyFile",
    "Trendiction Bot",
    "Turnitin",
    "TurnitinBot",
    "TweetedTimes Bot",
    "Tweetmeme Bot",
    "Twingly Recon",
    "Twitterbot",
    "UkrNet Mail Proxy",
    "UniversalFeedParser",
    "Uptime-Kuma",
    "Uptime Robot",
    "Uptimebot",
    "UptimeRobot",
    "URLAppendBot",
    "URLSuMaBot",
    "Vagabondo",
    "Velen Public Web Crawler",
    "Vercel Bot",
    "VeryHip",
    "Viber Url Downloader",
    "Visual Site Mapper Crawler",
    "VK Share Button",
    "W3C CSS Validator",
    "W3C I18N Checker",
    "W3C Link Checker",
    "W3C Markup Validation Service",
    "W3C MobileOK Checker",
    "W3C P3P Validator",
    "W3C Unified Validator",
    "Wappalyzer",
    "WDG HTML Validator",
    "WebbCrawler",
    "WebDataStats",
    "Weborama",
    "WebPageTest",
    "Website-info",
    "WebSitePulse",
    "WellKnownBot",
    "WeSEE:Search",
    "WhatCMS",
    "WhatsMyIP.org",
    "WhereGoes",
    "Who.is Bot",
    "Willow Internet Crawler",
    "WireReaderBot",
    "WooRank",
    "WordPress",
    "WordPress.com mShots",
    "Workona",
    "Wotbox",
    "XenForo",
    "YaCy",
    "Yahoo! Cache System",
    "Yahoo Gemini",
    "Yahoo! Link Preview",
    "Yahoo! Mail Proxy",
    "Yandex Bot",
    "Yeti/Naverbot",
    "YouBot",
    "Youdao Bot",
    "Yourls",
    "Zaldamo",
    "Zao",
    "Ze List",
    "zgrab",
    "ZoomBot",
    "ZoominfoBot",
    "ZumBot",
  ];

  const lowerUserAgent = userAgent.toLowerCase();

  return botKeywords.some((keyword) => lowerUserAgent.includes(keyword));
}

async function getRequestData(req: { userAgent: string; ip: string }): Promise<{
  reqOS: string | null;
  browser: string | null;
  location: LocationData;
}> {
  const userAgent = req.userAgent;
  const ip = req.ip;
  // Fetch location data
  const location = await getLocation(ip);
  return {
    reqOS: getOSFromUserAgent(userAgent),
    browser: getBrowserFromUserAgent(userAgent),
    location: location,
  };
}

// Function to get Browser from User-Agent
function getBrowserFromUserAgent(userAgent: string): string {
  if (userAgent.includes("Ddg")) {
    return "DuckDuckGo Browser";
  }
  if (userAgent.includes("Brave")) {
    return "Brave";
  }
  if (userAgent.includes("Vivaldi")) {
    return "Vivaldi";
  }
  if (userAgent.includes("SamsungBrowser")) {
    return "Samsung Internet";
  }
  if (userAgent.includes("Opera Mini")) {
    return "Opera Mini";
  }
  if (userAgent.includes("Edge") || userAgent.includes("Edg")) {
    return "Edge";
  }
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  }
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    return "Internet Explorer";
  }
  if (userAgent.includes("Yandex")) {
    return "Yandex Browser";
  }
  if (userAgent.includes("UCWEB") || userAgent.includes("UCBrowser")) {
    return "UC Browser";
  }
  if (userAgent.includes("Focus")) {
    return "Firefox Focus";
  }
  if (userAgent.includes("Firefox")) {
    return "Firefox";
  }
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  }
  if (userAgent.includes("Chrome")) {
    return "Chrome";
  }

  return "Unknown Browser";
}

// Never remove this!: supabase functions deploy filter --no-verify-jwt
async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    // Handle CORS preflight request
    const response = new Response(null, { status: 204 });
    return setCORSHeaders(response);
  }

  try {
    const requestBody = await req.json();
    const {
      passedRequest,
      os,
    } = requestBody;

    // Extract User-Agent from request headers

    if (isBot(passedRequest.userAgent)) {
      return new Response("Bot defended", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { reqOS, browser, location } = await getRequestData(passedRequest);

    const safeOs = os || reqOS;

    const jsonResponse = new Response(
      JSON.stringify({
        reqOS: safeOs,
        browser: browser,
        location: location,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
    return setCORSHeaders(jsonResponse);
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = new Response(error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
    return setCORSHeaders(errorResponse);
  }
}

Deno.serve(handleRequest);
