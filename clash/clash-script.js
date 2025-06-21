/***
 * 修改自dahaha-365大佬的脚本，细微改动，修复dns泄露
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * URL: https://github.com/dahaha-365/YaNet/
 */


/***
 * 多订阅合并，只需要将非当前订阅的链接粘贴至url内即可
 */
const providersOptions = {
    "type": "http",
    "interval": 86400,
}
const proxyProviders = {
    "p1": {
        ...providersOptions,
        // 订阅 链接
        "url": "https://al121.cc/#/register?code=R7vdKxbE",
        "override": {
            // 节点名称前缀 p1，用于区别机场节点
            "additional-prefix": "p1 | "
        }
    },
    "p2": {
        ...providersOptions,
        "url": "https://al121.cc/#/register?code=R7vdKxbE",
        "override": {
            "additional-prefix": "p2 | "
        }
    },
}
/**
 * 整个脚本的总开关，在Mihomo Party使用的话，请保持为true
 * true = 启用
 * false = 禁用
 */
const enable = true

/**
 * 分流规则配置，会自动生成对应的策略组
 * 设置的时候可遵循“最小，可用”原则，把自己不需要的规则全禁用掉，提高效率
 * true = 启用
 * false = 禁用
 */
const ruleOptions = {
    Apple: true, // 苹果服务
    Microsoft: true, // 微软服务
    Github: true, // Github服务
    Google: true, // Google服务
    Openai: true, // 国外AI和GPT
    Spotify: true, // Spotify
    YouTube: true, // YouTube
    Bahamut: true, // 巴哈姆特/动画疯
    Netflix: true, // Netflix网飞
    TikTok: true, // 国际版抖音
    Disney: true, // 迪士尼
    Pixiv: true, // Pixiv
    HBO: true, // HBO
    Biliintl: true, // 哔哩哔哩东南亚
    TVB: true, // TVB
    Hulu: true, // Hulu
    PrimeVideo: true, // 亚马逊prime video
    Telegram: true, // Telegram通讯软件
    Line: true, // Line通讯软件
    WhatsApp: true, // Whatsapp
    Games: true, // 游戏策略组
    Tracker: true, // 网络分析和跟踪服务
    ADS: true, // 常见的网络广告
}

/**
 * 地区配置，通过regex匹配代理节点名称
 * regex会有一定概率误判，自己调整一下吧
 * excludeHighPercentage是排除高倍率节点的开关，只对地区分组有效
 * 倍率大于regions里的ratioLimit值的代理节点会被排除
 */
const regionOptions = {
    excludeHighPercentage: true,
    regions: [
        {
            name: 'HK香港',
            regex: '香港|🇭🇰|HK|hongkong|hong kong',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png',
        },
        {
            name: 'US美国',
            regex: '美国|🇺🇸|US|united state|america',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png',
        },
        {
            name: 'JP日本',
            regex: '日本|🇯🇵|JP|japan',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png',
        },
        {
            name: 'KR韩国',
            regex: '韩国|🇰🇷|KR|korea',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png',
        },
        {
            name: 'SG新加坡',
            regex: '新加坡|🇸🇬|SG|singapore',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png',
        },
        {
            name: 'CN中国大陆',
            regex: '中国|🇨🇳|CN|china',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China_Map.png',
        },
        {
            name: 'TW台湾省',
            regex: '台湾|🇹🇼|TW|taiwan|tai wan',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png',
        },
        {
            name: 'GB英国',
            regex: '英国|🇬🇧|UK|united kingdom|great britain',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png',
        },
        {
            name: 'DE德国',
            regex: '德国|🇩🇪|DE|germany',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png',
        },
        {
            name: 'MY马来西亚',
            regex: '马来西亚|🇲🇾|MYS|malaysia',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Malaysia.png',
        },
        {
            name: 'TK土耳其',
            regex: '土耳其|🇹🇷|TK|turkey',
            ratioLimit: 2,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png',
        },
    ],
}

/**
 * 其实两组DNS就够了，一组国内，一组国外
 * defaultDNS是用来解析DNS的，必须为IP
 * DNS最好不要超过两个，从业界某知名APP的文档里学的
 */
const chinaDNS = ["tls://223.5.5.5", "tls://119.29.29.29"]
const foreignDNS = ['https://1.1.1.1/dns-query', 'https://dns.google/dns-query']

/**
 * DNS相关配置
 */
const dnsConfig = {
    'enable': true,
    'ipv6': true,
    'prefer-h3': false,
    'use-hosts': false,
    'use-system-hosts': false,
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': [
        // 本地主机/设备
        '+.lan',
        '+.local',
        // Windows网络出现小地球图标
        '+.msftconnecttest.com',
        '+.msftncsi.com',
        // QQ快速登录检测失败
        'localhost.ptlogin2.qq.com',
        'localhost.sec.qq.com',
        // 微信快速登录检测失败
        'localhost.work.weixin.qq.com'
    ],
    'default-nameserver': [...chinaDNS],
    'nameserver': [...foreignDNS],
    'proxy-server-nameserver': ['https://doh.pub/dns-query'],
    'direct-nameserver': ['https://doh.pub/dns-query', 'https://dns.alidns.com/dns-query'],   //用于 direct 出口域名解析的 DNS 服务器
}

// 规则集通用配置
const ruleProviderCommon = {
    type: 'http',
    format: 'yaml',
    interval: 86400,
}

// 代理组通用配置
const groupBaseOption = {
    interval: 300,
    timeout: 3000,
    url: 'http://cp.cloudflare.com/generate_204',
    lazy: true,
    'max-failed-times': 3,
    hidden: false,
}

const ruleProviders = new Map()


const rules = [
    'GEOIP,private,DIRECT',
    'GEOIP,CN,DIRECT',
    'DOMAIN-SUFFIX,yunaq.com,DIRECT',
    'DOMAIN-SUFFIX,jiashule.com,DIRECT',
    'DOMAIN-SUFFIX,linux.do,DIRECT',
    'DOMAIN-SUFFIX,deepseek.com,DIRECT',
    'DOMAIN-SUFFIX,volces.com,DIRECT',
    'DOMAIN-SUFFIX,portal101.cn,DIRECT',
]

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const originalProviders = config?.["proxy-providers"] || {};
    const proxyProviderCount = typeof originalProviders === "object" ? Object.keys(originalProviders).length : 0;

    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 合并而非覆盖
    config["proxy-providers"] = {
        ...originalProviders,  // 保留原有配置
        ...proxyProviders       // 合并新配置（同名则覆盖）
    };

    let regionProxyGroups = []
    let otherProxyGroups = config.proxies.map((b) => {
        return b.name
    })

    config['allow-lan'] = true
    config['bind-address'] = '*'
    config['mode'] = 'rule'
    // 覆盖原配置中DNS配置
    config['dns'] = dnsConfig

    config['profile'] = {
        'store-selected': true,
        'store-fake-ip': true,
    }

    config['unified-delay'] = true

    config['tcp-concurrent'] = true

    /**
     * 这个值设置大点能省电，笔记本和手机需要关注一下
     */
    config['keep-alive-interval'] = 1800

    config['find-process-mode'] = 'strict'

    config['geodata-mode'] = true

    /**
     * 适合小内存环境，如果在旁路由里运行可以改成standard
     */
    config['geodata-loader'] = 'memconservative'

    config['geo-auto-update'] = true

    config['geo-update-interval'] = 24

    /**
     * 不开域名嗅探的话，日志里只会记录请求的ip，对查找问题不方便
     * override-destination默认值是true，但是个人建议全局设为false，否则某些应用会出现莫名其妙的问题
     * Mijia Cloud跳过是网上抄的
     */
    config['sniffer'] = {
        enable: true,
        'force-dns-mapping': true,
        'parse-pure-ip': true,
        'override-destination': false,
        sniff: {
            TLS: {
                ports: [443, 8443],
            },
            HTTP: {
                ports: [80, '8080-8880'],
            },
            QUIC: {
                ports: [443, 8443],
            },
        },
        'force-domain': [],
        'skip-domain': ['+.oray.com'],
    }

    /**
     * write-to-system如果设为true的话，有可能出现电脑时间不对的问题
     */
    config['ntp'] = {
        enable: true,
        'write-to-system': false,
        server: 'cn.ntp.org.cn',
    }

    config['geox-url'] = {
        geoip:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
        geosite:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
        mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
        asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
    }

    /**
     * 总开关关闭时不处理策略组
     */
    if (!enable) {
        return config
    }

    regionOptions.regions.forEach((region) => {


        /**
         * 必须再判断一下有没有符合要求的代理节点
         * 没有的话，这个策略组就不应该存在
         * 我喜欢自动选择延迟最低的节点，喜欢轮询的可以自己修改
         */
        if (proxies.length > 0) {
            regionProxyGroups.push({
                ...groupBaseOption,
                name: region.name,
                type: 'url-test',
                tolerance: 50,
                icon: region.icon,
                "include-all": true,
                proxies: config.proxies,
                filter: "香港|🇭🇰"
            })
        }

        otherProxyGroups = otherProxyGroups.filter((x) => !proxies.includes(x))
    })

    const proxyGroupsRegionNames = regionProxyGroups.map((value) => {
        return value.name
    })

    if (otherProxyGroups.length > 0) {
        proxyGroupsRegionNames.push('其他节点')
    }

    config['proxy-groups'] = [
        {
            ...groupBaseOption,
            name: '默认节点',
            type: 'select',
            "include-all": true,
            proxies: [...proxyGroupsRegionNames, '直连'],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
        },
    ]

    config.proxies = config?.proxies || []
    config.proxies.push({
        name: '直连',
        type: 'direct',
        udp: true,
    })
    // 国内域名，暂时不开启
    rules.push(
        'RULE-SET,China_Classical,DIRECT',
    )
    ruleProviders.set('China_Classical', {
        ...ruleProviderCommon,
        behavior: 'classical',
        format: 'yaml',
        url: 'https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/China/China_Classical.yaml',
        path: './ruleset/China_Classical.yaml',
    })
    if (ruleOptions.Openai) {
        rules.push(
            'RULE-SET,OpenAI,OpenAI',
        )
        ruleProviders.set('OpenAI', {
            ...ruleProviderCommon,
            behavior: 'classical',
            format: 'text',
            url: 'https://github.com/dahaha-365/YaNet/raw/refs/heads/dist/rulesets/mihomo/ai.list',
            path: './ruleset/ai.list',
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'OpenAI',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://chat.openai.com/cdn-cgi/trace',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
        })
    }

    if (ruleOptions.YouTube) {
        rules.push('RULE-SET,YouTube,YouTube')
        ruleProviders.set("YouTube", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml",
            "path": "./ruleset/YouTube.yaml"
        },)
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'YouTube',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png',
        })
    }

    if (ruleOptions.Biliintl) {
        rules.push('RULE-SET,biliintl,哔哩哔哩东南亚')
        ruleProviders.set("biliintl", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBiliIntl/BiliBiliIntl.yaml",
            "path": "./ruleset/biliintl.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '哔哩哔哩东南亚',
            type: 'select',
            proxies: ['默认节点', '直连', ...proxyGroupsRegionNames],
            url: 'https://www.bilibili.tv/',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/bilibili_3.png',
        })
    }

    if (ruleOptions.Bahamut) {
        rules.push('RULE-SET,bahamut,巴哈姆特')
        ruleProviders.set("bahamut", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bahamut/Bahamut.yaml",
            "path": "./ruleset/bahamut.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '巴哈姆特',
            type: 'select',
            proxies: ['默认节点', '直连', ...proxyGroupsRegionNames],
            url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bahamut.png',
        })
    }

    if (ruleOptions.Disney) {
        rules.push('RULE-SET,Disney,Disney')
        ruleProviders.set("Disney", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Disney/Disney.yaml",
            "path": "./ruleset/Disney.yaml"
        },

        )
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Disney',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://disney.api.edge.bamgrid.com/devices',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney+.png',
        })
    }

    if (ruleOptions.Netflix) {
        rules.push('RULE-SET,Netflix,Netflix')
        ruleProviders.set("Netflix", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml",
            "path": "./ruleset/Netflix.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Netflix',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://api.fast.com/netflix/speedtest/v2?https=true',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png',
        })
    }

    if (ruleOptions.TikTok) {
        rules.push('RULE-SET,TikTok,TikTok')
        ruleProviders.set("TikTok", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
            "path": "./ruleset/TikTok.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'TikTok',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://www.tiktok.com/',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png',
        })
    }

    if (ruleOptions.Spotify) {
        rules.push('RULE-SET,Spotify,Spotify')
        ruleProviders.set("Spotify", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml",
            "path": "./ruleset/Spotify.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Spotify',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png',
        })
    }

    if (ruleOptions.Pixiv) {
        rules.push('RULE-SET,pixiv,Pixiv')
        ruleProviders.set("pixiv", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Pixiv/Pixiv.yaml",
            "path": "./ruleset/Pixiv.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Pixiv',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://www.pixiv.net/',
            icon: 'https://testingcf.jsdelivr.net/gh/Zz1xuan/ONE/icon/Pixiv.png',
        })
    }

    if (ruleOptions.HBO) {
        rules.push('RULE-SET,HBO,HBO')
        ruleProviders.set("HBO", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/HBO/HBO.yaml",
            "path": "./ruleset/HBO.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'HBO',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://www.hbo.com/favicon.ico',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/HBO.png',
        })
    }

    if (ruleOptions.TVB) {
        rules.push('RULE-SET,TVB,TVB')
        ruleProviders.set("TVB", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TVB/TVB.yaml",
            "path": "./ruleset/TVB.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'TVB',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://www.tvb.com/logo_b.svg',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TVB.png',
        })
    }

    if (ruleOptions.PrimeVideo) {
        rules.push('RULE-SET,PrimeVideo,Prime Video')
        ruleProviders.set("PrimeVideo", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/PrimeVideo/PrimeVideo.yaml",
            "path": "./ruleset/PrimeVideo.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Prime Video',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Prime_Video.png',
        })
    }

    if (ruleOptions.Hulu) {
        rules.push('RULE-SET,Hulu,Hulu')
        ruleProviders.set("Hulu", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Hulu/Hulu.yaml",
            "path": "./ruleset/Hulu.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Hulu',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://auth.hulu.com/v4/web/password/authenticate',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hulu.png',
        })
    }

    if (ruleOptions.Telegram) {
        rules.push('RULE-SET,Telegram,Telegram')
        ruleProviders.set("Telegram", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml",
            "path": "./ruleset/Telegram.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Telegram',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'http://www.telegram.org/img/website_icon.svg',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png',
        })
    }

    if (ruleOptions.WhatsApp) {
        rules.push('RULE-SET,WhatsApp,WhatsApp')
        ruleProviders.set("WhatsApp", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Whatsapp/Whatsapp.yaml",
            "path": "./ruleset/WhatsApp.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'WhatsApp',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://web.whatsapp.com/data/manifest.json',
            icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png',
        })
    }

    if (ruleOptions.Line) {
        rules.push('RULE-SET,Line,Line')
        ruleProviders.set("Line", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Line/Line.list",
            "path": "./ruleset/Line.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Line',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://line.me/page-data/app-data.json',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Line.png',
        })
    }

    if (ruleOptions.Games) {
        rules.push(
            'RULE-SET,SteamCN,国内网站',
            'RULE-SET,Steam,游戏专用'
        )
        ruleProviders.set("Steam", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
            "path": "./ruleset/Steam.yaml"
        })
        ruleProviders.set("SteamCN", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/SteamCN/SteamCN.yaml",
            "path": "./ruleset/SteamCN.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '游戏专用',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png',
        })
    }

    if (ruleOptions.Tracker) {
        rules.push('RULE-SET,Tracker,跟踪分析')
        ruleProviders.set("Tracker", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/PrivateTracker/PrivateTracker.yaml",
            "path": "./ruleset/tracker.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '跟踪分析',
            type: 'select',
            proxies: ['REJECT', '直连', '默认节点'],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Reject.png',
        })
    }

    if (ruleOptions.ADS) {
        rules.push('RULE-SET,AdBlock,广告过滤')
        ruleProviders.set("AdBlock", {
            ...ruleProviderCommon,
            "behavior": "domain",
            "format": "mrs",
            "url": "https://testingcf.jsdelivr.net/gh/REIJI007/AdBlock_Rule_For_Clash@master/adblock_reject.mrs",
            "path": "./ruleset/AdBlock.mrs"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '广告过滤',
            type: 'select',
            proxies: ['REJECT', '直连', '默认节点'],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png',
        })
    }

    if (ruleOptions.Apple) {
        rules.push('RULE-SET,Apple,苹果服务')
        ruleProviders.set("Apple", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple.yaml",
            "path": "./ruleset/Apple.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '苹果服务',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'http://www.apple.com/library/test/success.html',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple_2.png',
        })
    }

    if (ruleOptions.Google) {
        rules.push('RULE-SET,Google,Google')
        ruleProviders.set("Google", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
            "path": "./ruleset/Google.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Google',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'http://www.google.com/generate_204',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google_Search.png',
        })
    }
    if (ruleOptions.Microsoft) {
        rules.push('RULE-SET,Microsoft,Microsoft')
        ruleProviders.set("Microsoft", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
            "path": "./ruleset/Microsoft.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Microsoft',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'http://www.msftconnecttest.com/connecttest.txt',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Microsoft.png',
        })
    }

    if (ruleOptions.Github) {
        rules.push('RULE-SET,Github,Github')
        ruleProviders.set("Github", {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub_No_Resolve.yaml",
            "path": "./ruleset/Github.yaml"
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Github',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
            url: 'https://github.com/robots.txt',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png',
        })
    }
    rules.push('MATCH,默认节点')
    config['proxy-groups'].push(
        {
            ...groupBaseOption,
            name: '下载软件',
            type: 'select',
            proxies: [
                '直连',
                'REJECT',
                '默认节点',
                '国内网站',
                ...proxyGroupsRegionNames,
            ],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Download.png',
        },
        {
            ...groupBaseOption,
            name: '其他外网',
            type: 'select',
            proxies: ['默认节点', '国内网站', ...proxyGroupsRegionNames],
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming!CN.png',
        },
        {
            ...groupBaseOption,
            name: '国内网站',
            type: 'select',
            proxies: ['直连', '默认节点', ...proxyGroupsRegionNames],
            url: 'http://wifi.vivo.com.cn/generate_204',
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png',
        }
    )

    config['proxy-groups'] = config['proxy-groups'].concat(regionProxyGroups)

    // 覆盖原配置中的规则
    config['rules'] = rules
    config['rule-providers'] = Object.fromEntries(ruleProviders)

    if (otherProxyGroups.length > 0) {
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '其他节点',
            type: 'select',
            proxies: otherProxyGroups,
            icon: 'https://testingcf.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png',
        })
    }

    // 返回修改后的配置
    return config
}